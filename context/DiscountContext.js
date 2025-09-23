import { useState, createContext } from 'react'
// import JsCookie from 'js-cookie'
// import cookie from 'cookie'
// Create Context Object
export const DiscountContext = createContext()

export const DiscountContextProvider = props => {


  const [discountCode, setDiscountCode] = useState()


  const removeDiscountCode = () => {
   setDiscountCode(null)
  }

  const setDiscount = (code) => {
   setDiscountCode(code)
  }
 
  return (
    <DiscountContext.Provider value={{ discount: discountCode, setDiscount, removeDiscountCode }}>
      {props.children}
    </DiscountContext.Provider>
  )
}
