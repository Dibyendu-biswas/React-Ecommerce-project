import React from 'react'
import styled from "styled-components"
import { useFilterContext } from '../context/Filter_Context'
import {getUniqueValues,formatPrice} from "../utils/Helper"
import { FaCheck } from 'react-icons/fa'
const Filters = () => {
  const {
    filters:{
    text,
    category,
    color,
    company,
    max_price,
    min_price,
    price,
    shipping
    },
    updateFilter,
    clearFilter,
    allFilterProduct
  } =useFilterContext()

  const categries=getUniqueValues(allFilterProduct,"category")
  const companies=getUniqueValues(allFilterProduct,"company")
  const colors=getUniqueValues(allFilterProduct,"colors")


  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search  */}
          <div className='form-control'>
          <input type="text"
           name='text'
           value={text}
           onChange={updateFilter}
           placeholder='search'
           className='search-input'
           />
          </div>
          {/* category start */}
        <div className='form-control'>
          <h5>category</h5>
          <div>
            {categries.map((c,index)=>{
              return <button
              key={index}
              className={`${category === c.toLowerCase() ? "active": null}`}
              name='category'
              type='button'
              onClick={updateFilter}
              >
                {c}
              </button>
            })}
          </div>

        </div>
        {/* category end */}

        {/* company start */}
        <div className="form-control">
          <h5>company</h5>
          <select name="company"
          onChange={updateFilter}
          className='company'
          value={company}
          >
            {
              companies.map((c,index)=>{
                return(
                  <option
                  key={index}
                   value={c}
                   >
                      {c}
                  </option>
                )
              })
            }
          </select>
        </div>
        {/* company end */}

        {/* color start */}
        <div className="form-control">
          <h5>Color</h5>
          <div className="colors">
            {colors.map((c,index)=>{
              if (c === "all"){
                return (
                  <button
                  key={index}
                  data-color="all"
                  className={`${color === "all" ?"all-btn active" : "all-btn"}`}
                  name='color'
                  onClick={updateFilter}
                  >
                      all
                  </button>
                )
              }
              return(
                <button
                key={index}
                style={{background:c}}
                onClick={updateFilter}
                className={`${c===color ? "color-btn active" : "color-btn"}`}
                name='color'
                data-color={c}
                >
                  {color=== c ? <FaCheck/> : null}
                </button>
              )
            })}
          </div>

        </div>
        {/* color end */}
        {/* price start */}
        <div className="form-control">
          <h5>Price</h5>
          <p className='price'>{formatPrice(price)}</p>
            <input type="range" 
            onChange={updateFilter}
            max={max_price}
            min={min_price}
            name='price'
            value={price}
            />
        </div>
        {/* price end */}
        {/* shipping start */}

        <div className='form-control shipping'>
            <label htmlFor='shipping'>free shipping</label>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              checked={shipping}
              onClick={updateFilter}
            />
          </div>
        {/* shipping end */}

        </form>
<button className='clear-btn' type='button' onClick={clearFilter}>
  clear filter
</button>  
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters