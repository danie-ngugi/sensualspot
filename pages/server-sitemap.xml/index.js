import { getServerSideSitemap } from 'next-sitemap'

import { connectToDatabase } from '../../util/db'
const siteUrl = 'https://dallyvapes.co'

export const getServerSideProps = async (ctx) => {
  const { db } = await connectToDatabase()
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const products = await db.collection('products').find({}).toArray()
  const gifts = []

  //  const productUrl =

  const productUrls = products.map((product) => ({
    loc: `${siteUrl}/product/${encodeURI(product.url.split('&').join('&amp;'))}`,
    lastmod: new Date().toISOString()
  }))
//   const giftsUrl = gifts.map((gift) => ({
//     loc: `${siteUrl}/gifts/${encodeURI(gift.url.split('&').join('&amp;'))}`,
//     lastmod: new Date().toISOString()
//   }))

  const fields = [
    ...productUrls
  ]
  //  console.log(fields.length, 'fields')
  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
const Site = () => {}

export default Site
