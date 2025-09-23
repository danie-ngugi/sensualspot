//  import products from 'common/products'
import { useState, useEffect, useContext } from 'react'

import { useRouter } from 'next/router'

import { useToasts } from 'react-toast-notifications'

import { connectToDatabase } from 'util/db'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { imageHost, siteUrl, business } from 'common/data'
import { renderText, computePriceRange, toCurrency, makeImageUrl } from 'common/methods'

import { CartContext } from 'context/CartContext'
import { FavoriteContext } from 'context/FavoriteContext'
import { WhatsAppContext } from 'context/WhatsAppContext'

import YoutubeVideo from 'components/shared/YoutubeVideo'
import ProductDescriptionTable from 'components/products/ProductDescriptionTable'
import ProductCarousel from 'components/products/ProductCarousel'
import ProductPreviewList from 'components/products/ProductPreviewList'
//  import PageHeader from 'components/shared/PageHeader'

import { HeartFilledIcon, HeartOutline, ShareIcon, WhatsAppIcon, StarIcon } from 'components/icons'
//  import products from 'pages/api/products'
import OfferBanner from 'components/shared/OfferBanner'
import { computeAverageRating, getAtivePrice, offerValidate, randomString } from '../../common/methods'
// import OfferRibon from '../../components/shared/OfferRibon'
import PriceRender from '../../components/products/PriceRender'
import ProductReviews from '../../components/products/ProductReviews'
import { ObjectId } from '../../util/db'
import { useVariants } from '../../hooks/useVariants'

