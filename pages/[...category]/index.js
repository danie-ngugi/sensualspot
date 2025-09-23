//  import { categories } from 'common/data'
import Head from 'next/head'
import Link from 'next/link'

import { connectToDatabase, ObjectId } from '../../util/db'
import { renderText } from '../../common/methods'

import ProductPreviewList from 'components/products/ProductPreviewList'
import PageHeader from 'components/shared/PageHeader'
import SubcategoriesList from 'components/shared/SubcategoriesList'

const CategoryPage = ({ products, category, subcategories, brands, subcategory, brand }) => {
    
    const subcategoryPath = subcategory ? { name: subcategory.name, url: `/${category.url}/${subcategory.url}` } : null

    const paths = [ { name: 'Home', url: '/' } ]
    let metaTitle = ''
    let metaDescription = ''
    let h1 = ''

    if (category) {
        paths.push({ name: category.name, url: '/' + category.url })
    }
    
    if (subcategoryPath) {
        paths.push(subcategoryPath)
    }

    if (brand) {
        // brand meta
    } else if (subcategory) {
        metaTitle = subcategory.metaTitle
        metaDescription = subcategory.metaDescription
        h1 = subcategory.h1
    } else {
        metaTitle = category?.metaTitle
        metaDescription = category?.metaDescription
        h1 = category?.h1
    }


    return (
        <div className="px-4 lg:mx-auto max-w-7xl pt-8 mb-8">

            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <header>
                <PageHeader title={h1} paths={paths} />
            </header>

            <div className="flex flex-col lg:flex-row mt-12 mb-8 gap-3">

                <aside className="w-full sm:w-1/6 bg-gray-200 p-2 flex-none order-1 lg:order-1 sm:mt-0 mt-3 rounded-sm">
                    {subcategories.length ? <section>
                        <h3 className="font-bold text-2xl text-primary-600">Category</h3>
                       <ul>
                        {subcategories.map((subcategory) => {
                            const url = `/${category.url}/${subcategory.url}`
                                return (
                                    <li className="my-2 py-1 " key={subcategory._id}>
                                        <Link href={url}>
                                            {subcategory.name}
                                        </Link>
                                    </li>
                                );
                            })}
                       </ul>
                    </section> : null}

                    <section className="mt-4">
                        <h3 className="font-bold text-primary-600 text-2xl">Brands</h3>

                        <ul className='flex flex-row flex-wrap gap-x-4 sm:gap-3 '>
                            {brands.map((brand) => {
                                const subUrl = subcategory ?  subcategory.url : category.url
                                const url = `/brand/${brand.url}`
                                return (
                                    <li className="my-2 py-1 bg-white bg-opacity-70 px-2 rounded-sm" key={brand._id}>
                                        <Link href={url}>
                                            {brand.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                </aside>

                <section className="order-2 lg:order-2">

                    {!subcategory && <SubcategoriesList category={category} subcategories={subcategories} />}
                    <ProductPreviewList sm={3} xl={4} hasSidbar={true} products={products} />
                </section>

               
            </div>

            <section className="prose max-w-screen-xl bg-white p-3 mb-5">
                    {renderText(category.description)}
            </section>
            
        </div>
    );
}

export async function getStaticPaths () {

  const { db } = await connectToDatabase()
  const categories = await db
    .collection('categories')
    .find({})
    .toArray()

    // console.log(categories.map((i) => ({url: i.url,name: i.name})), 'categories')



    const paths = []

    // JSON.parse(JSON.stringify(products))
    for (const category of categories) {
        paths.push({ params: { category : [category.url] } })
        // get subcategories related to this category
        const subs = await db
        .collection('subcategories')
        .find({ categoryId: category._id })
        .toArray()


        subs.forEach((sub) => {
            paths.push({ params: { category: [category.url, sub.url] } })
        })

    }
    //  categories.map((c) => paths.push({ params: { category : [c.url] } }))
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps (context) {
    try {
        const { db } = await connectToDatabase()
        // const categoryUrl = context.params.category
        const [categoryUrl, subcategoryUrl] = context.params.category
        
        let subcategory = null
        // get category
        const _category = await db
            .collection('categories')
            .findOne({ url: categoryUrl })

        const category = JSON.parse(JSON.stringify(_category))

        const _subcategories = await db
            .collection('subcategories')
            .find({ categoryId: ObjectId(category._id) })
            .toArray()

        const _brands = await db
            .collection('brands')
            .find({ categoryId: ObjectId(category._id) })
            .toArray()

        const subcategories = JSON.parse(JSON.stringify(_subcategories))
        const brands = JSON.parse(JSON.stringify(_brands))

        let query = { categoryId: ObjectId(category._id) }

        if (subcategoryUrl) {
          const _subcategory = await db
            .collection('subcategories')
            .findOne({ url: subcategoryUrl })

          const subCat = JSON.parse(JSON.stringify(_subcategory))
          subcategory = subCat;
            //   subcategories: { $in: ObjectId(subCat._id) }
          query = { ...query, subcategories: { $in: [ ObjectId(subCat._id) ]} }
        }

        const _products = await db
            .collection('products')
            .find(query)
            .sort({ availability: -1, brandId: 1 })
            .toArray()

        const products = JSON.parse(JSON.stringify(_products));

        return {
            props: {
                products,
                category,
                subcategories,
                subcategory,
                brands
            }
        }
        
    } catch (err) {
        console.log(err.message)
        return { props: { products: [], category: null, subcategories: [], brands: [] } }
    }
}

export default CategoryPage