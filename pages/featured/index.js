import Link from 'next/link'

import { connectToDatabase } from '../../util/db'

const FeaturedList = ({ pages, error }) => {

    if (error) {
        return (
            <div className="container mx-auto pt-6">
            <div className="flex flex-row bg-white">
                 {error}
            </div>
         </div>
        )
    }

    return (
        <div className="container py-8 px-4 lg:mx-auto max-w-7xl ">
             <div className="text-2xl text-center font-medium primary-text mb-8 mt-6">
                   Featured products
               </div>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3 mb-12">
              
                {pages?.map((page) => {
                    return (
                        (<Link
                            href={`/featured/${page.url}`}
                            key={page._id}
                            className="px-6 py-4 h-28 flex text-lg flex-col items-center justify-center rounded-lg bg-white shadow-sm  first-letter:capitalize">

                            {page.name}

                        </Link>)
                    );
                })}
           </div>
        </div>
    );
}




export async function getStaticProps() {
    try {
        const { db } = await connectToDatabase()


        const pages =  await db
            .collection('pages')
            .find({})
            .toArray()

        

        return {
            props: { pages: JSON.parse(JSON.stringify(pages))  }
        }
    } catch (err) {
         return {
            props: { pages: [], error: err.message }
        }
    }
}

export default FeaturedList