const ProductPage = ({ product, category, subcategory, newArrivals, relatedProducts, reviews, averageRating }) => {
    const router = useRouter()
    const { addToBasket, basket } = useContext(CartContext)
    const { addItemToFavorites, removeFromFavorites, inFavorites } = useContext(FavoriteContext)
    const { setIsOpen, setActiveProduct } = useContext(WhatsAppContext)

    const [quantity, setQuantity] = useState(1)
    const canShare =  !!(typeof navigator !== 'undefined' && navigator?.share)

     const { addToast } = useToasts()
    
    
    
    const { activeImage, activeVariant, activeColor, activePrice, setActiveImage, setVariant, setActiveColor, setActivePrice } = useVariants({ product: product })
    const prices = computePriceRange(product)



    const handleColorChange = (e) => {
        const color = e.target.value;
        setActiveColor(color)
    }

    const handleQuantityChange = (e) => {
        const value = Number(e.target.value)|| 1
        setQuantity(value)
    }

    const updatePrice = (variant) => {
        if (variant.priceEffect) {
           setActivePrice({ price: variant.price })
        } else {
            setActivePrice({ price: product.price })
        }
        setVariant(variant)
    }

    const addToCart = (doCheckout) => {

        if (!product.availability) {
            addToast('Item out of stock', {
                appearance: 'error',
                autoDismiss: true,
            })
            return;
        }
        const id = activeVariant ? activeVariant?._id : product._id

        const bundle = product?.offerBundle ? product.offerBundle : null

        const offerPrice = activeVariant?.offerPrice ?? 0


        const _activePrice = getAtivePrice({ product, activeVariant })

        const results = addToBasket({ variant: activeVariant, color: activeColor, price: { price: _activePrice }, quantity, product, id: id, bundle })

        if (!product.availability) {
            addToast('Product out of stock', {
                appearance: 'error',
                autoDismiss: true,
            })
            return;
        }
        if (results.state) {
            if (doCheckout) {
                router.push('/checkout');
            } else {
                addToast(results.msg, {
                    appearance: 'success',
                    autoDismiss: true,
                })
            }
                
        } else {
            if (doCheckout) {
                router.push('/checkout');
            } else {
                addToast(results.msg, {
                    appearance: 'warning',
                    autoDismiss: true,
                })
            }
        }
    }

    const shareLink = async () => {
        try {
          const shareData = {
            title: `${product.name}`,
            text: `${product.name}`,
            url: `${siteUrl}/product/${product.url}`
          }
          await navigator?.share(shareData)
        } catch (err) {
          console.log('Share failed')
        }
    }

    const mutateFavorites = () => {
        // add to favorites
        if (inFavorites(product)) {
            removeFromFavorites(product)
        } else {
            addItemToFavorites(product)
        }
    }

    const whatsAppMessage = () => {
        // const msg = `Hello, i'm interested in ${product.name} ${siteUrl}/product/${product.url}`
        // const url = `https://api.whatsapp.com/send?phone=${business.whatsAppPhone}&text=${msg}`
    
        // const win = window.open(url, '_blank')
        // win.focus()
        setActiveProduct(product)
        setTimeout(() => {
            setIsOpen(true)
        }, 0);
      }

    //  console.log('incoming product is', product)
    const sortFeatures = (a, b) => {
        const categoryA = a.category?.toLowerCase() === 'main camera' || a.category?.toLowerCase() === 'selfie camera' ? 'Camera' : a.category;
        const categoryB = b.category?.toLowerCase() === 'main camera' || b.category?.toLowerCase() === 'selfie camera' ? 'Camera' : b.category;
        if(categoryA < categoryB) { return -1; }
        if(categoryA > categoryB) { return 1; }
        return 0;
    }
    
    const computedOfferImage = () => {
        return product.offerBundle && product.offerBundle.image ? [makeImageUrl(`${product.url}-offer.webp`, '/offers')] : []
    }

    const brandSchema = product && product?.brand ? `
    "brand": {
      "@type": "Brand",
      "name": "${product?.brand?.name}"
    },` : ''

    const plainContent = product?.description ? product?.description.replace(/<[^>]*>/g, '') : ''

    const aggregateRatingString = reviews && reviews?.length >= 1 ? `"aggregateRating": {
       "@type": "AggregateRating",
       "ratingValue": "${averageRating.rating}",
       "reviewCount": "${averageRating.reviewCount}"
       },` : ''
    
    const primaryReview = reviews?.length ? `"review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "${reviews[0].rating}",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "${reviews[0].name}"
        }
      },` : ''


   

    return product ? (<div className=" xl:max-w-5xl mx-auto px-2 sm:pt-8 mb-5">
        <Head>
            <title>{product.metaTitle}</title>
            <meta name="description" content={`${product.metaDescription}`} />
            <meta name='og:title' content={product.metaTitle} key="og:title" />
            <meta name='og:type' content="website" key="og:type" />
            <meta property="og:url" name='og:url' content={`${siteUrl}/product/${product.url}`} key="og:title" />
            <meta property="og:image" content={`${imageHost}/products/${product.mainImage}`} />
            
            <meta name="twitter:image" content={`${imageHost}/products/${product.mainImage}`} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@dallyvapes" />
            <meta name="twitter:site" content={siteUrl} />
            <meta name="twitter:title" content={product.name} />
            <meta name="twitter:description" content={product.metaDescription} />


            <script type='application/ld+json' dangerouslySetInnerHTML={
          {
            __html: `
            {
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": "${product.name}",
              "image": [
                "${makeImageUrl(product.mainImage, '/products')}"
              ],
              "url": "${siteUrl}/product/${product.url}",
              "description": "${plainContent}",
              "sku": "${product.url}",
              "mpn": "${product.url}",
              ${brandSchema}
             ${aggregateRatingString}
             ${primaryReview}
              "offers": {
                "@type": "Offer",
                "priceCurrency": "Kes",
                "price": "${prices[0]}",
                "priceValidUntil": "2024-11-01",
                "availability": "${product?.availability ? 'http://schema.org/InStock' : 'http://schema.org/OutOfStock'}",
                "url": "${siteUrl}/product/${product.url}",
                "seller": {
                  "@type": "Organization",
                  "name": "${business.name}"
                }
              }
            }
          `
          }
        } />

           
        </Head>

        {category && category.url && <p className="text-xs mx-2 mt-6">
            <Link href={`/${category.url}`}>
                {category && category.name}
            </Link>
            {subcategory && ' > '}
            {subcategory &&
                <Link href={`/${category.url}/${subcategory.url}`}>
                    {subcategory && subcategory.name}
                </Link>
            }
            </p>}

        <div className="mx-auto mb-4 space-x-reverse grid grid-cols-1  gap-2 mt-3">

            <div className="col-span-1 lg:col-span-3 order-1 lg:order-2 bg-white p-0 rounded-md flex flex-col gap-3 lg:flex-row">
                
              
                <div className="lg:w-2/5 p-2 overflow-hidden max-w-prose">
                    <ProductCarousel hasThumbs={product.hasThumbs} productName={product?.name} images={[
                        ...computedOfferImage(),
                        `${makeImageUrl(product.mainImage, '/products')}`,
                        ...product.images.map((i) => makeImageUrl(i, '/products'))
                    ]} />
                </div>
                
                
                <div className="flex flex-col flex-grow p-2 sm:w-3/5 ">
                   <h1 className="font-semibold text-2xl primary-text sm:mt-1 mt-3 first-letter:uppercase "> {product.name} </h1>

                  
                    <PriceRender prices={prices} product={product} activeVariant={activeVariant} activePrice={activePrice} />


                    <div className="mt-3 flex flex-row">
                        
                        {product && product.variants && product?.variants?.map((variant) => {
                            return (
                                <div
                                    key={variant.title}
                                    onClick={() => updatePrice(variant)}
                                    className={` m-1 p-1 rounded-md cursor-pointer 
                                    ${ activeVariant && variant.title === activeVariant.title ? 'bg-secondary text-white' : 'border-gray-500 border'}`}>
                                    {variant.title}
                                </div>
                            )
                        })}
                    </div>
                        
                     { 
                        product?.offerBundle && (
                        <div className="mt-3 flex flex-row border-l-4 border-gray-200 p-1 bg-green-50 font-semibold text-secondary-1 items-center">
                           <span className="mr-3 inline-block"> <StarIcon style={{ width: '18px', height: '18px' }} /> </span>
                           <span className="inline-block">{product.offerBundle?.title }</span>
                        </div>
                        )
                    }

                    {product?.flavors?.length >= 1 && <div className="mt-2 mb-1 flex flex-row flex-wrap">
                        <label className="block text-left w-full">
                            <span className="text-gray-700">Select flavor</span>
                            <select className="form-select simple-input block w-full mt-1">
                                {product.flavors.map((flavor) => {
                                    return (<option value={flavor} key={flavor}> { flavor} </option>)
                                })}
                               
                            </select>
                        </label>
                    </div>}

                    {
                        product?.colors && product?.colors?.length >= 1 && (
                            <div className="mt-4 mb-2 flex flex-row flex-wrap">
                        { product?.colors?.length >= 1 && product.colors.map((color) => {
                            // console.log(color, 'is color')
                            return (
                                <label key={color} className="inline-flex items-center my-1.5 mx-2.5">
                                    <input type="radio" onChange={handleColorChange} className="form-radio" name="color" value={color} checked={color === activeColor} />
                                    <span className="ml-2"> { color } </span>
                                </label>
                           
                            )
                        })}
                    </div>
                        )
                    }

                    <div className="mt-3">
                        <b>Availability:</b> {product.availability ? <span>In Stock</span> : <span>Out of Stock</span>}
                    </div>
                    {product.brand && <div className="mt-2">
                      <b>Brand:</b> {product.brand.name}
                    </div>}

                    {product?.abv > 1 ? (<div><b>ABV:</b> {product.abv}%  </div>) : null}

                    <div className="mt-3 mb-3 flex flex-row select-none">

                        <div className="sm:w-full w-28">
                            <input
                            className="simple-input"
                            type="number"
                            min={1}
                            onChange={handleQuantityChange}
                            value={quantity}
                            placeholder="Quantity"/>                                                  
                        </div>

                    </div>

                    <div className="mt-5 flex-wrap gap-3 flex select-none items-center flex-row-reverse justify-around noselect ">
                        <div
                          onClick={ () => addToCart(true)} 
                          className=" bg-primary-1 text-white  text-center px-8 py-3 cursor-pointer rounded-md">
                            Buy Now
                        </div>

                        <div
                          onClick={ () => addToCart(false)} 
                          className=" bg-gray-900 text-white px-8 py-3 cursor-pointer rounded-md">
                            Add to basket 
                        </div>

                        {/* <div>
                            <div onClick={() => whatsAppMessage()} className="
                                flex flex-row items-center gap-2 justify-around text-lg
                                rounded-lg py-2 px-3
                                pointer bg-green-500 text-white">
                                <span  className="">
                                    <WhatsAppIcon />
                                </span>

                                <span> Order via whatsapp </span>

                            </div>
                            
                        </div> */}

                        <div>


                        <div onClick={mutateFavorites} className={`

                                flex flex-row items-center gap-2 justify-around 
                                rounded-lg px-8 py-3 outline outline-1
                                pointer pointer ${inFavorites(product) ? 'bg-secondary-1 text-white' : 'text-secondary-1'} 
                        
                            `}>
                                     <span  className="">
                                    {inFavorites(product) ? <HeartFilledIcon /> : <HeartOutline /> }
                                </span>
                                <span>Favorites</span>
                        </div>
                            
                              
                               
                        </div>
                        
                        {/* {canShare && <div>
                            
                            <span className="pointer p-1" onClick={shareLink}> 
                                <ShareIcon /> </span>
                            
                        </div>} */}
                    </div>
                </div>
            </div>

          
        </div>

       {product?.features && product?.features?.length > 0 && (<div className=" mt-3 bg-white mb-4 p-2">
            <div className="mt-2 p-2">
                <h3 className="font-semibold text-2xl secondary-text mb-3">Product features</h3>
                { product.features.sort(sortFeatures).map((feature) => {
                    return <div className="my-2" key={feature._id}> <b> {feature.title}: </b> {feature.value} </div>
                })}
                <b>Condition: </b> {product.condition}
            </div>

        </div>)}

        {product.description && <div className="mt-3 bg-white mb-4 p-2">
            <h3 className="font-semibold text-2xl secondary-text mb-3">Product description</h3>
            {renderText(product.description)}
        </div>}

        <div className="mt-3 bg-white mb-4">
            <ProductDescriptionTable product={product} />
        </div>
        <div className="mb-5">
            { product.video && <YoutubeVideo video={product.video} /> }
        </div>
        
        {/* Product reviews section */}
        <div>
            { reviews?.length > 0 ? <ProductReviews reviews={reviews} product={product} averageRating={averageRating} /> : null }

        </div>

        {relatedProducts && relatedProducts?.length > 0 && <div className="">
            <div className="bg-white mb-4 mt-12 px-4 py-4 rounded-sm text-2xl font-semibold text-primary-1"> Related products </div>
            <ProductPreviewList sm={4} products={relatedProducts} />
        </div>}
        <OfferBanner />
    </div>) : <div className="container px-3 mb-5">
        Product not found
    </div>;
}


