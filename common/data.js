
export const categories = []

export const domain = "sensualspot.co.ke"

export const business = {
  name: 'Sensual Spot',
  phone: '+254790725565',
  whatsAppPhone: '254790725565',
  email: `info@${domain}`,
  gmail: 'sensual.gspot@gmail.com',
  salesEmail: `ales@${domain}`,
  location: 'Nairobi, Kenya',
  hours: '24 hours (24/7)',
  till: '000000'
}

export const quickLinks = [
  { page: 'Offers', url: '/offers' },
  { page: 'Shop by brand', url: '/brands' },
  { page: 'Featured categories', url: '/featured' },
  { page: 'Shopping guide', url: '/shopping-guide' },
  { page: 'Blog', url: '/blog' }
]

export const socials = [
  { name: "Twitter", link: '' },
  { name: "Instagram", link: '' },
  { name: "Facebook", link: '' },
  { name: "Facebook", link: '' },
]

export const GA = ''

// export const imageHost = 'https://storage.googleapis.com/vapelab'
export const imageHost = 'https://ik.imagekit.io/sensualspot'

export const siteUrl = `https://${domain}`
// export const siteUrl = 'https://dallyvapes.co.ke'

const dev = process.env.NODE_ENV !== 'production';


export const host = dev ? 'http://localhost:5100' : siteUrl;

