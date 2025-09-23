import Head from 'next/head'   

import { connectToDatabase } from '../../util/db'

import HeaderBanner from "components/shared/HeaderBanner"
import { renderText } from 'common/methods'

const CorporateGifts = ({ page }) => {
    return(
        <div className="mx-auto pt-4">
            {page && (<Head>
                <title> {page.metaTitle} </title>
                <meta name="description" content={page.metaDescription} />
            </Head>)}
            <HeaderBanner title="Corporate Sales?" description="Place order for corporate." />
            
            <section className="px-4 lg:mx-auto max-w-7xl">

            <div className="mt-5 bg-white p-3 rounded-md w-full  ">
                {page && renderText(page.description)}
            </div>
            </section>
        </div>
    )
}

export async function getStaticProps() {
    try {
        const { db } = await connectToDatabase()

        const page = await db.collection('pagedatas').findOne({ url: '/corporate-sales'})

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


export default CorporateGifts