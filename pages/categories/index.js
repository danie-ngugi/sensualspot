import Link from 'next/link'

import { connectToDatabase } from '../../util/db'

import BrandsSection from 'components/shared/BrandSection'

const CategoriesPage = ({ categories, brands }) => {


    return (
        <div className="container mx-auto">
            <div className="p-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {categories && categories.map((category) => {
                  return (
                      (<Link
                          key={category._id}
                          href={`/${category.url}`}
                          className="bg-white text-center px-8 py-3 font-semibold rounded-md backdrop-filter backdrop-blur-lg bg-opacity-8 border-2 border-gray-200 border-opacity-90">

                          {category.name}

                      </Link>)
                  );
              })}
            </div>

            <div className="px-4 mt-8 mb-2">
                <div className=" text-2xl font-semibold text-center"> Brands  </div>
                <BrandsSection brands={brands} categories={categories} />
            </div>
        </div>
    );
}

export async function getStaticProps() {
    try {
        const { db } = await connectToDatabase()


        const _categoriesData =  db
            .collection('categories')
            .find({})
            .toArray()

        const _brandsData =  db
            .collection('brands')
            .find({})
            .toArray()

        const [_categories, _brands] = await Promise.all([ _categoriesData, _brandsData ])
        

        const categories = JSON.parse(JSON.stringify(_categories))
        const brands = JSON.parse(JSON.stringify(_brands))
        

        return {
            props: {
                categories,
                brands
            }
        }
    } catch (err) {
        console.log(err)
         return {
            props: { categories: [], brands: [] }
        }
    }
}

export default CategoriesPage