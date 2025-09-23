import { useState, createContext } from 'react'

export const SearchContext = createContext()

export const SearchContextProvider = props => {

  const [isOpen, setIsOpen] = useState(false)



  return (
    <SearchContext.Provider value={{ isOpen: isOpen, setIsOpen }}>
      {props.children}
    </SearchContext.Provider>
  )
}