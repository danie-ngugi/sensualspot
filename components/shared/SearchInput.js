'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'


import { CloseIcon, LoaderIcon, SearchIcon } from 'components/icons'

import useSearch from 'components/products/useSearch'
let timeoutId
const SearchInput = ({ keyword }) => {
    const _keyword = keyword || ''
    const [searchPhrase, setSearchPhrase] = useState(_keyword)
    const [searchResults, setSearchResults] = useState({ products: [], custom: [] })
    const [ loading, setLoading] = useState(false)

    const router = useRouter()

    const resetResults = () => setSearchResults({ products: [], custom: [] })

    useEffect(() => {
        const handleEsc = (event) => {
           if (event.keyCode === 27) {
            handleClose()
          }
        };
        window.addEventListener('keydown', handleEsc);
    
        return () => {
          window.removeEventListener('keydown', handleEsc);
        };
      }, []);


    const handleClose = () => {
        setSearchResults({ products: [], custom: [] })
        setLoading(false)
    }

    const handleSearchNav = (e) => {
        const keyword = e.target.value;
        if (keyword.trim() === "") {
          //  console.log('returning... empty')
          return;
        }
        if(e.key === 'Enter'){
            return navigateToSearch(keyword.trim())
        }


        // console.log('searching...')
    }

    const navigateToSearch = (phrase) => {
        console.log({ phrase })
        if (phrase === '') return
        // if (router.pathname.includes('/search')) {
        //     return router.push('/')
        // }
        resetResults();
        setSearchPhrase('')
        return router.push(`/search/${phrase}`)
    }

   

    const handleSearch = async (e) => {
      const keyword = e.target.value;

      // . console.log("current phrase", keyword, e.target.value)
      if (!keyword && searchPhrase === "") return
      if (keyword.trim() === "") {
        //  console.log('returning... empty')
        setSearchPhrase('')
        resetResults()
        return;
      }
      setSearchPhrase(keyword)

      if (keyword.trim() === searchPhrase) {
        //  console.log('returning... has not changed')
        return;
      }
     
      setLoading(true)

      clearTimeout(timeoutId)

      timeoutId = setTimeout(async () => {
        const res = await fetch(`/api/products/search/${keyword}`)
        const data = await res.json()
        setLoading(false)

        if (data && data.state) {
          console.log(data.custom, 'custom')
          setSearchResults({ products: data.products, custom: data.custom })
          
        } else {
          resetResults()
          // server error
        }
    }, 400)

    }

    const handleNavigation = (url) => {
      router.push(url)
      // handleClose()
    }

    return (
        <div className="flex isolate z-40 relative flex-col w-full  items-center max-w-full ">
            {/* <div className="overlay" onClick={() => handleClose()}></div> */}
        
            <div className={`search_area z-10   bg-white  py-1 w-full overflow-scroll rounded-md ${searchResults.products.length >= 1 || searchResults.custom.length >= 1 ? 'active' : 'inactive'}`}>


                
                <div className="hidden md:flex flex-col mb-2 z-10">
                  <div className="grid grid-cols-10 gap-1   p-2">
                   
                    <div className=" col-span-9">
                        <input value={searchPhrase} onChange={handleSearch} onKeyUp={handleSearchNav} placeholder="Search" className="rounded-lg  focus:ring-opacity-0 outline-none border border-slate-300 w-full p-1 px-2  h-10" />
                    </div>
                    <div className="flex flex-row justify-end col-span-1">
                      {loading ? <span className="bg-gray-100 px-2 border border-gray-200 rounded-lg pt-1"> <LoaderIcon /></span>  :  <span onClick={()=> { navigateToSearch(searchPhrase)}} className="flex flex-row justify-center items-center bg-white px-2 pt-1 border border-gray-200  cursor-pointer  rounded-lg "> 
                        <SearchIcon style={{ width: '20px'}} /> 
                        </span> } 
                        {/* <CloseIcon /> */}
                    </div>
                  </div>
                </div>

              
                <>
                  <div className={`products_area p-1 w-full z-20 md:hidden flex flex-col ${ searchResults.products.length >= 1 || searchResults.custom.length >= 1 ? 'active' : 'inactive'}`}>

                    {searchResults.products.map((product) => {
                      return (<div className="text-sm my-1" key={product._id}>
                        <span className="primary-text pointer p-1"  onClick={() => handleNavigation(`/product/${product.url}`)}>{product.name}</span>
                      </div>)
                    })}

                  

                    {/* {searchResults?.custom.length >= 1 && searchResults.products.length >= 1 &&
                      <div className="border-t mt-1"></div>}

                    {searchResults?.custom?.slice(0, 6).map((custom) => {
                      return (<div className="text-sm my-1" key={custom._id}>
                        <span
                          className="primary-text pointer p-1"
                          onClick={() => handleNavigation(custom.url)}>
                            {custom.name} {custom.type}
                          </span>
                      </div>)
                    })} */}

                  </div>

                  

                  {loading && <div className="p-1 flex flex-col items-center justify-center h-full">
                    {/* <div className="flat-btn flex flex-row">
                      <LoaderIcon /> <span className="pl-2 text-lg font-medium relative -top-1">Loading</span>
                    </div> */}
                  </div>}
                </>

              
            </div>
            <div className="hidden md:flex z-50 w-full absolute">

              <div className={` ${searchResults.products.length ? 'block' : 'hidden'}
              rounded-md  z-20 max-h-96 overflow-y-scroll absolute top-16 bg-white bg-opacity-80 backdrop-blur-sm shadow-sm w-full
              `}>

                <div className={`products_area p-1 w-full z-20 flex flex-col ${ searchResults.products.length >= 1 ? 'active' : 'inactive'}`}>
                    
                    {searchResults.products.map((product) => {
                      return (
                        <div className="text-sm my-1" key={product._id}>
                          <Link className="primary-text pointer p-1" onClick={() => handleClose()} href={`/product/${product.url}`}>
                            {product.name}
                          </Link>
                        </div>
                      )
                    })}

                    <div className="border-b border-slate-200 pt-2 mb-2"></div>

                    {
                      Object.keys(searchResults.custom).map((customItem) => {
                        const items = searchResults.custom[customItem]

                        // console.log(items)

                        return !Array.isArray(items) || items?.length === 0  ? null : items?.map((item) => {

                          return  <Link
                          className="primary-text pointer p-1"
                          key={item.url}
                          href={item.url}
                          onClick={() => handleClose()}>
                            {item.name} <b className="text-slate-700"> {item.type} </b>
                          </Link>

                        })
                      })
                    }
                  </div>
                  
                  {loading && <div className="py-4 px-2">Loading...</div>}
              </div>
            </div>

            <style jsx> {`
                

                .search_area {
                    transition: 0.3s;
                }
                .search_area.active {
                    /* box-shadow: 0 0 8px #e3e3e3; */
                }
                .products_area {
                    transform: scaleY(0);    
                    transform-origin: top;
                    transition: transform 0.26s ease;
                    
                }
                .products_area.inactive {
                    transform: scaleY(0);
                }
                .products_area.active {
                    transform: scaleY(1);

                }

                `} </style>
            </div>
        
    )
}

export default SearchInput