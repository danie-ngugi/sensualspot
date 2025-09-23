import { connectToDatabase } from '../../util/db'

import BrandsSection from 'components/home/Brands'

const Brands = ({ brands }) => {
  return (
      <div className=" px-4 py-8 lg:mx-auto max-w-7xl">
         <div className="pt-8">
           <BrandsSection brands={brands} />
         </div>
      </div>
  )
}

export async function getStaticProps() {
  const { db } = await connectToDatabase()

  const featuredBrands = await db
    .collection('brands')
    .find({})
    .toArray()

  return { props: {
      brands: JSON.parse(JSON.stringify(featuredBrands)),
    }
  }
}

export default Brands
