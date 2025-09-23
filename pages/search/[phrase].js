import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'

import SearchWidget from "components/shared/Search"

const SearchPage = ({ products, custom }) => {
    const router = useRouter()
    const { pid } = router.query

    const [keyword, setKeyword] = useState('')


    useEffect(() => {
        // const { phrase } = router.query
        // setKeyword(phrase)
    }, [ pid ])

    return (<div className="h-screen flex flex-col">

        <div className="pt-6 z-20">
            {/* <SearchWidget keyword={keyword} /> */}
        </div>
        <div className="relative top-24">
           
        </div>


    </div>)
}

export async function getServerSideProps () {
    try {

    } catch (err) {
        return {
            props: {
                products: [],
                custom: []
            }
        }
    }
}

export default SearchPage