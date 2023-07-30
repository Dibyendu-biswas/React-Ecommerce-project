import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload
    const tempItem = state.cart.find((i) => i.id === id + color)
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      })
      return { ...state, cart: tempCart }
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }
  // remove Cart 
  if (action.type === REMOVE_CART_ITEM) {
    const removeItem = state.cart.filter((item) => item.id !== action.payload)

    return { ...state, cart: removeItem }
  }
  // toggle cart
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    let tempItem = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newItem = item.amount + 1
          if (newItem > item.max) {
            newItem = item.max
          }
          return { ...item, amount: newItem }
        }
        if (value === "dec") {
          let newItem = item.amount - 1
          if (newItem < 1) {
            newItem = 1
          }
          return { ...item, amount: newItem }
        }

      } else {
        return item
      }
    })
    return { ...state, cart: tempItem }
  }
  // total Amount 
  if(action.type === COUNT_CART_TOTALS){
    const { total_amount,total_items} =state.cart.reduce((total,cartItem)=>{
      const{amount,price}=cartItem

      total.total_items += amount
      total.total_amount +=price *amount
      return total
      
    },{
      total_amount:0,total_items:0,
    })
    return {...state,total_items,total_amount}
  }
  // clear cart
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
