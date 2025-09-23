import { offerValidate } from "../../common/methods"



export const usePrice = ({ product, variantId }) => {
    const mainOffer =  offerValidate({ price: product?.price ?? 0, offerPrice: product?.offerPrice ?? 0 })

    if (variantId) {
        const variant = variants.find((v) => v._id === variantId)

        const price = variant.price

        if (price < 1) {
            if (mainOffer > 0) {
                return offer
            } else {
                return  product.price 
            }
        }

        const offerPrice = offerValidate({ price: variant?.price ?? 0, offerPrice: variant?.offerPrice ?? 0  })


        if (offerPrice > 0) {
            return offerPrice 
        }

        return  price 
    }

    if (mainOffer > 0) {
        return offer
    }

    return  product?.price ?? 0
}


