import React from 'react'
import GridView from './GridView'
import ListView from './ListView'
import { useFilterContext } from '../context/Filter_Context'

const ProductList = () => {

  const { filterProduct: products, grid_View } = useFilterContext()
  if (products < 1) {
    return (<h5 style={{ textTransform: "none" }}> Sorry,no product matched your search</h5>)
  }

  if (grid_View === false) {
    return (<ListView products={products} />)
  }
  return (
    <GridView products={products}>ProductList</GridView>
  )
}

export default ProductList