import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/Products_Reducer"
import {products_url as url} from "../utils/constands"
import {
    SIDEBAR_CLOSE,
    SIDEBAR_OPEN,
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_ERROR,
    GET_SINGLE_PRODUCT_SUCCESS,

} from "../actions"

const initialstate={
    isSideBar:false,
    productsLoading:false,
    productsError:false,
    product:[],
    featureProduct:[],
    singleProduct_Loading:false,
    singleProduct_Erorr:false,
    singleProduct:{},
}
const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
    const [state,dispatch]=useReducer(reducer,initialstate)

    const sidebarClose=()=>{
        dispatch({type:SIDEBAR_CLOSE})
    }
    const sidebarOpen=()=>{
        dispatch({type:SIDEBAR_OPEN})
    }

    /******  all product dfetching  ******/

    const fetchProductsUrl=async(url)=>{
        dispatch({type:GET_PRODUCTS_BEGIN})
        try {
            const response = await axios.get(url)
            const product = await response.data
            dispatch({type:GET_PRODUCTS_SUCCESS,payload:product})
        } catch (error) {
            dispatch({type:GET_PRODUCTS_ERROR})
        }
        
    }
/******  single product fetching  ******/

    const fetchSingleProduct=async(url)=>{
        dispatch({type:GET_SINGLE_PRODUCT_BEGIN})
        try {
            const response= await axios.get(url)
            const singleProduct= await response.data
            dispatch({type:GET_SINGLE_PRODUCT_SUCCESS,payload:singleProduct})
        } catch (error) {
            dispatch({type:GET_SINGLE_PRODUCT_ERROR})
        }
    }
     
    useEffect(()=>{
        fetchProductsUrl(url)
    },[])
    return (
        <ProductContext.Provider value={{...state,sidebarClose,sidebarOpen,fetchSingleProduct}}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductContext = () => {
    return useContext(ProductContext)
}