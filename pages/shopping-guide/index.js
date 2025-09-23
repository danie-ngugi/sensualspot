import Head from 'next/head'
import { connectToDatabase } from '../../util/db'

import { imageHost } from 'common/data'
import { formatDate, makeImageUrl } from 'common/methods'
import Link from 'next/link'

const ShoppingGuide = ({ posts }) => {
    return (
        <div className="px-2 pt-2 container mb-5">
             <Head>
                <title> Shopping guide </title>
                <meta name="description" content="Shopping guide" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className='my-12 text-3xl font-bold'>
                Shopping guide
            </div>

            <div className="grid grid-cols-1 gap-8 mt-12 mb-8 lg:grid-cols-3 lg:space-y-0">
            {
                posts.map((post) => {
                    console.log(post)
                    return (
                        (<Link
                            href={`/shopping-guide/${post.url}`}
                            key={post._id}
                            className="block bg-white rounded-lg">

                            <img
                                className="object-cover w-full h-48 rounded-t-lg"
                                src={post.banner ? makeImageUrl(post.banner, '/guide') : ` ${imageHost}/guide/` + (post.banner ? post.banner : `${post.url}.webp`) }
                                alt=""
                            />
                            <div className="flex flex-col p-6 text-gray-800">
                                <h2> {post.heading} </h2>
                                <p className="mt-3 text-gray-600">
                                {post?.preview}
                                </p>
                                <hr className="w-full my-5 divider" />
                                <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <img className="w-8 h-8 rounded-full" src="/icon.png" alt="Shop logo" />
                                    <h4>Admin</h4>
                                </div>
                                <p className="text-sm"> {formatDate(post?.createdAt)} </p>
                                </div>
                            </div>

                        </Link>)
                    );
                })
            }

            </div>
        </div>
    )
}

export async function getStaticProps() {
    try {
        const { db } = await connectToDatabase()


        const posts =  await db
            .collection('shoppingguides')
            .find({})
            .sort({ createdAt: -1 })
            .toArray()

        

        return {
            props: { posts: JSON.parse(JSON.stringify(posts))  }
        }
    } catch (err) {
         return {
            props: { posts: [], error: err.message }
        }
    }
}

export default ShoppingGuide