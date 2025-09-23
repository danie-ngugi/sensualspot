import { useState, createContext } from 'react'

export const WhatsAppContext = createContext()

export const WhatsAppContextProvider = props => {

  const [isOpen, setIsOpen] = useState(false)
  const [activeProduct, setActiveProduct] = useState(null)

  const activateProduct = ( product ) => {
    setActiveProduct(product)
  }


  return (
    <WhatsAppContext.Provider value={{ isOpen: isOpen, setIsOpen, activeProduct, setActiveProduct: activateProduct }}>
      {props.children}
    </WhatsAppContext.Provider>
  )
}