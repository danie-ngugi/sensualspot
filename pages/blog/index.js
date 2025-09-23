import Head from 'next/head'
import Link from 'next/link'

import { connectToDatabase } from '../../util/db'

import { imageHost } from 'common/data'
import { formatDate, makeImageUrl } from 'common/methods'
import Image from 'next/image'
import { renderText } from '../../common/methods'
import { siteUrl } from '../../common/data'

const Blog = ({ posts }) => {
    return (
        <div className=" mb-5 w-full">
             <Head>
                <title> Blog </title>
                <meta name="description" content="Blog" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            
          <div className="w-full">
            <div className="text-white transform bg-primary-1">
                <div className="max-w-6xl px-4 pt-32 pb-20 mx-auto transform sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-medium">Blog</h1>
                    <p className="pt-4 text-xl text-gray-300 lg:w-3/6">
                    Keep up to date with everything we're working on.
                    </p>
                </div>
            </div>
            <div className="mb-20 transform -skew-y-3 -mt-14 h-24 bg-primary-1"></div>
          </div>

          <div className="mx-auto px-8 pt-2">

          <ul className="grid grid-cols-1 gap-8 mt-12 mb-8 lg:grid-cols-3 lg:space-y-0">
            {
                posts.map((post) => {
                    return (
                        (
                        <li  key={post._id} className="bg-gray-100">
                            {/* <Link
                                href={`/blog/${post.url}`}
                                className="block bg-white rounded-lg"> */}


                                <>
                                    <img
                                        className="object-cover  rounded-t-lg"
                                        src={makeImageUrl((post?.image ? post?.image : `${post?.url}.webp`), '/blog')}
                                        alt={`${post.heading} - blog post`}
                                        width={600}
                                        height={560}
                                    />
                                    <div className="flex flex-col p-6 text-gray-800">
                                        <h2 className="font-semibold text-lg">
                                            <Link href={`/blog/${post.url}`}>  {post.heading} </Link>
                                        </h2>

                                        <blockquote cite={`${siteUrl}/blog/${post.url}`} className="mt-3 text-gray-600">
                                            {renderText(post?.preview)}
                                        </blockquote>

                                        <hr className="w-full my-5 divider" />
                                        <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <img className="w-8 h-8 rounded-full" src="/icon.png" alt="Shop logo" />
                                            <h4>Admin</h4>
                                        </div>
                                        <p className="text-sm"> {formatDate(post?.createdAt)} </p>
                                        </div>
                                    </div>
                                </>

                            {/* </Link> */}
                        </li>
                        )
                    );
                })
            }

            </ul>

         
          </div>
        </div>
    );
}


export async function getStaticProps() {
    try {
        const { db } = await connectToDatabase()


        const posts =  await db
            .collection('blogs')
            .find({ published: true })
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

export default Blog