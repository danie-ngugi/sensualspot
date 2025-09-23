import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'


import { CloseIcon, LoaderIcon, SearchIcon } from 'components/icons'

import useSearch from 'components/products/useSearch'
let timeoutId
const SearchWidget = ({ keyword }) => {
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
    }

    const navigateToSearch = (phrase) => {
        // console.log({ phrase })
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
        <div className="flex flex-col items-center">
            <div className="overlay" onClick={() => handleClose()}></div>
        
            <div className={`search_area absolute bg-white p-3 w-5/6 sm:w-3/6 overflow-scroll rounded-md ${ searchResults.products.length >= 1 || searchResults.custom.length >= 1 ? 'active' : 'inactive'}`}>
                <div className="flex flex-col mb-2">
                  <div className="grid grid-cols-10 border-b-2  p-2">
                   
                    <div className="mt-2 col-span-9">
                        <input value={searchPhrase} onChange={handleSearch} onKeyUp={handleSearchNav} placeholder="Search" className="rounded-lg   focus:ring-opacity-0 outline-none  w-full p-1" />
                    </div>
                    <div className="flex flex-row justify-end col-span-1">
                      {loading ? <span className="bg-gray-100 px-2 border border-gray-200 rounded-lg pt-1"> <LoaderIcon /></span>  :  <span onClick={()=> { navigateToSearch(searchPhrase)}} className="flex flex-row justify-center items-center bg-white px-2 border border-gray-200  cursor-pointer  rounded-lg "> <SearchIcon /> </span> } 
                        {/* <CloseIcon /> */}
                    </div>
                  </div>
                </div>
                
                <div className={`products_area p-1 w-full z-20 flex flex-col ${ searchResults.products.length >= 1 || searchResults.custom.length >= 1 ? 'active' : 'inactive'}`}>
                  {searchResults.products.map((product) => {
                    return (<div className="text-sm my-1" key={product._id}>
                      {/* <Link href={`/product/${product.url}`} > */}
                      <span className="primary-text pointer p-1"  onClick={() => handleNavigation(`/product/${product.url}`)}>{product.name}</span>
                      {/* </Link> */}
                    </div>)
                  })}

                

                  {searchResults.custom.length >= 1 && searchResults.products.length >= 1 &&
                    <div className="border-t mt-1"></div>}

                  {searchResults.custom.slice(0, 6).map((custom) => {
                    return (<div className="text-sm my-1" key={custom._id}>
                      {/* <Link href={custom.url}>
                        <a>{custom.name} {custom.type} </a>
                      </Link> */}
                       <span
                        className="primary-text pointer p-1"
                        onClick={() => handleNavigation(custom.url)}>
                          {custom.name} {custom.type}
                        </span>
                    </div>)
                  })}

                </div>

                {searchPhrase != '' && !loading && searchResults.custom.length === 0 && searchResults.products.length === 0 &&
                    <div className="mt-1 text-center italic text-sm">No results</div>}

                {/* {loading && <div className="p-1 flex flex-col items-center justify-center h-full">
                  <div className="flat-btn flex flex-row">
                    <LoaderIcon /> <span className="pl-2 text-lg font-medium relative -top-1">Loading</span>
                  </div>
                </div>} */}

              
            </div>
            <style jsx> {`
                

                .search_area {
                    transition: 0.3s;
                }
                .search_area.active {
                    box-shadow: 0 0 8px #e3e3e3;
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

export default SearchWidget