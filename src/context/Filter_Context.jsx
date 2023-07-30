import { createContext, useContext, useEffect, useReducer } from "react"
import reducer from "../reducers/Filter_Reducer"
import { useProductContext } from "./Products_context"

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
const initialstate={
filterProduct:[],
allFilterProduct:[],
grid_View:true,
sort:"price-lowest",
filters:{
    text:"",
    company:"all",
    category:"all",
    color:"all",
    min_price:0,
    max_price:0,
    price:0,
    shipping:false,

}
}
 const Filter_context=createContext()

export const FilterProvider=({children})=>{
    const {product}= useProductContext()
    const [state,dispatch]=useReducer(reducer,initialstate)


    useEffect(()=>{
        dispatch({type:LOAD_PRODUCTS,payload:product})
    },[product])

    useEffect(()=>{
        dispatch({type:FILTER_PRODUCTS})
        dispatch({type:SORT_PRODUCTS})
    },[state.sort,state.filters])


    const gridView=()=>{
        dispatch({type:SET_GRIDVIEW})
    }
    const listView=()=>{
        dispatch({type:SET_LISTVIEW})
    }
    
    const updateSort=(e)=>{
        const value =e.target.value
        dispatch({type:UPDATE_SORT,payload:value})
    }

    const updateFilter=(e)=>{
        let name= e.target.name;
        let value= e.target.value;
        if(name === "category"){
            value=e.target.textContent

        }
        if(name === "color"){
            value = e.target.dataset.color
        }
        if(name === "price"){
            value = Number(value)
        }
        if (name === 'shipping') {
            value = e.target.checked
          }

        dispatch({type:UPDATE_FILTERS,payload:{name,value}})
        
    }
    const clearFilter=()=>{
        dispatch({type:CLEAR_FILTERS})
    }
    return (
        <Filter_context.Provider value={{...state,gridView,listView,updateSort,updateFilter,clearFilter}}>
            {children}
        </Filter_context.Provider>
    )
}

export const useFilterContext=()=>{
    return useContext(Filter_context)
}