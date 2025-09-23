
import { connectToDatabase } from '../../util/db'

import { imageHost } from 'common/data'
import { makeImageUrl, renderText } from 'common/methods'
import SocialShare from 'components/blog/SocialShare'
import Head from 'next/head'

const BlogPost = ({ post }) => {

  console.log(post.metaTitle)


  if (!post) {
    return (
      <div className="max-w-3xl  p-8 pb-16 mx-auto transform lg:pt-20  lg:pb-24">
        Error loading the page
      </div>
    )
  }

    return (
        <div>
          <Head>
            <title>{post?.metaTitle ?? 'Post'}</title>
            <meta name="description" content={post?.metaDescription ?? 'Post'} />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
        <article className="max-w-3xl  pt-8 pb-16 mx-auto transform lg:pt-20  lg:pb-24 ">
          <h1 className="px-3 mx-auto mb-4 text-4xl text-center"> {post?.heading} </h1>
          
          <h3 className="px-3 pb-6 text-center text-gray-500">
          {post?.preview}
          </h3>    
        
          <SocialShare post={post} />

          <div className="flex flex-col items-center  mt-10 mb-5">
            <img
              className="w-full rounded-lg aspect-video "
              // `${imageHost}/blog/` + 
              src={makeImageUrl((post?.image ? post?.image : `${post?.url}.webp`), '/blog')}
              alt=""
            />
          </div>


          <div className="bg-white/50 p-3">


              <section
              className="max-w-3xl mx-auto  prose text-gray-700 transform prose-primary mb-8  "
            >
              {renderText(post?.introduction)}

              {
                post?.sections?.map((section) => {
                  return (
                    <div key={section?._id} className="w-full">
                      <h3 className=""> {section?.heading} </h3>
                      
                      <div className="flex flex-col items-center px-4">
                        
                        {
                          section?.image && (
                            <img
                              className="w-full rounded-lg aspect-video "
                              src={makeImageUrl(section?.image, '/blog')}
                              alt=""
                            />
                          )
                        }

                      </div>

                      {renderText(section?.content)}
                    </div>
                  )
                })
              }
          
            </section>


            <section className="my-6">
              {renderText(post?.conclusion)}
            </section>
            <SocialShare post={post} />
          </div>

      
        </article>
    </div>
    )
}

export async function getStaticPaths () {
  try {
    const { db } = await connectToDatabase()


    const posts =  await db
        .collection('blogs')
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


    const post =  await db
        .collection('blogs')
        .findOne({ url: url })


    return {
      props: {
        post: JSON.parse(JSON.stringify(post))
      }
    }
  } catch(err) {
    return {
      props: {
        post: null
      }
    }
  }
}

export default       BlogPost