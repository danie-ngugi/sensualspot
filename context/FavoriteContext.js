import { useState, createContext } from 'react'
import JsCookie from 'js-cookie'
import cookie from 'cookie'
// Create Context Object
export const FavoriteContext = createContext()

export const FavoriteContextProvider = props => {
  const isClient = typeof (window) !== 'undefined'

  const initializeFavorites = () => {
    if (isClient) {
      const cookies = cookie.parse(document.cookie)
      return cookies.favorites ? JSON.parse(cookies.favorites) : []
    }
    return []
  }

  const initial = initializeFavorites()

  const [favorites, setFavorites] = useState(initial)

  const setFavoriteCookie = val => JsCookie.set('favorite', val)

  const mutateFavorites = _favorites => {
    setFavorites(_favorites)
    setFavoriteCookie(_favorites)
  }

  const addItemToFavorites = item => {
    const _favorites = [...favorites, item]
    mutateFavorites(_favorites)
  }

  const removeFromFavorites = item => {
    const _favorites = favorites.filter(favItem => favItem._id !== item._id)
    mutateFavorites(_favorites)
  }

  const inFavorites = item => {
    const _favorite = favorites.find(fav => fav._id === item._id) || null
    return _favorite !== null
  }

  return (
    <FavoriteContext.Provider value={{ favorites, addItemToFavorites, removeFromFavorites, inFavorites }}>
      {props.children}
    </FavoriteContext.Provider>
  )
}
