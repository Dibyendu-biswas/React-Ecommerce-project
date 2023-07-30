
import {
    SIDEBAR_CLOSE,
    SIDEBAR_OPEN,
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_ERROR,
    GET_SINGLE_PRODUCT_SUCCESS,
} from "../actions"

 const Products_reducer=(state,action)=>{
    if(action.type === SIDEBAR_CLOSE){
        return {...state, isSideBar: false };
    }

    if (action.type===SIDEBAR_OPEN){
        return{...state,isSideBar:true}
    }

    // all product fetching 

    if(action.type===GET_PRODUCTS_BEGIN){
        return{...state,productsLoading:true}
    }
    if(action.type===GET_PRODUCTS_SUCCESS){
        const featureProduct=action.payload.filter((product)=>product.featured===true)
        return{...state,
            productsLoading:false,
            product:action.payload,
            featureProduct
        }
    }
    if(action.type===GET_PRODUCTS_ERROR){
        return{
            ...state,
            productsLoading:false,
            productsError:true,
        }
    }

    // singleProduct fetching Reducer
    if(action.type===GET_SINGLE_PRODUCT_BEGIN){
        return {
            ...state,singleProduct_Loading:true,singleProduct_Erorr:false
        }
    }
    if(action.type===GET_SINGLE_PRODUCT_SUCCESS){
        return {
            ...state,
            singleProduct_Loading:false,
            singleProduct:action.payload
        }
    }
    if(action.type=== GET_SINGLE_PRODUCT_ERROR){
        return {
            ...state,
            singleProduct_Loading:false,
            singleProduct_Erorr:true,
        }
    }


    throw new Error(`No Matching "${action.type}" - action type`)
}

export default Products_reducer