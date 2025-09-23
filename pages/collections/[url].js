
import { connectToDatabase } from '../../util/db'

import { imageHost } from 'common/data'
import { makeImageUrl, renderText } from 'common/methods'
import SocialShare from 'components/blog/SocialShare'
import ProductPreviewList from 'components/products/ProductPreviewList'
import Head from 'next/head'

const ProductGroupDetail = ({ page, products }) => {

    // console.log(page)

    return (
        <div>
              <Head>
                <title> {page?.metaTitle ?? 'Vape product collections'} </title>
                <meta name="description" content={page?.metaDescription} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {/* <img
            className="hidden object-cover lg:inline h-[500px]"
            src="https://picsum.photos/1920/1400"
            width="1920"
            height="500"
            alt=""
            />
            <img
            className="object-cover lg:hidden h-96"
            src="https://picsum.photos/1920/1400"
            width="1920"
            height="384"
            alt=""
            /> */}

        <div className="max-w-6xl px-4 pt-8 pb-16 mx-auto transform lg:pt-20 sm:px-6 lg:px-8 lg:pb-24">
            <h1 className="px-3 mx-auto mb-6 text-4xl text-center"> {page?.h1 ?? page.name} </h1>
            
            <section className='w-full'>
                <ProductPreviewList  sm={4} xl={4}  products={products.productObjects} />
            </section>

            <section className='my-12  bg-white p-4'>
                {renderText(page.content)}
            </section>
            
        </div>
    </div>
    )
}

export async function getStaticPaths () {
  try {
    const { db } = await connectToDatabase()


    const posts =  await db
        .collection('pages')
        .find({})
        .toArray()

      const paths = posts.map((p) => ({ params: { url : p.url } }))

      return {
        paths,
        fallback: false
      }

  } catch (err) {
   return {
    paths: [],
    fallback: true
   } 
  }
}

export async function getStaticProps(context) {
  try {

    const url = context.params.url;
    const { db } = await connectToDatabase()


    const _products = await db.collection('pages').aggregate(
        [
            { $match: { url } },
            { "$unwind": "$productIds" },
            {
                $lookup: {
                    from: "products",
                    localField: "productIds",  
                    foreignField: "_id",  
                    as: "productObjects",
                    

                },
                 
            },
            { "$unwind": "$productObjects" },
            { "$group": {
                "_id": "$_id",
                "products": { "$push": "$products" },
                "productObjects": { "$push": "$productObjects" }
            }}
        ]
    ).toArray()

    const pageData = await db.collection('pages').find({
      url
    }) .toArray()

    
    const products =  _products[0] ?? null
    
    const page = await db.collection('pages').find({})
    .toArray()
    
    // console.log(pageData, 'page------')


    return {
      props: {
        page: JSON.parse(JSON.stringify(pageData[0] ?? {})),
        products: JSON.parse(JSON.stringify(products)),
      }
    }
  
  } catch(err) {
    return {
      props: {
        page: null,
        products: []
      }
    }
  }
}

export default ProductGroupDetail