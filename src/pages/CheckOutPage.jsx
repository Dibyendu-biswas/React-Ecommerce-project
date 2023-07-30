import React from 'react'
import styled from'styled-components';
import PageHero from '../components/PageHero';
const CheckOutPage = () => {
  return (
    <main>
      <PageHero title="checkout"/>

     <h4>checkout page</h4>
 
  </main>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`

export default CheckOutPage