import Head from 'next/head'

import { connectToDatabase } from '../../util/db'

import ProductPreviewList from 'components/products/ProductPreviewList'
import PageHeader from 'components/shared/PageHeader'

import BrandsTable from 'components/products/BrandsTable'

import { renderText } from 'common/methods'

const BrandPage = ({ brand, products }) => {
  const paths = [ {name: 'Brands', url: '/brands' }, 
    { name: brand.name, url: `/brand/${brand.url}`}
   ]
  return (
    <div className="p-2 pt-8 px-4 lg:mx-auto max-w-7xl">
      <Head>
          <title> {brand.titleTag} </title>
          <meta name="description" content={brand.metaDescription} />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
        <PageHeader title={brand.h1} paths={paths} />

       <div className="mt-12 mb-12">
         <ProductPreviewList sm="4" products={products} />
       </div>
       <div className="mt-4 mb-5 bg-white p-3">
         <BrandsTable sm="6" products={products} brand={brand.name} />
       </div>
       <div className="mt-4 mb-5 bg-white p-3">
         {renderText(brand.description)}
       </div>
    </div>)
}

export async function getStaticPaths() {
  const { db } = await connectToDatabase()
  const brands = await db
    .collection('brands')
    .find({})
    .toArray()
  
  const categories = await db
    .collection('categories')
    .find({})
    .toArray()
  const subcategories = await db
    .collection('subcategories')
    .find({})
    .toArray()

  let paths = []

   brands.map((brand) => {
    paths.push({ params: { brand:[ brand.url ] } })

    // categories.forEach((category) => {
    //   paths.push({ params: { brand:[ brand.url, category.url ] } })
    // })

    // subcategories.forEach((sub) => {
    //   paths.push({ params: { brand:[ brand.url, sub.url ] } })
    // })


  })
  return {
    paths,
    fallback: false // See the "fallback" section below
  }
}

export async function getStaticProps(context) {
  const { db } = await connectToDatabase()
  const [url, category] = context.params.brand;

 
  

  const brand = await db
    .collection('brands')
    .findOne({ url })

  let query = { brandId: brand._id }

  if (category) {
   

    const [ cat, subcat ] = await Promise.all([
      await db
      .collection('categories')
      .findOne({ url: category }),
      await db
      .collection('subcategories')
      .findOne({ url: category })
    ])

    if (cat) {
      query = { ...query, categoryId: cat._id }
    }

    if (subcat) {
      query = { ...query, subcategoryId: subcat._id }
    }
  }
  
  const _products = await db
    .collection('products')
    .find({ ...query })
    .sort({ availability: -1 })
    .toArray()
  const products = JSON.parse(JSON.stringify(_products))

  return {
    props: { brand: JSON.parse(JSON.stringify(brand)), products  }
  }
}

export default BrandPage
