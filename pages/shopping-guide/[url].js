
import { connectToDatabase } from '../../util/db'

import { imageHost } from 'common/data'
import { getActivePrice, getVariantPrice, makeImageUrl, renderText, toCurrency } from 'common/methods'
import SocialShare from 'components/blog/SocialShare'
import YoutubeVideo from 'components/shared/YoutubeVideo'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const countryImportance = 0;
const hasAbv = false;
const isVape = true;

const GuidePost = ({ post, sections }) => {
    const guide = post;

    // console.log(sections, 'sections')

    return (
        <div>
              <Head>
                <title> {post?.metaTitle} </title>
                <meta name="description" content={post?.metaDescription} />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {/* <img
            className="hidden object-cover lg:inline h-[500px]"
            src="https://picsum.photos/1920/1400"
            width="1920"
            height="500"
            alt=""
            />
            <img
            className="object-cover lg:hidden h-96"
            src="https://picsum.photos/1920/1400"
            width="1920"
            height="384"
            alt=""
            /> */}

<div className="max-w-3xl px-4 pt-8 pb-16 mx-auto transform lg:pt-20 sm:px-6 lg:px-8 lg:pb-24">
      <h1 className="px-3 mx-auto mb-4 text-4xl text-center"> {post?.heading} </h1>
      <h3 className="px-3 pb-6 text-center text-gray-500">
       {post?.preview}
      </h3>
     
       <SocialShare post={post} />

        <div className="flex flex-col items-center  mt-10 mb-5">
          <img
            className="w-full rounded-lg aspect-video "
            src={post.banner ? makeImageUrl(post.banner, '/blog') : `${imageHost}/blog/` + (post.banner ? post.banner : `${post.url}.webp`) }
            alt=""
          />
          {/* <span className="text-sm text-gray-500">This is an amazing picture</span> */}
        </div>

      {/* <div
        className="max-w-3xl mx-auto  prose text-gray-700 transform prose-primary mb-8 "
      >
        {renderText(post?.introduction)}
        {
          post.sections.map((section) => {
            return (
              <div key={section._id} className="w-full">
                <h3 className=""> {section.heading} </h3>
                 <div className="flex flex-col items-center px-4">
                   
                    <img
                      className="w-full rounded-lg aspect-video "
                      src={ section.image ? makeImageUrl(section.image, '/blog') : `${imageHost}/blog/` + section.image }
                      alt=""
                    />
                  </div>

                  {renderText(section?.content)}

              </div>
            )
          })
        }


     
       
     
      </div> */}

        <div className='bg-white p-3 rounded-sm'>
            {renderText(guide?.introduction ?? '')}
        </div>
            
        <div>
					<section className="my-12 mx-auto max-w-[86vw] overflow-x-auto">
						<table className="min-w-full text-left">
							<caption className="capitalize-fist text-right mt-3 text-muted first-letter:capitalize ">
								{" "}
								{guide?.h1}{" "}
							</caption>

							<thead className="border-b">
								<tr>
									<th className="px-6 py-4 text-left">Product</th>
									<th className="px-6 py-4 text-left">Price</th>
									{hasAbv && <th className="px-6 py-4 text-left"> ABV </th>}
									{countryImportance > 1 ? (
										<th className="px-6 py-4 text-left">Country </th>
									) : null}
									<th> Availability </th>
								</tr>
							</thead>

							<tbody>
								{sections.map((section, index) => {
									const product = section?.product[0];
								

									const title = product && product.variants ? product?.variants[0]?.title : "";

									return product?.variants?.length > 0 ? (
										<React.Fragment key={product.id}>
											{product?.variants?.map((variant) => (
												<tr key={variant.id} className="border-b">
													<td className="px-6 py-4 whitespace-nowrap capitalize">
														{" "}
														{product.name} - {variant.title}{" "}
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														{" "}
														{toCurrency(getVariantPrice(variant, product))}{" "}
													</td>
													{hasAbv && (
														<td className="px-6 py-4 whitespace-nowrap">
															{isVape ? title : `${product.abv}%`}{" "}
														</td>
													)}
													<td className="px-6 py-4 whitespace-nowrap">
														{" "}
														{variant.inStock ? "In stock" : "Out of stock"}{" "}
													</td>
												</tr>
											))}
										</React.Fragment>
									) : (
										<tr key={product?._id} className="border-b">
											<td className="px-6 py-4 whitespace-nowrap capitalize">
												{" "}
												{product?.name}{" "}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												{" "}
												{/* {toCurrency(getProductPrice(product).value)} */}
												{toCurrency(100)}
											</td>
											{hasAbv && (
												<td className="px-6 py-4 whitespace-nowrap">
													{" "}
													{isVape ? title : `${product.abv}%`}{" "}
												</td>
											)}
											<td className="px-6 py-4 whitespace-nowrap">
												
												{product?.availability
													? "In stock"
													: "Out of stock"}
											</td>
										</tr>
									);
									// })
								})}
							</tbody>
						</table>
					</section>


                    <ul className=" list-none ">
					{sections?.map((section, index) => {
						const product = section?.product[0];
						return (
							<li key={section._id} className="my-12">
								{product && (
									<h2 className="text-3xl flex gap-2 font-bold my-3 first-letter:capitalize">
										<Link href={`/product/${product?.url}`}>
										<span> {index + 1}.</span>{" "}
											{section?.title ?? product?.name}
										</Link>
									</h2>
								)}
								{section.image && (
									<div>
										<img
											className=" max-h-[380px] object-cover w-full"
											src={makeImageUrl(section.image, '/guides')}
											alt={`${guide.h1} - ${section?.heading}`}
											loading="lazy"
										/>
									</div>
								)}
								<section className="py-2">{renderText(section?.content ?? "")}</section>

								
							</li>
						);
					})}
				</ul>


                <div className="mt-6">{renderText(guide?.conclusion ?? "")}</div>


                {guide.video && <section className="my-6 bg-card p-3">
				<YoutubeVideo video={guide?.video} />
			</section>}

				</div>


        <SocialShare post={post} />
     
    </div>
        </div>
    )
}

export async function getStaticPaths () {
  try {
    const { db } = await connectToDatabase()


    const posts =  await db
        .collection('shoppingguides')
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


    // const post =  await db
    //     .collection('shoppingguides')
    //     .findOne({ url: url })

        const _posts = await db.collection('shoppingguides').aggregate(
            [
                { $match: { url } },
                {
                    $lookup: {
                        from: "sections",
                        localField: "sectionId",    // field in the orders collection
                        foreignField: "_id",  // field in the items collection
                        as: "sections",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "products",
                                    localField: "productId",    // field in the orders collection
                                    foreignField: "_id",  // field in the items collection
                                    as: "product",
                                }
                            }
                        ]
                    },
                     
                },
            ]
        ).toArray()
        
    
        const post = _posts[0] ?? null

        const sections = await db.collection('guideSection').aggregate(
            [
                { $match: { guideId: post?._id } },
                {
                    $lookup: {
                        from: "products",
                        localField: "productId",    // field in the orders collection
                        foreignField: "_id",  // field in the items collection
                        as: "product",
                    },
                     
                },
            ]
        ).toArray()


        // console.log(sections)
        


    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
        sections: JSON.parse(JSON.stringify(sections))
      }
    }
  
  } catch(err) {
    return {
      props: {
        post: null,
        sections: []
      }
    }
  }
}

export default GuidePost