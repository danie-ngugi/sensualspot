import { useContext } from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'


import { WhatsAppIcon} from 'components/icons'
import AddToCartIcon from 'components/icons/AddToCart'
import EyeFillIcon from 'components/icons/EyeFill'

// import CartModal from './CartModal'


import { FavoriteContext } from 'context/FavoriteContext'

import { imageHost } from 'common/data'
import { computePriceRange, makeImageUrl, toCurrency } from 'common/methods'

import { WhatsAppContext } from 'context/WhatsAppContext'
import { CartContext } from 'context/CartContext'
import { business } from '../../common/data'
import { isOnOffer, offerValidate, randomString } from '../../common/methods'
import OfferRibon from '../shared/OfferRibon'
import BestDealRibon from '../shared/BestDealRibbon'


const ProductPreview = ({ product }) => {
    const router = useRouter();

    const { addItemToFavorites, removeFromFavorites, inFavorites } = useContext(FavoriteContext)
    const { setIsOpen, setActiveProduct } = useContext(WhatsAppContext)
    const { setCartDialog, setCartItem } = useContext(CartContext)

    const prices = computePriceRange(product)


    const offerPrice = isOnOffer({ product })
    const mainOffer = offerPrice > 0 &&  prices.length <= 1  ? offerValidate({ price: product?.price ?? 0, offerPrice: product?.offerPrice ?? 0 }) : 0
    const hasOfferbundle = product.offerBundle != null


    const mutateFavorites = () => {
        //  toggle favorites
        if (inFavorites(product)) {
            removeFromFavorites(product)
        } else {
            addItemToFavorites(product)
        }
    }

    const openWhastAppDialog = () => {
        setActiveProduct(product)
        setTimeout(() => {
            setIsOpen(true)
        }, 0);
    }

    const openCartDialog = () => {
        setCartItem(JSON.parse(JSON.stringify(product)))
        setCartDialog(true)
    }

    const abv = product?.abv

    return (
        <li className="flex flex-col bg-white relative rounded-lg shadow-sm select-none">
            { offerPrice > 0 && <OfferRibon />}
            {product.offerBundle && offerPrice < 1 ? <BestDealRibon /> : null }
    
            {abv && abv > 0 ? <span className='absolute top-2 right-2 z-20 text-[10px] text-gray-500 '> {abv}% ABV</span> : null }
    
            <div className="sm:cursor-pointer pointer-events-auto ">
                <Link href={`/product/${product.url}`}>
                    {
                        product?.offerBundle?.image ? 
                         <Image 
                            title={product.name} 
                            loading="lazy" 
                            alt={`${product.name} - ${business.name}`} 
                            width={600}
                            height={600} 
                            src={makeImageUrl(`${product.url}-offer.webp`, '/offers')} className="object-contain rounded-t-lg" />
                        : <Image 
                        loading="lazy" 
                        title={product.name} 
                        alt={`${product.name} - ${business.name}`} 
                        width={600}
                        height={600}
                        src={makeImageUrl(product.mainImage, '/products')} className="object-contain rounded-t-lg" />
                    }
                </Link>
            </div>

           {product.variants.length > 0 ? (<div className="px-2 space-x-1 mt-1 truncate ">
                {product.variants.map((variant) => {
                    return (
                        <i className={`
                           text-gray-500  px-1 border-r border-gray-300  last:border-r-0 
                        `} key={variant?._id ?? randomString()}> {variant.title} </i>
                    )
                })}

                {product?.offerBundle ? (
                    <i className="text-red-500 px-1 border-r border-gray-300  last:border-r-0 "> {product?.offerBundle?.title} </i>
                ) : null }
            </div>) : (
                <div className="h-6">
                    {product?.offerBundle ? (
                        <i className="text-red-500 px-1 border-r border-gray-300  last:border-r-0 "> {product?.offerBundle?.title} </i>
                    ) : null }
                </div>
                )
            }

            <Link title={product.name} href={`/product/${product.url}`} className="truncate  px-1">
                {product.name}
            </Link>


            <div className="py-2 px-1 font-medium">
               { prices.length > 1 ? `${toCurrency(prices[0])} - ${toCurrency(prices[1])}` :
                mainOffer > 0 ? 
                (<span> {toCurrency(mainOffer)} <i className="line-through text-sm text-red-500"> {toCurrency(prices[0])} </i> </span>) 
                : toCurrency(prices[0]) }
            </div>
            
            <div className="flex flex-row justify-around items-center mt-2 mb-1 pb-3 px-1 select-none">
                
                {
                    product.availability ? 
                       ( <> <button onClick={openCartDialog}>
                        <AddToCartIcon />
                  </button>
  
                  <button  onClick={ openWhastAppDialog } className="cursor-pointer text-[#128C7E]">
                      <WhatsAppIcon />
                  </button>
  
             
                  <Link href={`/product/${product.url}`} className=" text-gray-700">
                      <EyeFillIcon />
                  </Link> </>)
                       :
                       <div className="font-bold text-red-500 "> Out of stock </div>
                    
                }

            </div>
        </li>
    );
}

export default ProductPreview
