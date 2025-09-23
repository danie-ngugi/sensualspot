import { toCurrency } from 'common/methods'
import { useState, useEffect } from 'react'

import { useToasts } from 'react-toast-notifications'

const OrderPreview = ({ product, setOptions }) => {
    const { addToast } = useToasts()

    const _color = (product?.colors && product?.colors.length) >= 1 ? product?.colors[0].name : null


    const [activeVariant, setActiveVariant] = useState(null)
    const [ quantity, setQuantity] = useState(1)
    const [activeColor, setActiveColor] = useState(_color)
    const [activePrice, setActivePrice] = useState(0)

    useEffect(() => {
        let _variant = null;
        let _color = null;
        let _price = 0;

        _variant = product?.variants?.length >= 1 ? product.variants[0] : null
        setActiveVariant(_variant)
        if (product?.colors) {
            _color = (product?.colors && product?.colors.length) >= 1 ? product?.colors[0] : null
            setActiveColor(
                _color
            )
        }
        const variants = product?.variants || []

        if (product?.offerBundle) {
            const offer = product.offerBundle
            const offerId = product._id + product._url
            const exits = variants.find(v => v.variantId === offerId)
            if (!exits) {
                variants.push({
                    productId: product._id,
                    title: offer.title,
                    productOptionId: offerId,
                    priceEffect: !!offer?.price,
                    price: offer?.price || 0,
                    salePrice: offer?.price || 0,
                    discount: 0,
                    variantId: offerId
    
                })
            }
            
        }


        if (product.variants.length) {
            //  setVariant(product.variants[0])

            // if (product?.offerBundle && product?.offerBundle?.price) {
            //     return setActivePrice({price: product.offerBundle.price})
            // }

            if (product.variants[0].priceEffect) {
                _price = { price: product.variants[0].price }
                setActivePrice(_price)
            } else {
                _price = { price: product.price }
                setActivePrice(_price);
            }
            
        } else {
            setActiveVariant(null)
            // if (product?.offerBundle && product?.offerBundle?.price) {
            //     return setActivePrice({price: product.offerBundle.price})
            // }
            _price = { price: product?.price }
            setActivePrice(_price)
        }

       setTimeout(() => { 
        setOptions({variant: _variant, quantity, color: _color, price: _price.price })
        }, 300)
        
    }, [product])


    const selectOption = () => {

        if (!product.availability) {
            addToast("This item is out of stock", {
                appearance: 'error',
                autoDismiss: true,
            })
        }


        const id = activeVariant ? activeVariant._id : product._id

        const activePrice =  activeVariant && activeVariant.priceEffect ? activeVariant.price : product.price

        if (!activePrice) return;

        const bundle = product?.offerBundle ? product.offerBundle : null

    }


    return (
        <div className="flex flex-col bg-white rounded-lg p-4">

            <div className="flex flex-col">

                <div className=" flex flex-row">
                    {product && product.variants.length > 1 && product?.variants?.map((variant) => {
                        return (
                            <div
                                key={variant.title}
                                onClick={() => {
                                    setActiveVariant(variant)
                                    if (variant.priceEffect) {
                                        setActivePrice({ price: variant.price })
                                    }
                                }}
                                className={` m-1 p-1 rounded-md cursor-pointer 
                                ${ activeVariant && variant?.title === activeVariant?.title ? 'bg-secondary text-white' : 'border-gray-500 border'}`}>
                                {variant.title}
                            </div>
                        )
                    })}
                </div>

                {product?.flavors?.length >= 1 && <div className="mt-2 mb-1 flex flex-row flex-wrap">
                        <label className="block text-left w-full">
                            <span className="text-gray-700">Select flavor</span>
                            <select className="form-select simple-input block w-full mt-1">
                                {product.flavors.map((flavor) => {
                                    return (<option value={flavor} key={flavor}> { flavor} </option>)
                                })}
                                
                            </select>
                        </label>
                    </div>
                }

                {
                    product?.colors.length >= 1 && (
                        <div className="mt-4 mb-2 flex flex-row flex-wrap">
                            { product?.colors.length >= 1 && product.colors.map((color) => {
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

            </div>

            <div className="flex flex-row justify-between">
                <div className=" font-semibold flex-1 "> Product </div>
                <div className=" font-semibold flex-1"> Subtotal </div>
            </div>
            <div className="flex flex-row gap-2 my-2 border-b border-dashed bottom-1  ">
                <div className="flex-1 text-sm"> {product.name}  × {quantity}	 </div>
                <div className="flex-1"> { toCurrency(activePrice.price)} </div>
            </div>

           

            <div className="flex flex-row gap-2 my-2 border-b border-dashed bottom-1  ">
                <div className="flex-1 text-sm"> Shipping	 </div>
                <div className="flex-1"> Free delivery </div>
            </div>

            <div className="flex flex-row gap-2 my-2 border-b border-dashed bottom-1  ">
                <div className="flex-1 text-sm">  Subtotal	 </div>
                <div className="flex-1"> { toCurrency(activePrice.price)} </div>
            </div>

            <div className="flex flex-row gap-2 my-2 border-b border-dashed bottom-1 font-bold  ">
                <div className="flex-1 text-sm"> Total	 </div>
                <div className="flex-1"> { toCurrency(activePrice.price)} </div>
            </div>

            <div className="mt-14 p-6 bg-slate-50 rounded-md text-center">
               <b> Payment mode:</b> Cash or M-Pesa on delivery
            </div>
        </div>
    )
}

export default OrderPreview
