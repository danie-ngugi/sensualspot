import { useState, createContext } from 'react'
import JsCookie from 'js-cookie'
import cookie from 'cookie'
// Create Context Object
export const CartContext = createContext()

// Create a provider for components to consume and subscribe to changes
export const CartContextProvider = props => {
  const [cartDialog, setCartDialog] = useState(false)
  const [cartItem, setCartItem] = useState()

  let initialState = props.cart

  if (initialState.length < 1 && typeof (window) !== 'undefined') {
    //  console.log('cart is empty, checking cookies')
    const cookies = cookie.parse(document.cookie)
    initialState = cookies.scentfied_cart ? JSON.parse(cookies.scentfied_cart) : []
  }
  const [basket, setCart] = useState(initialState)
  const [discount, setDiscount] = useState(null)

  //  console.log('Initializing cart context with', initialState)
  const changeDiscount = _discount => setDiscount(_discount)
  
  const setCookie = (val) => {
    JsCookie.set('scentfied_cart', JSON.stringify(val))
  }

  const addToBasket = (newItem) => {
    const item = basket.find((i) => i.id === newItem.id)
    if (item) {
      return { msg: 'Item already added to cart', state: false }
    }
    const cartValue = [...basket, newItem]
    setCart(cartValue)
    setCookie(cartValue)
    return { msg: 'Item added to basket', state: true }
  }

  const initializeCart = (val) => setCart([...val])

  const resetCart = () => {
    setCart([])
    setCookie([])
  }

  const removeItemFromBasket = (id) => {
    const cartValue = basket.filter(item => item.id !== id)
    setCart(cartValue)
    setCookie(cartValue)
  }

  const changeItemQuantity = ({ id, quantity }) => {
    const _cart = [...basket]
  
    const item = _cart.find(item => item.id === id) || null
    if (item) {
      const index = _cart.indexOf(item)
      item.quantity = +quantity
      _cart[index] = item
      setCart([..._cart])
      setCookie([..._cart])
    }
  }

  const changeItemSize = (cartItem) => {
    const _cart = [...basket]
    const item = _cart.find(item => item.id === cartItem.id) || null
    if (!item) { return null }

    const index = _cart.indexOf(item)
    const size = item.quantities.find(item => item.quantity === cartItem.size)
    item.size = cartItem.size
    item.price = Math.round(size.discount)
    _cart[index] = item
    setCart([..._cart])
    setCookie([..._cart])
  }

  return (
    <CartContext.Provider value={{
      basket,
      initializeCart,
      addToBasket,
      removeItemFromBasket,
      resetBasket: resetCart,
      changeItemQuantity,
      changeItemSize,
      discount,
      changeDiscount,
      cartDialog, 
      setCartDialog,
      setCartItem,
      cartItem
    }
    }>
      {props.children}
    </CartContext.Provider>
  )
}
