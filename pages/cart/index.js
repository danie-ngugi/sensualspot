import { useState, useEffect, useContext } from 'react'

import Link from 'next/link'
import Head from 'next/head'

import { CartContext } from '../../context/CartContext'
import { DiscountContext } from 'context/DiscountContext'

import {TrashIcon} from 'components/icons'

import { imageHost, siteUrl } from 'common/data'
import { toCurrency } from 'common/methods'

import NoSsr from 'components/shared/NoSsr'

import { useToasts } from 'react-toast-notifications'

import { LoaderIcon } from 'components/icons'
import { ChevronRightIcon } from 'components/icons/ChevronRightIcon'

import ProgressPannel from 'components/checkout/ProgressPannel'

import { business } from '../../common/data'

const Cart = () => {
    const { basket, changeItemQuantity, removeItemFromBasket } = useContext(CartContext)
    const {discount, setDiscount, removeDiscountCode } = useContext(DiscountContext)

    const [discountCode, setDiscountCode] = useState('')
    const [discountError, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [discountValue, setDiscountValue] = useState(0)
    const [bundleDiscount, setBundleDiscount] = useState(0)

    useEffect(() => {
        if (discount) {
            applyCode()
        }
    }, [ basket ])

    // console.log(basket)


    const { addToast } = useToasts()

    const handleQtyChange = (e, id) => {
        const value = e.target.value
        changeItemQuantity({id, quantity: Number(value)})
    }

    const handleRemoveItem = (id) => {
        removeItemFromBasket(id)
    }

    const computeTotal = () => {
        let total = 0
        const bundleDisc = coputedBundleDiscount()
        //  console.log(bundleDisc)
        return basket.map((item) => item.quantity * item.price.price).reduce((a, b) => a + b, 0)

        //  return toCurrency(total)
    }

    const totalAfterDiscount = () => {
       //   let total = 0
        const total = basket.map((item) => item.quantity * item.price.price).reduce((a, b) => a + b, 0)
        return total - discountValue;

        //  return toCurrency(total)
    }

    const applyCode = async () => {
        try {
            const cartTotal = computeTotal()

            const code = discountCode || discount?.code

            if (!code) {
                throw new Error('Discount code is required')
            }
        
            setLoading(true)
            const response = await fetch(`/api/discount/${code}`)

            const data = await response.json()

            if (!data.state) {
               throw(new Error('System error: Try again'))
            }

            if (!data.code) {
                const err= 'Invalid discount code'
                setError(err)
                throw(new Error(err))
            }

            if (data.isExpired) {
                const err = 'Discount code is expired'
                setError(err)
                throw(new Error(err))
            }
            const discountItem = data.code;

            if (cartTotal < discountItem.min ) {
                setError(`To apply this discount code, cart total needs to be above ${toCurrency(discountItem.min)}`)
                throw(new Error(`Minmum order ${discountItem.min}`))
            }
            // set error to null
            setError('')
            setDiscount(discountItem)


            //  const discountItem = data.code;

            if (discountItem.percentage) {
                // compute discount value
                

                const value = Math.floor((cartTotal / 100) * discountItem.value);
                setDiscountValue(value)
            } else {
                const value = discountItem.value
                setDiscountValue(value)
               
            }

        } catch (err) {
            addToast(err.message, {
                appearance: 'error',
                autoDismiss: true,
            })
        } finally {
            setLoading(false)
        }
    }

    const computeLineTotal = ({activePrice, quantity, bundle}) => {
        return activePrice * quantity
    }

    const coputedBundleDiscount = () => {
        return basket.reduce((p, itm) => {
            const { bundle, quantity, price: {price} } = itm
            //  console.log( bundle, quantity, price);
            if (!bundle) return 0;
            if (quantity >= bundle.purchaseQuantity) {
                const rem = quantity % bundle.purchaseQuantity;
                
            }
        }, 0)
    }


    return (
        <>
            <Head>
                <title>{`Shopping cart - ${business.name}`}</title>
            </Head>
            <NoSsr>
                <div className="container px-2 mx-auto pt-3 mb-5 pb-5">
                    
                    <div className="mx-auto w-full sm:w-4/5 mt-8 mb-2">
                        <ProgressPannel activeItem={1} done={false} />
                    </div>

                    <div className="mx-auto w-full sm:w-4/5 mt-5 mb-2">
                        <h1 className="text-2xl font-bold text-gray-500 ml-1">My basket</h1>
                    </div>
                    <div className="bg-white px-2 pb-3  mx-auto w-full sm:w-4/5">
                    
                        {basket.length >= 1 ? <div className="pt-2">
                            {basket.map(({ id, quantity, price, variant, product, bundle }, index)=>{
                                const activePrice = price?.price
                                return (
                                    <div key={id ?? index} className="flex flex-row pt-1 items-center justify-center mt-1">
                                        <div className="mr-3 justify-center  hidden sm:block">
                                            <img
                                                src={`${imageHost}/products/${product?.mainImage}`}
                                                alt={product?.name}
                                                className="w-10 h-10 clamp-2 rounded-lg"
                                                />
                                        </div>

                                        <div className="flex-1 justify-center items-center text-sm clamp-2 sm:text-base">
                                            <Link href={`/product/${product?.url}`} className="clamp-1 ">

                                                {product?.name} {variant && <span>({variant?.title})</span>}

                                            </Link>
                                        </div>

                                        <div className="flex-1 mx-auto flex justify-center items-center">
                                            <input
                                            className="h-6 px-3 mb-2 text-sm w-24  text-gray-700 placeholder-gray-600 border rounded-sm focus:shadow-outline simpler-input "
                                            type="number"
                                            min={1}
                                            onChange={(e) => {handleQtyChange(e, id)}}
                                            value={quantity}
                                            placeholder="Quantity"/>
                                        </div>

                                        <div className="flex-1 justify-center items-center">
                                            {toCurrency(computeLineTotal({activePrice, quantity, bundle}))}
                                        </div>

                                        <div className="justify-center px-3">
                                        <span className="cursor-pointer text-red-500" onClick={() => handleRemoveItem(id)}>
                                            <TrashIcon />
                                        </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div> : null}

                        {basket?.length >= 1 ? (<>
                            <hr className="w-full my-5 divider" />
                        <div className="mt-10 mb-4 flex flex-col gap-3  w-full lg:w-1/2 text-sm  px-6  bg-[#F5F5F5] rounded-lg  divide-y divide-slate-200 ml-auto">

                        <div className="mt-3 font-semibold text-lg text-gray-700 flex flex-row justify-between">
                            <span> Subtotal:</span>
                            <span>{ toCurrency(computeTotal()) } </span>
                        </div>

                        
                            <div className="text-lg pt-3 font-semibold text-primary-500 flex flex-row justify-between">
                                <span>  Discount: </span>
                                <span className="text-gray-700">{ loading ?  'loading...' : ` ${toCurrency(discountValue || 0)}`} </span>
                            
                                </div>
                            
                            
                            <div className="pt-3 font-semibold text-xl text-gray-700 flex flex-row justify-between">
                                <span> Total:</span>
                                <span>{ toCurrency(totalAfterDiscount()) }</span>
                            </div>

                        { discount && <div className="pt-2"> <i className="text-xs text-red-400 ">Discount code <b> <u> {discount.code}</u> </b> ({discount.title})</i> </div>}

                        </div> </>) : null }

                        {basket.length < 1 && <div className="p-2 justify-center flex text-gray-400 text-xl font-semibold">
                            <div className="mt-4 pt-2"> Your basket is empty </div>
                        </div>}
                    </div>


                    {basket.length ? ( <div className="bg-white px-2 pb-3 hidden  mx-auto w-full sm:w-4/5 mt-3  flex-col">

                        <div className="relative my-6 rounded-lg w-full lg:w-1/2 ">
                            <div className="absolute inset-y-0 left-0 flex items-center">
                            <label htmlFor="search" className="sr-only">Apply discount code</label>
                            
                            </div>
                            <input
                                type="text"
                                name="search"
                                className="w-full px-4 py-4  pr-32 border border-gray-300 rounded-lg"
                                placeholder="Enter discount code"
                                autoComplete='off'
                                value={discountCode}
                                onChange={(e)=> setDiscountCode(e.target.value)}
                            />
                            <div className="absolute inset-y-0 flex items-center right-2">
                            <button
                                type="button"
                                className="w-full px-6 py-2 text-lg font-medium text-white rounded-lg bg-green-500 hover:bg-green-600"
                                onClick={applyCode}
                            >
                            {loading && <LoaderIcon /> } Apply code
                            </button>
                            </div>
                        </div>
                        <div>
                            {discountError && <i className="text-red-500 text-sm"> {discountError} </i>}
                        </div>
                        
                        </div> ) : null
                    }

                    {basket.length >= 1 &&  <div className="bg-white px-2 pb-3  mx-auto w-full sm:w-4/5 mt-3 justify-end flex">

                        <Link href="/checkout">

                            <div className="flat-btn m-3 bg-primary text-white text-lg pointer rounded-lg flex flex-row items-center justify-center">
                                <span className="mr-2">Checkout</span>
                                <ChevronRightIcon style={{ position: 'relative', top: '4px' }} />
                            </div>

                        </Link>
                    </div>}
                </div>
            </NoSsr>
        </>
    );
}

export default Cart
