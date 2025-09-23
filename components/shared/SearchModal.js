import { useState, useContext, Fragment } from 'react';
import { Dialog, Combobox, Transition } from '@headlessui/react'

import { useRouter } from 'next/router';

import { LoaderIcon, SearchIcon } from 'components/icons';
import { SearchContext } from 'context/SearchContext';

let timeoutId;

const SearchModal = () => {
    const { isOpen, setIsOpen } = useContext(SearchContext)

    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [searchResults, setResults] = useState([])


    const router = useRouter()



    
    const handleSearch = async (phrase) => {
        try {
            if (!phrase.trim()) {
                return;
            }
            console.log('searching', phrase)
            setLoading(true)
            clearTimeout(timeoutId)
            timeoutId = setTimeout(async () => {
                const url = `/api/products/search/${phrase}`
                const response = await fetch(url)
                const data = await response.json()
                if (data && data.state) {
                    setResults(data.products)
                    setLoading(false)
                } else {
                    setResults([])
                    setLoading(false)
                }
            }, 300)
           
        } catch (err) {
            console.log(err)
        } finally {
            //  setLoading(false)
        }
    }

    return (
        <Transition.Root show={isOpen} as={Fragment} afterLeave={() => { setQuery('') }}>
        <Dialog onClose={setIsOpen} className="fixed inset-0 p-4 pt-[15vh] lg:pt-[25vh] overflow-y-auto z-30">
            <Transition.Child
                enter=" duration-300 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
             <Dialog.Overlay className=" fixed inset-0 bg-gray-400/60"  />
            </Transition.Child>


            <Transition.Child
                enter=" duration-300 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >

                <Combobox
                    as="div"
                    className="max-w-2xl p relative bg-white mx-auto rounded-xl shadow-2xl right-1 ring-black/5 divide-y divide-gray-100 overflow-hidden"
                    onChange={(item) => {
                        // navigate to result item
                        router.push(`/product/${item.url}`)
                        setIsOpen(false)
                        
                    }
                }
                    >
                    <div className="flex flex-row items-center px-4">

                    <SearchIcon style={{  width: '18px', color: '#9E9E9E' }} />
                    <Combobox.Input
                        className=" w-full bg-transparent ring-0 border-0 focus:ring-0 text-gray-800 placeholder-gray-400 h-12"
                        placeholder="Search..."
                        autoComplete="off"
                        onChange={(event) => {
                            setQuery(event.target.value)
                            handleSearch(event.target.value)
                        }}
                    >
                    </Combobox.Input>
                    </div>

                { !loading && searchResults.length > 0 && <Combobox.Options  static className="py-4 text-sm max-h-96 overflow-y-auto">
                        {searchResults.map((item) => {
                            return (
                                <Combobox.Option value={item} key={item._id} >
                                {
                                    ({active}) => (
                                        <div className={`space-x-1 px-4 py-2 flex ${active ? 'bg-primary-1' : 'bg-white'}`}>
                                            <span className={`font-medium ${active ? 'text-white' : 'text-gray-900' }`}>
                                                {item.name}
                                            </span>
                                            <span className={`${active ? 'text-orange-200' : 'text-gray-400'}`}>
                                                in products
                                            </span>
                                        </div>
                                    )
                                }
                            
                                    
                                </Combobox.Option>
                            )
                        })}
                        
                    </Combobox.Options>
                    }
                    {
                       !loading && query && searchResults.length === 0 ? (
                            <p className="p-4 text-sm text-gray-500">No results for <b>{query}</b> </p>
                        ) : null
                    }
                    {
                       loading ? (
                            <p className="p-4 text-sm text-gray-500 text-center"> <LoaderIcon /> </p>
                        ) : null
                    }
                </Combobox>
            </Transition.Child>
        </Dialog>
        </Transition.Root>
    );
}

export default SearchModal