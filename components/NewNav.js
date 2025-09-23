'use client'

import Link from "next/link"
import { useRouter } from "next/router"

import { useState, useContext, useRef, useEffect  } from "react"

import { CartIcon, HeartOutline, HeartFilledIcon, SearchIcon } from './icons'

import { CartContext } from '../context/CartContext'

import NoSsr from './shared/NoSsr'

import { business } from "common/data"

//  import { categories } from 'common/data'
import { SearchContext } from "context/SearchContext"
import SearchWidget from "./shared/Search"
import SearchInput from "./shared/SearchInput"
//  import { CategoryContext } from "context/CategoriesContext"


export default function GlobalNav ({ menu, subs }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [isIntersecting, setIsIntersecting] = useState(true);

    const { setIsOpen } = useContext(SearchContext)
    const { basket } = useContext(CartContext)
   //   const { categories } = useContext(CategoryContext)
   const categories = menu || [];

   const menuRef = useRef(false)

   const interRef = useRef(null);
   const tetherRef = useRef(null);

   useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        interRef?.current?.classList?.add('is-open');
      } else {
        interRef?.current?.classList?.remove('is-open');
      }
    }, { rootMargin: '300px'});
  
    if (tetherRef.current) {
      observer.observe(tetherRef.current);
    }
  
    return () => {
      if (interRef.current) {
        interRef.current.classList.remove('is-open');
        observer.disconnect();
      }
    };
  }, []);


    //  console.group('categories ==>  ====>', categories)

    const router = useRouter()

    const navigate = (url)=> {
      router.push(url)
    }
    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen)
    }

    const closeMenu = () => {
      setMenuOpen(false)
      menuRef.current.checked = false
      document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );

    }

    return (
      <>
      <nav className="text-sm isolate bg-white  fixed w-full z-20">
        
        <div ref={interRef} className=" w-full  group  wrapper">
          <p className="inner w-full bg-gray-800 group-[.is-open]:py-2 text-gray-100 mx-auto px-2 h-auto text-center">
          Products sold on this page are for persons above age of 18
          </p>
        </div>
      
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center justify-between px-4 ">
           <div className="flex flex-row items-center">
            <Link href="/" legacyBehavior>
                  <a className="h-14 overflow-hidden p-2">
                    <img className="object-contain h-full rounded-full  p-1 " src="/icon.png" />
                  </a>
              </Link>
              <Link href="/" legacyBehavior>
                <a  className=" text-transparent bg-clip-text bg-gradient-to-r  to-gray-900  from-primary-1 font-extrabold text-xl sm:text-3xl">
                {business.name}
                </a>
              </Link>
             
           </div>

           <div className="z-40">
            <SearchInput /> 
           </div>

          <div className="flex flex-row justify-end items-center ">

            <span className="mr-4 hidden sm:block cursor-pointer text-lg font-bold text-secondary-1 ">
              <a className=" text-secondary-1 " href={`tel:${business.phone}`} >{business.phone}</a>
            </span>

            <span className="inline-block md:hidden mr-4 cursor-pointer text-primary-1"  onClick={() => setIsOpen(true)}>
              <SearchIcon style={{width: '20px', marginTop: '-5px' }} />
            </span>

            <Link href="/cart" legacyBehavior>
                <a>
                    <NoSsr>
                    <span className="relative inline-block">
                        <CartIcon />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary-1 rounded-full"> {basket.length}</span>
                    </span>
                    </NoSsr>
                </a>
                </Link>

          </div>

            <label
              id="menu-toggle"
              className="p-1 mx-3 rounded-md lg:hidden focus:ring-primary-600 focus:ring-2 focus:outline-none"
              htmlFor="menu-btn"
              onClick={()=> handleMenuToggle()}
            >
              {/* */}
              <svg
                id="menu-open"
                className={`w-7 h-7  ${menuOpen ? 'hidden' : ''} `}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                id="menu-close"
                className={`${menuOpen ? '' : 'hidden'} w-7 h-7`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </label>
          </div>

  
        </div>



      <div className="wrapper bg-primary-1 z-20 relative flex items-center justify-center w-full  text-white ">

        {/* ${menuOpen ? 'block' : 'hidden'} md:block */}
            <input type="checkbox" ref={menuRef} name="slide" id="menu-btn" />
       
            <ul className="nav-links bg-primary-1 w-full h-14 items-center justify-center z-50">

              <div className="bg-white  h-[76px] nav-header text-primary-1 font-black text-3xl flex flex-row items-center px-6 justify-center ">
                <span className=" relative top-1/4 "> {business.name} </span>
              </div>
{/* 
              <label className="block text-white" htmlFor="cancel-btn">
               
                <svg
                    id="menu-close"
                    className={` w-7 h-7 btn close-btn`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                
              </label> */}

              <li>

                <Link href="/" legacyBehavior>
                    <a
                      onClick={() => {closeMenu()}}
                     type="button"
                    className={`desktop-item rounded-md  text-white home-link `}
                    >
                      
                    Home
                    </a>
                </Link>

              </li>

                {
                  categories?.map(({ category, subcategories }) => {

                      return (
                        <li key={category.url}>
                            <Link href={`/${category.url}`} legacyBehavior>
                                <a
                                 onClick={() => {closeMenu()}}
                                type="button"
                                className={`desktop-item ${subcategories.length > 0 ? '' : ''} rounded-md  text-white`}
                                >
                                 
                                {category.name} 
                                </a>
                            </Link>

                            {/* { subcategories.length > 0 && (<>
                              <input type="checkbox" id={category.url} />
                              <label htmlFor={category.url} className="mobile-item"> {category.name} &nbsp; {subcategories.length > 0 ? '  +' : ''} </label>
                            </>)} */}

                            {/* <ul className="drop-menu">
                                {subcategories.map((subcategory) => {
                                      return (
                                        <li className="text-white" key={subcategory._id}>
                                          <Link href={`/${category.url}/${subcategory.url}`} >
                                            <a onClick={() => closeMenu()} className="text-white" > { subcategory.name } </a>
                                          </Link>
                                        </li>
                                      )
                                })}
                            </ul> */}

                         
                      </li>
                      );
                  })
                }

                {
                  subs?.map((sub) => {
                    return (
                      <li key={sub?.url}>
                        <Link href={`/${sub.category[0]?.url}/${sub.url}`} legacyBehavior>
                            <a
                            onClick={() => {closeMenu()}}
                            type="button"
                            className={`desktop-item rounded-md  text-white`}
                            >
                            
                            {sub?.name} 
                            </a>
                        </Link>
                      </li>
                    );
                  })
                }
              
            </ul>
      </div>

      <style jsx>{`
        .wrapper {
     
        }
        .wrapper .nav-links {
          display: inline-flex;
        }
        .nav-links li a {
          padding: 15px 15px;
          transition: all .3s ease-in-out;
          line-height: 28px;
          font-size: 18px;
          
          
        }
       

        .nav-links .drop-menu {
          background: var(--primary-color);
          width: 230px;
          position: absolute;
          line-height: 48px;
          opacity: 0;
          visibility: hidden;
          top: 85px;

        }

        .drop-menu li a {
          width: 100%;
          display: block;
          padding:  10px 15px;
          border-radius: 5%;
          font-size: 16px;
        
          
        }

        .nav-links li:hover .drop-menu {
          opacity: 1;
          visibility: visible;
          top: 48px;
          transition: all .3s ease-in-out;
        }

        .nav-links .mobile-item {
          display: none;
        }

        .wrapper input {
          display: none;
        }

        .wrapper .btn {
          display: none;
        }

        .wrapper .btn.close-btn {
          position: absolute;
          right: 30px;
          top: 15px;
        }
       
        ::-webkit-scrollbar {
          display: none;
        }

        .nav-header, .home-link {
          display: none;
        }

        @media screen and (max-width: 970px) {
          .wrapper {
            height: auto;
          }
          .nav-header, .home-link {
            display: block;
          }
          .wrapper .btn {
            display: block;
          }
          .wrapper .nav-links {
            position: fixed;
            height: 100vh;
            width: 100%;
            max-width: 300px;
            background: var(--primary-color);
            display: block;
            top: 0;
            left: -100%;
            line-height: 50px;
            box-shadow: 0 15px 15px rgba(0, 0, 0, 0.15);
            transition: all .3s ease-in-out;
            overflow-y: scroll;
          }
          #menu-btn:checked ~ .nav-links {
            left: 0%;
          }
           .nav-links li {
            margin: 20px 10px;
          }

          .nav-links li a {
            padding: 0 20px;
            display: block;
            font-size: 18px;
          }

          .nav-links .drop-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            top: 65px;
            padding-left: 20px;
            width: 100%;
            max-height: 0;
            overflow: hidden;
          }
      
          #watches:checked ~ .drop-menu {
            max-height: 100%;
          }

          #accessories:checked ~ .drop-menu {
            max-height: 100%;
          }
          #earphones-headphones:checked ~ .drop-menu {
            max-height: 100%;
          }

          .nav-links .drop-menu li {
            margin: 5px 0px;
            font-size: 16px;
            
          }
          .nav-links .drop-menu li a{
            font-size: 16px;
            border-radius: 5px;
            padding: 10px 8px;
            width: 100%;
            font-weight: 300;

          }
          .nav-links .mobile-item {
            display: block;
            font-size: 18px;
            font-weight: 500;
            padding-left: 20px;
            cursor: pointer;
            transition: all .3s ease-in-out;
            border-radius: 5px;
          }
          .nav-links .mobile-item:hover {
            background: #0D47A1;
          }

          .nav-links .desktop-item.has-subs {
            display: none !important;
          }
        }
        



      `}</style>
    </nav>
    <div ref={tetherRef} />
    </>
    );
}

