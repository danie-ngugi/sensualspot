import { connectToDatabase } from '../../util/db'

import ProductPreviewList from 'components/products/ProductPreviewList'

import { renderText } from '../../common/methods'

const FeaturedCategory = ({ products, page }) => {
    return (
        <div className="container mx-auto pt-6  py-8 px-4 lg:mx-auto max-w-7xl">
           <div className="flex flex-col">
               <div className=" mb-6 mt-4 text-center ">
                   <h1 className="text-2xl font-bold primary-text first-letter:capitalize first-letter:text-4xl">{page?.name}</h1>
                </div>

               <div className="border-l-4 border-green-400 bg-green-50 p-3 m-2 mb-6 first-letter:capitalize">
                   {page?.summary}
               </div>

               <section className="flex row mb-8 mt-6"> 
                <ProductPreviewList products={products} />
               </section>

                <div className="prose max-w-screen-xl bg-white p-3 mb-5">
                    {renderText(page?.content)}
                </div>
            </div>
        </div>
    );
}

// old code
export async function getStaticPaths() {

    const { db } = await connectToDatabase()
    const pages = await db
      .collection('pages')
      .find({})
      .toArray()
      //  console.log(products)
      // JSON.parse(JSON.stringify(products))
      const paths = pages.map((p) => ({ params: { url : p.url } }))
      return {
        paths,
        fallback: false
      }
}

export async function getStaticProps(context) {
    try {
        const url = context.params.url;
        const { db } = await connectToDatabase()


        const products =  await db
            .collection('products')
            .find({"customPages.url": url })
            .toArray()
        const page =  await db
            .collection('pages')
            .findOne({"url": url })

        

        return {
            props: { 
                products: JSON.parse(JSON.stringify(products)),
                page: JSON.parse(JSON.stringify(page))
            }
        }
    } catch (err) {
         return {
            props: { products: [], page: null, error: err.message }
        }
    }
}


export default FeaturedCategory