import Head from 'next/head'

import { connectToDatabase } from 'util/db'

import ProductPreviewList from 'components/products/ProductPreviewList'

import FooterContent from 'components/home/FooterContent'

//  import HomeCarousel from 'components/home/carousel'
import HomeBanner from 'components/home/Banner'

import ContactUsSection from 'components/shared/ContactUsSection'

// import QuickAction from 'components/home/QuickAction'
// import QuickCategories from 'components/home/QuickCategories'

import OfferBanner from 'components/shared/OfferBanner'
// import StackingCards from 'components/home/StakckingCards'
// import ImageCollage from 'components/home/ImageCollage'
// import QuickInfo from 'components/home/QuickInfo'
import FeaturedCarousel from '../components/products/FeaturedCarousel'
import FeaturedBrands from '../components/shared/FeaturedBrands'
import { business, siteUrl } from '../common/data'
import HomeCarousel from '../components/home/carousel'
import { CategoryMenu } from 'components/home/CategoryMenu'




export default function IndexPage({ onOffer, newArrivals, bestSeller, offerBundles, brands, meta, discount, categories }) {


  return (
    <div className="bg h-full px-2 md:px-4 lg:mx-auto xl:max-w-7xl ">
       <Head>
        <title>{meta?.metaTitle}</title>
        <meta name="description" content={meta?.metaDescription} />

        <script type='application/ld+json' dangerouslySetInnerHTML={
          { __html: `
        
          {
            "@context": "https://schema.org",
            "@type": "Store",
            "image": [
              "https://dallyvapes.co.ke/icon.png"
             ],
            "name": "${business.name}",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "${business.location}",
              "addressLocality": "Nairobi",
              "addressRegion": "Nairobi",
              "addressCountry": "KE"
            },
            "review": {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "4.7",
                "bestRating": "5"
              },
              "author": {
                "@type": "Kim",
                "name": "Kimani"
              }
            },
           
            "url": "${siteUrl}",
            "telephone": "${business.phone}",
            "priceRange": "$$$",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
              }
            ]
          
        }
  
          
          `}
        } ></script>
      </Head>
      <div className="sm:pt-6">
        <HomeCarousel />
      </div>
  
      {/* <div className="mt-12 mb-10">
        <QuickInfo />
      </div> */}


      <div  className="mt-14 mb-14">
        <CategoryMenu categories={categories ?? []} />
      </div>


      <section className="my-12">
        
        <h2 className=" my-3 p-2 mt-8 font-bold text-2xl sm:text-3xl bg-white text-secondary-1 rounded-sm mb-6">  Popular products </h2>
        <ProductPreviewList sm="4" xl={6} products={bestSeller} />
       
      </section>


      <section className="w-full  p-2 my-12 flex flex-col">
        <h2 className=" p-2 font-bold text-2xl sm:text-3xl bg-white/40 text-secondary-1 rounded-sm mb-6">New in Market</h2>
        <FeaturedCarousel products={[ ...newArrivals ]} />
      </section>



      

      
      {/* Product on offer */}
      {/* <section className="my-12">
        <h2 className=" my-3 p-2 font-bold text-x2 sm:text-3xl bg-white text-secondary-1 rounded-sm mb-6"> Products on Offer  </h2>
        
        <ProductPreviewList sm="4" xl={4} products={onOffer} />
        
      </section> */}

      {/* <section className="flex flex-col">
        <h2 className=" my-3 p-2 font-bold text-x2 sm:text-3xl bg-white text-secondary-1 rounded-sm mb-6"> Deals of the week  </h2>
        
          <FeaturedCarousel products={offerBundles} />
        
      </section> */}


      {discount && <div className="mt-6">
        <OfferBanner discount={discount} />
      </div>}





      <div className=" mb-14 mt-14">
        <ContactUsSection />
      </div>


      <section>
        <FeaturedBrands brands={brands} />
      </section>


      <section className="py-20">
        <FooterContent content={meta?.description} />
      </section>

      <style jsx>
        {`
          .no-outline {
            outline: none;
            border: 0;
          }
        `}
      </style>
    </div>
  )
}

export async function getStaticProps() {
  const { db } = await connectToDatabase()



  const [newArrivals, offerBundles, onOffer, bestSeller, discount, meta, _brands, categories ] = await Promise.all([
    // new arrivals
      db
        .collection('products')
        .find({ newArrival: true, featured: true })
        .sort({ categoryId: 1 })
        .limit(12)
        .toArray(),

        // treding produccts
      db
        .collection('products')
        .find({  offerBundle: { $ne: null } })
        .sort({ categoryId: 1 })
        .limit(12)
        .toArray(),


        // products on offer
      db
        .collection('products')
        .find({ availability: true, featured: true, $or:[ { offerPrice: { $gt: 0 } }, { "variants.offerPrice": { $gt: 0 }} ] })
        .sort({ categoryId: 1 })
        .limit(12)
        .toArray(),

      // db.collection('products')
      //   .aggregate([
      //     {$project: {
      //       cmp_value: {$cmp: ['$offerPrice', {$add: ['$price', 100]}]},
      //       obj: '$$ROOT'
      //     }},
      //     { $match: { $and: [{ cmp_value: { $gt: 0 } }, { offerPrice: { $gt: 0 } }] }},
      //     { $replaceRoot: { newRoot: '$obj' } }
      //   ]).limit(4).toArray(),

        // best sellers / popular
      db
        .collection('products')
        .find({ featured: true, bestSeller: true })
        .sort({ categoryId: 1 })
        .limit(12)
        .toArray(),

      db
        .collection('dicountcodes')
        .findOne({ 'endDate': { $gte: new Date() } }),

      db
        .collection('pagedatas')
        .findOne({ url: '/'}),

      db.collection('brands').aggregate([
          { $match: { featured: true } },
          {
              $lookup: {
                  from: "categories",
                  localField: "categoryId",    // field in the orders collection
                  foreignField: "_id",  // field in the items collection
                  as: "category"
                },
                
          },
        ]).toArray(),
        db.collection('categories').find({}).toArray() 


  ])


  const brands = _brands.reduce((acc, cur) => {
    const categoryName =  cur?.category[0]?.name ?? ''
    // console.log(categoryName)
    if (acc[categoryName]) {
      return { ...acc, [categoryName]: [ ...acc[categoryName], cur ]}
    } else {
      return { ...acc, [categoryName]: [cur]}
    }
  }, {})

  // console.log(discount)
  return { props: {
      brands: JSON.parse(JSON.stringify(brands)),
      bestSeller: JSON.parse(JSON.stringify(bestSeller)),
      offerBundles: JSON.parse(JSON.stringify(offerBundles)),
      onOffer: JSON.parse(JSON.stringify(onOffer)),
      meta: JSON.parse(JSON.stringify(meta)),
      discount: JSON.parse(JSON.stringify(discount)),
      newArrivals: JSON.parse(JSON.stringify(newArrivals)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
    revalidate: 600
  }
}