export async function getStaticPaths() {

    const { db } = await connectToDatabase()
    const products = await db
      .collection('products')
      .find({})
      .toArray()
      //  console.log(products)
      // JSON.parse(JSON.stringify(products))
      const paths = products.map((p) => ({ params: { url : p.url } }))
      return {
          paths,
          fallback: false
      }
}
  
  export async function getStaticProps(context) {
    const url = context.params.url;
    const { db } = await connectToDatabase()
    const _products = await db.collection('products').aggregate(
            [
                { $match: { url } },
                {
                    $lookup: {
                        from: "brands",
                        localField: "brandId",    // field in the orders collection
                        foreignField: "_id",  // field in the items collection
                        as: "brand"
                     },
                     
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "categoryId",    // field in the orders collection
                        foreignField: "_id",  // field in the items collection
                        as: "category"
                     }
                },
                {
                    $lookup: {
                        from: "subcategories",
                        localField: "subcategoryId",    // field in the orders collection
                        foreignField: "_id",  // field in the items collection
                        as: "subcategory"
                     }
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "linkedProducts.id",    // field in the orders collection
                        foreignField: "_id",  // field in the items collection
                        as: "linkedProducts"
                     }
                }
    
            ]
        ).toArray()

   

    const linkedProducts = _products[0].linkedProducts;
    const subs = _products[0]?.subcategories ? _products[0]?.subcategories : []
    let _relatedProducts = await db
        .collection('products')
        .find({ 
            availability: true, 
            _id: { $ne: _products[0]._id }, 
            categoryId: _products[0].categoryId, 
            subcategories: { $in: [ ...subs ] } 
        })
        .limit(4 - (linkedProducts <= 4 ? linkedProducts?.length : 4))
        .toArray()

    if (_relatedProducts?.length < 1) {
        _relatedProducts = await db
        .collection('products')
        .find({ 
            availability: true, 
            _id: { $ne: _products[0]._id }, 
            categoryId: _products[0].categoryId, 
            // subcategories: { $in: _products[0].subcategories } 
        })
        .limit(4 - (linkedProducts <= 4 ? linkedProducts?.length : 4))
        .toArray()
    }
    
    const relatedProducts = [ ..._products[0].linkedProducts, ..._relatedProducts].map((p) => JSON.parse(JSON.stringify(p)))
  
      const _pd = JSON.parse(JSON.stringify(_products[0]))
    //   console.log("_pd", _pd)


    const reviews = await db.collection('reviews').find({ productId: ObjectId(_pd?._id) }).toArray()

    const averageRating = computeAverageRating(reviews)

    const _newArrivals = await db
          .collection('products')
          .find({ newArrival: true })
          .toArray()
  
      const newArrivals = JSON.parse(JSON.stringify(_newArrivals))

      const tempBrand = _pd.brand?.length >= 1 ?  _pd.brand[0] : null;


         const metaTitle = _pd ? ` ${_pd.name} - Buy ${_pd.name} online in  Kenya - Vape Shop Nairobi` : ''
      const metaDescription = _pd ? `Buy ${_pd.name} online in Nairobi at the best prices. We offer free home or office delivery within the hour` : ''
      
      return { props: {
          product: { ..._pd, brand: tempBrand,  metaTitle, metaDescription },
          category: _pd.categoryId && _pd.category?.length ? _pd.category[0] : null,
          subcategory: _pd.subcategoryId && _pd.subcategory?.length >= 1 ? _pd.subcategory[0] : null,
          relatedProducts,
          newArrivals,
          reviews: JSON.parse(JSON.stringify(reviews)),
          averageRating
        } }
  }
  

export default ProductPage