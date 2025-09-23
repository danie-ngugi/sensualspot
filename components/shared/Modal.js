import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'


import { CloseIcon, LoaderIcon } from 'components/icons'

import useSearch from 'components/products/useSearch'

const Modal = ({handleClose}) => {
    let ab = true;

    if (ab) {
      return null;
    }

    const [searchPhrase, setSearchPhrase] = useState('')
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


    const handleSearch = async (e) => {
      const keyword = e.target.value;
      if (keyword.trim() === "") {
        //  console.log('returning... empty')
        setSearchPhrase('')
        resetResults()
        return;
      }
      if (keyword.trim() === searchPhrase) {
        //  console.log('returning... has not changed')
        return;
      }
      setLoading(true)
      const res = await fetch(`/api/products/search/${keyword}`)
      const data = await res.json()
      setLoading(false)


      if (data && data.state) {
        setSearchResults({ products: data.products, custom: data.custom })
      } else {
        resetResults()
        // server error
      }

    }

    const handleNavigation = (url) => {
      router.push(url)
      handleClose()
    }

    return (
        <div className="flex flex-col items-center">
            <div className="overlay" onClick={() => handleClose()}></div>
        
            <div className="modal absolute bg-white p-3 w-5/6 sm:w-3/6 overflow-scroll rounded-md">
                <div className="flex flex-col mb-2">
                  <div className="grid grid-cols-10 border-b-2 border-gray-300 p-2">
                   
                    <div className="mt-2 col-span-9">
                        <input autoFocus onChange={handleSearch} placeholder="Search" className="rounded-lg   focus:ring-opacity-0 outline-none  w-full p-1" />
                    </div>
                    <div className="flex flex-row justify-end col-span-1">
                        <span onClick={() => handleClose()} className="flex flex-row justify-center items-center bg-gray-100 px-2 border border-gray-200  cursor-pointer  rounded-lg text-true-gray-400"> esc </span>
                        {/* <CloseIcon /> */}
                    </div>
                  </div>
                </div>
                
                {!loading && <div className="p-1 flex flex-col">
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

                </div>}

                {loading && <div className="p-1 flex flex-col items-center justify-center h-full">
                  <div className="flat-btn flex flex-row">
                    <LoaderIcon /> <span className="pl-2 text-lg font-medium relative -top-1">Loading</span>
                  </div>
                </div>}

              
            </div>
            <style jsx> {`
                .modal{
                    z-index: 1000;
                }
                .overlay {
                    position: fixed;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background: rgba(0, 0, 0, 0.3);
                    z-index: 1000;
                }

                `} </style>
            </div>
        
    )
}

export default Modal