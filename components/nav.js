import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState, useContext } from 'react'

import { categories } from 'common/data'

import { CartIcon, HamburgerIcon, SearchIcon } from '../components/icons'
// import Modal from 'components/shared/Modal'

import { CartContext } from '../context/CartContext'
import { FavoriteContext } from '../context/FavoriteContext'

import { business } from 'common/data'

import NoSsr from './shared/NoSsr'

export default function Nav() {
  const checkbox = useRef()
  const router = useRouter()

  const { basket } = useContext(CartContext)
  const { favorites } = useContext(FavoriteContext)

  const [ modalShowing, setModalShowing ] = useState(false)

  const navigate = (val) => {
    router.push(`${val}`);
    checkbox.current.checked = false
  }

  return (
    <nav className="flex flex-col bg-white px-4 fixed w-full dark:bg-true-gray-800 dark:text-white z-50">
      
      <div className="flex  flex-row justify-between pt-2 h-12 items-center">
        <div className="flex items-center">
          <div className="lg:hidden mr-3">
            <label htmlFor="menu_toggle" className="text-black">
              <HamburgerIcon />
            </label>
          </div>
          <div className="">
            <Link href="/" legacyBehavior>
              <a className="font-bold text-2xl sm:text-3xl">VictoriaGift<span className="text-black">Shop</span></a>
            </Link>
          </div>
        </div>
        <div className="flex justify-end space-x-6 lg:space-x-8 pr-2">
          <div className="hidden text-lg font-medium sm:block">
            <a href={`tel://${business.phone}`}> {business.phone} </a>
          </div>
           <span className="pointer hidden lg:inline-block">
              <Link href="/search" legacyBehavior>
                <a><SearchIcon style={{ width: "22px", height: '22px' }} /></a>
              </Link>
            </span>
  
            <Link href="/cart" legacyBehavior>
              <a>
                <NoSsr>
                  <span className="relative inline-block">
                    <CartIcon />
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-[#9C27B0] rounded-full"> {basket.length}</span>
                  </span>
                  </NoSsr>
              </a>
            </Link>
        </div>
      </div>
      <div className="min-h-10 mt-3 flex flex-col sm:flex-row justify-between items-center">
        {/* <div className="">0708161146</div> */}
        <input ref={checkbox} type="checkbox" className="hidden" id="menu_toggle" />
        <ul
          id="menu"
          className="hidden lg:flex  pb-4 lg:pb-0 w-full  grid-cols-2 justify-center sm:justify-center items-center sm:space-x-4">
          {categories.map(({ href, label }) => (
            <li key={`${href}${label}`} className="p-2 sm:p1 text-gray-900 hover:text-purple-600 font-semibold select-none">
              <div role="button" onKeyDown={() => navigate(href)} onClick={() => navigate(href)}>
                {label}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        #menu_toggle:checked + #menu {
          display: grid !important;
        }
      `}</style>
    </nav>
  );
}
