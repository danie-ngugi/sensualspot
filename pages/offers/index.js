import Head from 'next/head'

import { connectToDatabase } from '../../util/db'

import ProductPreviewList from 'components/products/ProductPreviewList'
import { renderText } from 'common/methods'

const Offers = ( { products, page }) => {

    return (
        <div className="pt-8 container mb-5 px-4 lg:mx-auto max-w-7xl ">
             {page ? (
                 <Head>
                    <title> {page.metaTitle} </title>
                    <meta name="description" content={page.metaDescription} />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
             ): (
                <Head>
                    <title>Offers</title>
                </Head>
             )}
            
            <div>
               {
                products && products.length >= 1 ? (
                    <section className="flex flex-col">
                        <h1 className="text-3xl font-bold text-primary-1 text-center mt-10 mb-6">Offers and Discounts</h1>
                       <div>
                            <ProductPreviewList sm="4" xl={4} products={products} /> 
                       </div>
                    </section>
                )
                : <div className="text-center text-3xl font-bold text-gray-500 mt-24">No offers</div>
                }
            </div>

            <div className=" mx-auto ">
               <div className="mt-8 bg-white p-3 rounded-md w-full">
               {page && renderText(page.description)}
               </div>
            </div>
        </div>
    )
}

export async function getStaticProps () {
    try {

        const { db } = await connectToDatabase()


        const products =  await db
            .collection('products')
            .find({ availability: true, $or: [
                { offerPrice: { $gt: 0} },
                { "variant.offerPrice": { $gt: 0} },
                { offerBundle: { $ne: null }}
            ] })
            .toArray()
        const meta = await db.collection('pagedatas').findOne({ url: '/offers'})

        return {
            props: {
                products: JSON.parse(JSON.stringify(products)),
                page: JSON.parse(JSON.stringify(meta))
            }
        }

    } catch (err) {
        return {
            props: {
                products: [],
                error: err.message,
                page: null
            }
        }
    }
}

export default Offers