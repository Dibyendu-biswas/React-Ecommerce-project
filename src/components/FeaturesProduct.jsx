import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useProductContext } from '../context/Products_context'
import Loading from './Loading'
import Error from './Error'
import Product from './Product'
const FeaturesProduct = () => {
  const {
    productsLoading: loading,
    productsError: error,
    featureProduct: featured }
    = useProductContext()


  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }
  return (
    <Wrapper>
      <div className="section " >
        <div className='title'>
          <h2>Features Product</h2>
          <div className="underline"></div>
        </div>
        <div className="section-center featured">
          {featured.slice(0, 3).map((item) => {

            return <Product key={item.id} {...item} />
          })}
        </div>
        <Link to="/products" className='btn'>all products</Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturesProduct