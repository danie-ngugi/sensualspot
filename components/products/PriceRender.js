import { useEffect } from "react"
import { offerValidate, toCurrency } from "../../common/methods"

const PriceRender = ({ product, prices, activeVariant, activePrice }) => {
    useEffect(()=> {}, [activeVariant])

    const variantNormalPrice = (activeVariant?.price ?? 0)
    const variantOfferPrice = (activeVariant?.offerPrice ?? 0)

    const variantPrice = variantOfferPrice > 0 ? variantOfferPrice : variantNormalPrice

    const productPrice = (product?.offerPrice ?? 0) > 0 ? product?.offerPrice : product.price

    const priceEffect = activeVariant?.priceEffect ?? false


    const mainOffer = offerValidate({ price: product?.price ?? 0, offerPrice: product?.offerPrice ?? 0 })


    const displayPrice = variantPrice < 1 ? productPrice : variantPrice

    return (
        <>

            {!activeVariant && <div className="mt-3">
                                {prices.length > 1 ? `${toCurrency(prices[0])} - ${toCurrency(prices[1])}` : 
                                <span>
                                    {mainOffer > 0 ?
                                <span> {toCurrency(product.offerPrice)} <i className="text-red-500 text-sm"> <s> {product.price} </s> </i> </span>
                                    :   toCurrency(prices[0])} 
                                
                                </span>
                                }
                            </div>
            }


            {activeVariant && ( <div className="mt-3"> 
                { (priceEffect ? offerValidate({ price: activeVariant?.price ?? 0, offerPrice: activeVariant?.offerPrice ?? 0 }) : mainOffer) > 0 ?
                <span> {toCurrency(variantPrice > 0 ? variantPrice : mainOffer)} <i className="text-red-500 text-sm mr-px"> <s> { priceEffect === true ? variantPrice : product?.price } </s></i> </span> : 
                toCurrency( displayPrice ?? (activePrice?.price ?? productPrice))}  ({activeVariant && activeVariant.title}) 
                </div>)
            }

        
        </>
        )
    }

export default PriceRender