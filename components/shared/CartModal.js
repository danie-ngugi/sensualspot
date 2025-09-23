
import { useState, useContext, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react'

import { useToasts } from 'react-toast-notifications'

import { StarIcon } from 'components/icons';

import { CartContext } from 'context/CartContext';

import { toCurrency } from 'common/methods';
import { computePriceRange, getAtivePrice, offerValidate, randomString } from '../../common/methods';
import PriceRender from '../products/PriceRender';
import { useVariants } from '../../hooks/useVariants';


const CartDialog = () => {
    const { cartDialog, setCartDialog, cartItem, addToBasket } = useContext(CartContext)

    const { addToast } = useToasts()
    const [ quantity, setQuantity] = useState(1)

    
    
    const product = { ...cartItem } //  JSON.parse(JSON.stringify(_cartItem))
    const { activeImage, activeVariant, activeColor, activePrice, prices, setActiveImage, setVariant, setActiveColor, setActivePrice } = useVariants({ product: product })
    const setActiveVariant = setVariant

    // console.log(cartItem, 'cartItem')
    // const _cartItem = cartItem ?? {}

    // const prices = computePriceRange(product)
    
    // const [activePrice, setActivePrice] = useState(prices[0])
    // // const productLevelOffer = offerValidate({ price: product?.price ?? 0, offerPrice: product?.offerPrice ?? 0 })

    // useEffect(() => {
    //     const productVariants = product?.variants ?? []
       
    //     if (product?.colors) {
    //         setActiveColor(
    //             (product?.colors && product?.colors.length) >= 1 ? product?.colors[0] : null
    //         )
    //     }
    //     const variants = product?.variants ? product.variants : []

    //     if (product?.offerBundle) {
    //         const offer = product.offerBundle
    //         const offerId = product._id + product._url
    //         const id = offer.title.split(' ').join('-')
    //         const exits = variants.find(v => v.variantId === offerId)

    //         // console.log(productVariants)

    //         if (!productVariants.length) {
                
    //             const itemPrice =  product?.price ?? 0
    //             const itemOfferPrice = product?.offerPrice ?? 0
    //             const displayPrice = itemOfferPrice > 0 ? itemOfferPrice : itemPrice
    //             const randomId = randomString()
    //             // console.log(itemPrice, 'itemPrice')
    //             variants.push({
    //                 productId: product._id,
    //                 title: 'Regular price',
    //                 productOptionId: randomId,
    //                 priceEffect: true,
    //                 price: displayPrice,
    //                 salePrice: displayPrice,
    //                 offerPrice: displayPrice,
    //                 discount: 0,
    //                 variantId: randomId,
    //                 _id:randomId,
    //                 id: randomId,
    //             })
    //             setActivePrice({ price: displayPrice })
    //         }

    //         if (!exits) {

    //             const offerPrice = offer.price ?? 0
    //             variants.push({
    //                 productId: product._id,
    //                 title: offer.title,
    //                 productOptionId: offerId,
    //                 priceEffect: true,
    //                 price: offerPrice,
    //                 salePrice: offerPrice,
    //                 offerPrice,
    //                 discount: 0,
    //                 variantId: offerId,
    //                 _id: id,
    //                 id
    
    //             })
    //         }

            

           
            
    //     }

    //     if (product?.variants?.length) {
    //         setActiveVariant(product?.variants[0])
    //     }

        
    // }, [cartItem])

    const resetForm = () => {
       setQuantity(1)
    }
    

    const handleColorChange = (e) => {
        const color = e.target.value;
        setActiveColor(color)
    }


    const addToCart = () => {

        if (!product.availability) {
            addToast("This item is out of stock", {
                appearance: 'error',
                autoDismiss: true,
            })
        }

        const id = activeVariant ? (activeVariant?._id ?? randomString() ) : product._id

        // const mainOffer = offerValidate({ price: product?.price ?? 0, offerPrice: product?.offerPrice ?? 0})
        // const mainPrice =(product?.offerPrice ?? 0) > 0 ? product?.offerPrice :( product.price ?? 0)
        // const variantPrice =  activeVariant && activeVariant?.priceEffect ? (activeVariant?.offerPrice ?? 0 > 0 ? activeVariant?.offerPrice : activeVariant?.price) : mainPrice

        // //   ( product?.offerPrice ?? 0 ) > 0 ? product?.offerPrice : product.price
        // const activePrice =  activeVariant && activeVariant.priceEffect ? variantPrice : (mainOffer > 0 ? mainOffer : mainPrice)
        const activePrice = getAtivePrice({ product, activeVariant })
  

        

        if (!activePrice) return;

        const bundle = product?.offerBundle ? product.offerBundle : null

        const results = addToBasket({ variant: activeVariant, color: activeColor, price: { price: activePrice }, quantity, product, id: id, bundle })
        if (results.state) {
           
         
            addToast(results.msg, {
                appearance: 'success',
                autoDismiss: true,
            })

            closeDialog()
            
                
        } else {
           
            addToast(results.msg, {
                appearance: 'warning',
                autoDismiss: true,
            })
            
            
        }

    }
    
    const closeDialog = () => {
        setCartDialog(false)
    }

    return (
        <Transition.Root show={cartDialog} as={Fragment} afterLeave={() => { resetForm }}>
        <Dialog onClose={setCartDialog} className="fixed inset-0 p-4 pt-[10vh] lg:pt-[15vh] overflow-y-auto z-30">
            <Transition.Child
                enter=" duration-300 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
             <Dialog.Overlay className=" fixed inset-0 bg-gray-400/60"  />
            </Transition.Child>


            <Transition.Child
                enter=" duration-300 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >

               {
                   product && (
                    <div className="max-w-2xl p-4 relative bg-white mx-auto rounded-xl shadow-2xl right-1 ring-black/5 divide-y divide-gray-100 overflow-hidden">
                       <div className="flex flex-col gap-3">


                       {/* {!activeVariant && <div className="mt-3">
                            {activeVariant.length > 1 ? `${toCurrency(prices[0])} - ${toCurrency(prices[1])}` : `${toCurrency(prices[0])}`}
                        </div>} */}

                        <div className="text-xl font-medium text-center">
                            {product.name}
                        </div>


                        {/* {activeVariant && <div className="" render={
                            () => {
                                const { price } = usePrice({ product, variantId: activeVariant._id })
                                //  toCurrency(activeVariant.price)
                                return <span> {toCurrency(price)} ({activeVariant && activeVariant.title}) </span>
                            }
                        }>  </div>} */}

                        {/* {activeVariant && <span> {toCurrency(activeVariant.price)} ({activeVariant && activeVariant.title}) </span> } */}


                        <PriceRender prices={prices} product={product} activeVariant={activeVariant} activePrice={activePrice} />


                        <div className=" flex flex-row">
                            
                            {product && product.variants && product?.variants?.map((variant) => {
                                return (
                                    <div
                                        key={variant?.title ?? randomString()}
                                        onClick={() => setActiveVariant(variant)}
                                        className={` m-1 p-1 rounded-md cursor-pointer 
                                        ${ activeVariant && variant?.title === activeVariant?.title ? 'bg-secondary text-white' : 'border-gray-500 border'}`}>
                                        {variant.title}
                                    </div>
                                )
                            })}
                        </div>
                            
                         { 
                            product?.offerBundle && (
                            <div className="mt-3 flex flex-row border-l-4 border-gray-200 p-1 bg-green-50 font-semibold text-secondary-1 items-center">
                               <span className="mr-3"> <StarIcon /> </span>
                               <span>{product.offerBundle?.title }</span>
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
                            product?.colors?.length >= 1 && (
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

                        <div className="mt-3 ">
                            <b>Availability:</b> {product.availability ? <span className="text-green-600 font-bold">In Stock</span> : <span className="text-red-500 font-bold">Out of Stock</span>}
                        </div>

                        {product?.brand && <div className="mt-2">
                          <b>Brand:</b> {product.brand.name}
                        </div>}

                        {product?.abv > 1 ? (<div><b>ABV:</b> {product?.abv}%  </div>) : null}


                        <div className="flex flex-col">
                                 <label className="my-1 text-gray-700 text-base px-1 cursor-pointer"  htmlFor="quantity">Quantity</label>
                                <input 
                                    autoComplete="off"
                                    type="number"
                                    min={1}
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value) }
                                    className=" ring-1 ring-gray-300 border-1 focus:border-1 focus:outline-none focus:ring-1 h-10 block w-full px-4 sm:text-sm border-gray-300 rounded-md"
                                    id="quantity" placeholder='Quantity' />
                            </div>


                       </div>

                       <div className="flex flex-row justify-end mt-8 gap-4">

                            <div
                                onClick={closeDialog}
                                className="px-4 py-2 mt-3 rounded-lg bg-gray-700 text-white cursor-pointer"
                            >Cancel</div>

                            <div
                                onClick={addToCart}
                                
                                className={`px-4 py-2 mt-3 rounded-lg ${product.availability ? 'bg-primary-1' : 'bg-gray-300 cursor-not-allowed'} text-white cursor-pointer`}
                            >Add to Cart</div>
                            
                        </div>
                    </div>
                   )
               } 
                
            </Transition.Child>
        </Dialog>
        </Transition.Root>
    )
}

export default CartDialog