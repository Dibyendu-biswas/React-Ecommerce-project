import {
    LOAD_PRODUCTS,
    SET_GRIDVIEW,
    SET_LISTVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
  } from '../actions'
 const filter_reducer=(state,action)=>{
if(action.type === LOAD_PRODUCTS){
    let maxPrice=action.payload.map((p)=>p.price)
    maxPrice=Math.max(...maxPrice)
    return {
        ...state,
        allFilterProduct:[...action.payload],
        filterProduct:[...action.payload],
        filters:{...state.filters,max_price:maxPrice,price:maxPrice}
    }
}

if(action.type===SET_GRIDVIEW){
    return{...state,grid_View :true}
}
if(action.type===SET_LISTVIEW){
    return{...state,grid_View :false}
}
if(action.type===UPDATE_SORT){
    return{...state,sort:action.payload}
}
if (action.type === SORT_PRODUCTS){
    const {sort,filterProduct}=state
    let template=[...filterProduct]
    if(sort === "price-lowest"){
        template=template.sort((a,b)=>a.price - b.price)
    }
    if(sort === "price-highest"){
        template=template.sort((a,b)=>b.price - a.price)
    }
    if(sort === "price-a"){
        template=template.sort((a,b)=>a.name.localeCompare(b.name))
    }
    if(sort === "price-z"){
        template=template.sort((a,b)=>b.name.localeCompare(a.name))
    }
    return{...state,filterProduct:template}
}

if(action.type === UPDATE_FILTERS){
    const {name,value}=action.payload
    return{...state,filters:{...state.filters,[name]:value}}
}
if(action.type === FILTER_PRODUCTS){
    const {allFilterProduct}=state

    const {text,company,color,price,shipping,category}=state.filters
    let template=[...allFilterProduct]

    if(text){
        template=template.filter((product)=>product.name.toLowerCase().startsWith(text))
    }
    if(category !== "all"){
        template = template.filter((product)=>product.category === category)
    }
    if(company !== "all"){
        template = template.filter((product)=>product.company === company)
    }
    if(color !== "all"){
        template = template.filter((product)=>{
            return product.colors.find((c)=>c===color)
        })
    }
    // price 
   template=template.filter((product)=>product.price <= price)

//    shipping 
if(!shipping ){
    template=template.filter((product)=>product.shipping === true)
}
    return{...state,filterProduct:template}
}

if(action.type=== CLEAR_FILTERS){
    return {
        ...state,
        filters:{
            ...state.filters,
            text:"",
            company:"all",
            category:"all",
            color:"all",
            price:state.filters.max_price,
            shipping:false,
        }
    }
}
throw new Error(`No Matching ${action.type} - action type`)
}

export default filter_reducer