import React, { useEffect } from 'react'
import styled from "styled-components"
import {formatPrice} from "../utils/Helper"
import {single_product_url as url} from "../utils/constands"
import {useParams,Link,useNavigate} from "react-router-dom"
import { useProductContext } from '../context/Products_context'

import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components';


const SingleProductPage = () => {
const {id}=useParams()
const navigate =  useNavigate()

  const {fetchSingleProduct,
    singleProduct_Loading:loading,
    singleProduct_Erorr:error,
    singleProduct:product,
  }=useProductContext()

  //  for data fetching 
  useEffect(()=>{
    fetchSingleProduct(`${url}${id}`)
  },[id])

  // if there is any error then it navigate back to home page
  useEffect(()=>{
    if (error){
      setTimeout(() => {
        navigate("/")
      }, 2000);
    }
  },[error])

  if(loading){
    return(<Loading/>)
  }
  if(error){
    return(<Error/>)
  }

  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = product;
  return (
    <Wrapper>
      <PageHero title={name} product/>
    <div className="section-center section page">
      <Link to="/" className='btn'>back to home</Link>
      <div className="product-center">
        <ProductImages images={images}/>
        <section className='content'>
          <h2>{name}</h2>
          <Stars stars={stars} reviews={reviews}/>
          <h5 className='price'>{formatPrice(price)}</h5>
          <p className='desc'>{description} </p>
          <p className='info'>
            <span>Available : </span>
              {stock >0 ? "In Stock": "Out of Stock"}
          </p>
          <p className='info'>
            <span>SKU : </span>
              {sku}
          </p>
          <p className='info'>
            <span>Brand : </span>
              {company}
          </p>
          <hr />
          {
            stock >0 && <AddToCart product={product}/>
          }
        </section>
      </div>
    </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;
export default SingleProductPage