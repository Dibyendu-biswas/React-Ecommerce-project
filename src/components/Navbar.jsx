import React from 'react'
import {Link} from "react-router-dom"
import logo from "../assets/logo.svg"
import {links} from "../utils/constands"
import { FaBars } from 'react-icons/fa'
import styled from 'styled-components'
import CartButtons from './CartButtons'
import { useProductContext } from '../context/Products_context'
import { useUserContext } from '../context/User_context'
const Navbar = () => {
  const {myUser}=useUserContext()
  const {sidebarOpen}= useProductContext()
  return (
    <NavContainer>
      <div className="nav-center">
    <div className="nav-header">
    <Link to="/">
          <img src={logo} alt="product-logo" />
        </Link>
        <button type='button' className='nav-toggle'>
          <FaBars onClick={sidebarOpen}/>
        </button>
    </div>
        <ul className='nav-links'>
          {
            links.map((item)=>{
              const {id,text,url}=item
              return (
                <li key={id}>
                  <Link to={url}>{text}</Link>
                </li>
              )
            })
          }
          {myUser && <li>
         <Link to="/checkout">Checkout</Link>
         </li>}
         
        </ul>
        <CartButtons/>
      </div>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`

export default Navbar