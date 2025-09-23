import { useState, useEffect } from 'react'
import { computePriceRange } from '../common/methods'

export const useVariants = ({ product }) => {

    if (!product) {
        return {
            activeImage: null,
            activeVariant: null,
            activeColor: null,
            prices: null,
            activePrice: null,
            setActiveImage: () => {},
            setVariant: () => {},
            setActiveColor: () => {},
            setActivePric: () => {}
        }
    }

    const [ activeImage, setActiveImage ] = useState("")
    const _color = (product.colors && product.colors.length) >= 1 ? product.colors[0].name : null
    const prices = computePriceRange(product)
    
    const [ activeVariant, setVariant ] = useState(null)
    const [activeColor, setActiveColor] = useState(_color)
    const [activePrice, setActivePrice] = useState({ price: prices[0]})

    useEffect(() => {
        const mainImg = product.offerBundle && product.offerBundle.image ? `${product.url}-offer.webp` : product.mainImage
        setActiveImage(mainImg)
        //  setQuantity(1)
        
        setActiveColor(
            (product.colors && product.colors.length) >= 1 ? product.colors[0] : null
        )

        const variants = product?.variants || [];

        if (product?.offerBundle) {

            if (!variants.length) {
                const itemPrice = product.price ?? 0
                const itemOfferPrice = product.offerPrice ?? 0
                
                variants.push({
                    productId: product._id,
                    title: 'Regular price',
                    productOptionId: product._id,
                    priceEffect: true,
                    price: itemPrice,
                    salePrice: itemPrice,
                    offerPrice: itemOfferPrice,
                    discount: 0,
                    variantId: product._id,
                    _id: product._id,
                    id: product._id,
                })
            }

            const offer = product.offerBundle
            const offerId = product._id + product._url
            const id = offer.title.split(' ').join('-')
            const offerOption = {
                productId: product._id,
                title: offer.title,
                productOptionId: offerId,
                priceEffect: !!offer?.price,
                price: offer?.price || 0,
                salePrice: offer?.price || 0,
                offerPrice: offer?.price || 0,
                discount: 0,
                variantId: offerId,
                _id: id,
                id

            };
            //  console.log(offerOption, product.offerBundle, 'ob')
            const exits = variants.find(v => v.variantId === offerId)
            if (!exits) {
                variants.push(offerOption)
            }
        }

        if (product?.variants?.length) {
            setVariant(product.variants[0])

            if (product.variants[0].priceEffect) {
                setActivePrice({ price: product.variants[0].price})
            } else {
                setActivePrice({ price: product.price });
            }
            
        } else {
            setVariant(null)
            setActivePrice({ price: product.price })
        }
    },[product.url])


    return { activeImage, activeVariant, activeColor, prices, activePrice, setActiveImage, setVariant, setActiveColor, setActivePrice }

}

// export default useVariants