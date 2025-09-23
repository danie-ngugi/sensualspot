import Head from 'next/head'   

import { connectToDatabase } from '../../util/db'

import HeaderBanner from "components/shared/HeaderBanner"
import { renderText } from 'common/methods'

const ShippingPolicy = ({ page }) => {
    return(
        <div className="mx-auto -mt-1">
            {page && (<Head>
                <title> {page.metaTitle} </title>
                <meta name="description" content={page.metaDescription} />
            </Head>)}
            <HeaderBanner title={page?.h1} description="Shopping and delivery policy" />
            
            <section className="px-4 lg:mx-auto max-w-7xl">

            <div className=" mt-5 bg-white p-3 rounded-md w-full ">
                {page && renderText(page.description)}
            </div>
           
            </section>
        </div>
    )
}

export async function getStaticProps() {
    try {
        const { db } = await connectToDatabase()

        const page = await db.collection('pagedatas').findOne({ url: '/shipping-policy'})

        return {
            props: {
                page: JSON.parse(JSON.stringify(page))
            }
        }


    } catch (err) {
        return {
            props: {
                page: null
            }
        }
    }
}


export default ShippingPolicy