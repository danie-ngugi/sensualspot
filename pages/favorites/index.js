import { useContext } from 'react'

import Head from 'next/head'

import PageHeader from 'components/shared/PageHeader'
import ProductPreviewList from 'components/products/ProductPreviewList'

import { FavoriteContext } from '../../context/FavoriteContext'

const Favorites = () => {
    const { favorites } = useContext(FavoriteContext)
    const paths = [
        { name: 'Home', url: '/', active: false },
        { name: 'Favorites', url: '/favorites', active: true }
    ]
    return (
        <div className="px-2 pt-2 container mb-5">
        <Head>
            <title> Wish list </title>
            <meta name="description" content="My wishlist" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div>
            <PageHeader title="Favorites" paths={paths} />
        </div>

            <div className="mt-5">
                <ProductPreviewList products={favorites} />
            </div>
        </div>
    )
}

export default Favorites
