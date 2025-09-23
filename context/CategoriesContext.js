import { createContext } from 'react'

export const CategoryContext = createContext()

export const CategoryContextProvider = props => {

  return (
    <CategoryContext.Provider value={{ categories: props.menu, subs: props.subs  }}>
      {props.children}
    </CategoryContext.Provider>
  )
}
