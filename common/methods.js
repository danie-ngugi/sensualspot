import { imageHost } from "./data"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]

export const toCurrency = (number) => {
    if (typeof(number) !== 'number') return 'KES 0'
    return 'KES ' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const formatCurrency = (num) => {
  if (typeof(num) !== 'number') return 'Kes 0'

  const f = new Intl.NumberFormat('en-us', { currency: 'KES', style: 'currency' })
  return f.format(num)
}

export const computePriceRange = (item) => {

  if (!item) {
    return [0]
  }

  if (!item.variants) {
    return [item.price]
  }

    const compare = ( a, b ) => {
        if ( a.price < b.price ){
          return -1;
        }
        if ( a.price > b.price ){
          return 1;
        }
        return 0;
    }

  const variants = item.variants.filter((v) => {
    return v.priceEffect
  })

  if (variants.length === 0) {
    return [item.price]
  }

  if (variants.length === 1) {
    return [variants[0].price]
  }

  if (variants.length > 1) {
   const sorted = variants.sort(compare)
   return [ sorted[0].price, sorted[sorted.length -1].price]
  }
}
export function offerValidate ({ price, offerPrice }) {

  // price = 3000 & offerPrice = 2500 :: offer= 500
  const offer = price - offerPrice

  if (offerPrice > 0 && offer > 1) {
    return offerPrice
  }
  return 0
}

export const isOnOffer = ({ product }) => {

  const price = product?.price ?? 0
  const offerPrice = product?.offerPrice ?? 0

  
  const offer = offerValidate({ price, offerPrice })

  if (offer > 1) {
    return offer
  }

  const variants = product.variants

  const offers = variants.map((variant) => {
    return offerValidate({ price: variant?.price ?? 0, offerPrice: variant?.offerPrice ?? 0})
  })

  const max = Math.max(...offers)
  if (max > 0) {
    return max
  }
  return 0
}

export const renderText = (content) => {
  if (!content) return null
  return <div className="prose w-full max-w-screen-xl mx-auto" dangerouslySetInnerHTML={{ __html: content }}/>
}

export const validateEmail = (email) => {
  if (!email) return false;
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const formatDate = (_date, short = false) => {
  if (!_date) {
    return ''
  }

  const date = new Date(_date) || new Date();


  const month = date.getMonth()
  const dt = date.getDate();
  const year = date.getFullYear()
  const shortYear = date.getYear() - 100




  return short ? `${months[month]} ${shortYear}` : `${dt} ${months[month]}, ${year}`
}


export const monthNDate = (_date) => {
  if (!_date) {
    return ''
  }

  const date = new Date(_date) || new Date();


  const month = date.getMonth()
  const dt = date.getDate();

  return  `${months[month]} ${dt}`
}

export const randomString = () => {
  return (Math.random() + 1).toString(36).substring(7);
}


export function computeAverageRating  (reviews)  {
  if (!reviews || reviews.length === 0) {
    return { rating: 0, reviewCount: 0 }
  }
  const count = reviews.length || 0
  let total = 0
  reviews.forEach((rev) => {
    total = total + rev.rating
  })
  const av = Math.round(total / count * 100) / 100 || 0

  return { rating: av, reviewCount: count }
}

export function getAtivePrice ({ product, activeVariant }) {
  const mainOffer = offerValidate({ price: product?.price ?? 0, offerPrice: product?.offerPrice ?? 0})
  const mainPrice =(product?.offerPrice ?? 0) > 0 ? product?.offerPrice :( product.price ?? 0)
  const variantPrice =  activeVariant && activeVariant?.priceEffect ? (activeVariant?.offerPrice ?? 0 > 0 ? activeVariant?.offerPrice : activeVariant?.price) : mainPrice

  //   ( product?.offerPrice ?? 0 ) > 0 ? product?.offerPrice : product.price
  const activePrice =  activeVariant && activeVariant.priceEffect ? variantPrice : (mainOffer > 0 ? mainOffer : mainPrice)

  return activePrice
}

export const makeImageUrl = (imageUrl, prefix) =>
	imageUrl?.includes("cloudinary")
		? imageUrl
		: `${imageHost}${prefix}/${imageUrl}`;


  // new
  export const getVariantPrice = (
    variant,
    product
  ) => {
    if (!variant && product) {
      return product.offerPrice || product.price || 0;
    }
  
    const variantPrice = variant?.offerPrice || variant?.price || 0;
  
    if (variantPrice) {
      return variantPrice;
    }
    if (!product) {
      return 0;
    }
    return product.offerPrice || product.price || 0;
  };