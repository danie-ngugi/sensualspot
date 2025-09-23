import Head from 'next/head'
import Link from 'next/link'

import { connectToDatabase } from '../../util/db'

import { business, imageHost } from 'common/data'
import { formatDate, makeImageUrl } from 'common/methods'

const ProductGroups = ({ pages }) => {
    return (
        <div className=" mb-5 w-full">
             <Head>
                <title> {business.name} product collections </title>
                <meta name="description" content={`${business.name} product collection`} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            
          <div className="w-full">
            <div className="text-white transform bg-primary-1">
                <div className="max-w-6xl px-4 pt-32 pb-20 mx-auto transform sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-medium">Product collection</h1>
                    <p className="pt-4 text-xl text-gray-300 lg:w-3/6">
                   Explore vape product collections from renowned brands.
                    </p>
                </div>
            </div>
            <div className="mb-20 transform -skew-y-3 -mt-14 h-24 bg-primary-1"></div>
          </div>

          

          <div className="mx-auto px-8 pt-2">

            
          <section className="my-10">
				<ul className="grid grid-cols-2 gap-6">
					{pages.map((page) => {
						return (
							<li key={page._id} className="w-full">
								<Link
									className="bg-white p-4 rounded-sm w-full block"
									href={`/collections/${page.url}`}
								>
									{page.name}
								</Link>
							</li>

                            
						);
					})}
				</ul>
			</section>
         
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
            .sort({ createdAt: -1})
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

export default ProductGroups