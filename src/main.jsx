import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProductProvider } from "./context/Products_context.jsx"
import { FilterProvider } from './context/Filter_Context.jsx'
import {CartProvider} from "./context/Cart_context.jsx"
import { UserProvider } from './context/User_context.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode >
    <Auth0Provider
        domain="dev-ajhk42key0sy0gig.us.auth0.com"
        clientId="MsDztceYhKwWE7M1ULAwtt1pmJBaFop4"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}>
    <UserProvider>
    <ProductProvider>
      <FilterProvider>
        <CartProvider>
        <App />
        </CartProvider>
      </FilterProvider>
    </ProductProvider>
    </UserProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
