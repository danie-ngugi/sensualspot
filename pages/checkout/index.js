import { useState, useEffect, useContext } from 'react'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { CartContext } from '../../context/CartContext'


import { imageHost, siteUrl } from 'common/data'

import { toCurrency, validateEmail } from 'common/methods'

import { LoaderIcon } from 'components/icons'

import { useToasts } from 'react-toast-notifications'

//  import BasketDetails from 'components/shared/BasketDetails'
import NoSsr from 'components/shared/NoSsr'



import { DiscountContext } from 'context/DiscountContext'

import ProgressPannel from 'components/checkout/ProgressPannel'
import Head from 'next/head'
import { business } from '../../common/data'
//  import ProgressPannel from 'components/checkout/ProgressPannel'
const BasketDetails = dynamic(() => import('components/shared/BasketDetails'), { ssr: false })

const Checkout = () => {
    const router = useRouter()

    const { addToast } = useToasts()

    const { basket, resetBasket } = useContext(CartContext)
    const { discount } = useContext(DiscountContext);

    const [loading, setLoader] = useState(false)
    const [requireInvoice, setRequireInvoice] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState("Cash")
    const [details, setDetails] = useState({
        name: '',
        phone: '',
        email: '',
        location: '',
        road: '',
        instructions: ''
    })

    //  console.log(discount, 'discount')

    const subtotal = () => {
        let total = 0
        total = basket.map((item) => item.quantity * item.price.price).reduce((a, b) => a + b, 0)

        return total
    }

    const computeDiscount = () => {
        if (!discount)  return 0;
        if (discount.percentage) {
            return Math.floor((subtotal()/ 100) * discount.value)
        }
        return discount.value;
    }

    const handleChange = (e, field) => {
        const value = e.target.value;
        setDetails({ ...details, [field]: value })
    }

    const placeOrder = async () => {
        if (loading) return;
        try {

            // check form validity
            if (!details.name) {
                throw(new Error('Name is required'))
            }

            if (!details.location) {
                throw(new Error('Delivery location is required'))
            }
            
            if (!details.phone || details.phone.length < 10) {
                throw (new Error('Enter valid phone number'))
            }

            if (requireInvoice) {
                const valid = validateEmail(details.email)
                if (!valid) {
                    throw(new Error('Enter valid email'))
                }
            }



            if (loading) {
                return false;
            }

            let discountData = {}

            if (discount) {
                discountData = {
                    discount: computeDiscount()
                }
            }
            const cartItems = basket.map((item) => {
                
                return {
                    productId: item.product._id,
                    variantId: item.variant ? item.variant._id: null,
                    quantity: item.quantity,
                    price: item?.price?.price ?? item?.price,
                    variant: item.variant,
                    color: item.color || '',
                    url: item.product.url,
                    productName: item.product.name,
                    variantName: item.variant ? item.variant.title : '',
                   
                }
            })

            if (cartItems.length === 0) {
                throw(new Error('Your basket is empty'))
            }

            //   console.log(cartItems, 'cart Items')
            setLoader(true)
            const response = await fetch('/api/order/checkout', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...details,
                    client: {
                        phone: details.phone,
                        name: details.name,
                        email: details.email
                    },
                    delivery: {
                        location: details?.location,
                        road: details?.road,
                        instructions: details.instructions,
                        landmark: '',
                        cost: 0
                    },
                    paymentMethod,
                    sendInvoice: requireInvoice,
                    cart: cartItems,
                    subtotal: subtotal(),
                    ...discountData,
                    discountCode: discount && discount?.code ? discount.code : null
                }),
            })


            const data = await response.json()
            
            if (data.state) {
                router.push(`/success?id=${data.order._id}`);
                resetBasket();
            } else {
                throw(new Error(data.msg))
            }
            
        } catch (error) {
            const content = `Error: ${error.message}`
            addToast(content, {
                appearance: 'error',
                autoDismiss: true,
            })
            console.log(error)
        } finally {
            setLoader(false)
        }
    }

    const paymentOptions = [
        { name: "Cash", value: "Cash"},
        { name: "Mpesa", value: "Mpesa"},
        // { name: "Credit card", value: "credit_card"},
        // { name: "Paypal", value: "paypal"}
    ]

    const handlePaymentMethodChange = (e) => {
        const value = e.target.value;
        setPaymentMethod(value)
    }

    const handleInvoiceOption = (e) => {
        const val = e.target.checked;
        setRequireInvoice(val)
    }

    return (
        <div className="container mx-auto px-2 pt-3 mb-5 pb-5 accent-violet-600">
            <Head>
                <title>{`Place order - ${business.name}`}</title>
            </Head>
             <NoSsr>
           
            <div className="mx-auto w-full sm:w-4/5 mt-8 mb-2">
                <ProgressPannel activeItem={2} done={false} />
            </div>
            
            <div className="mx-auto w-full sm:w-4/5 mt-5 mb-2">
                <h1 className="text-2xl font-bold text-gray-500 ml-1">Checkout</h1>
            </div>

            <div className="mx-auto w-full sm:w-4/5 mb-2">
                <BasketDetails shipment={0} subtotal={subtotal()} />
            </div>

            <div className="mx-auto bg-white w-full  sm:w-4/5 mb-2 mt-5">
                
                    {/* <input
                        className="w-full h-8 px-2 text-sm text-gray-700 placeholder-gray-600 border rounded-sm focus:shadow-outline"
                        type="text"
                        placeholder="Full Name"/> */}
                        

                {basket.length >= 1 && <div className="grid   sm:gap-8 gap-y-8 p-3">
                    <div className="col-span-12 sm:col-span-4">
                            <label htmlFor="fullname" className="  text-sm font-medium text-gray-700">
                            Full Name
                            </label>
                        
                            <input
                                onChange={(e) => handleChange(e, 'name')}
                                value={details.name}
                                type="text"
                                name="fullname"
                                autoComplete="off"
                                id="fullname"
                                className="simple-input w-full inline-block "
                                placeholder="Full Name" />
                        
                        </div>
                        <div className="col-span-12 sm:col-span-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone
                            </label>
                        
                            <input
                                onChange={(e) => handleChange(e, 'phone')}
                                value={details.phone}
                                type="number"
                                name="phone"
                                id="phone"
                                autoComplete="off"
                                className="simple-input"
                                placeholder="Phone number" />
                        
                        </div>
                        <div className="col-span-12 sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                            </label>
                        
                            <input
                                onChange={(e) => handleChange(e, 'email')}
                                value={details.email}
                                type="text"
                                name="email"
                                id="email"
                                autoComplete="off"
                                className="simple-input"
                                placeholder="Email" />
                        
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                            </label>
                        
                            <input
                                onChange={(e) => handleChange(e, 'location')}
                                value={details.location}
                                type="text"
                                name="location"
                                id="location"
                                placeholder="Your location"
                                autoComplete="off"
                                className="simple-input" />
                        
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <label htmlFor="Road" className="block text-sm font-medium text-gray-700">
                            Road | Street | Building
                            </label>
                        
                            <input
                                 onChange={(e) => handleChange(e, 'road')}
                                 value={details.road}
                                type="text"
                                name="road"
                                id="road"
                                autoComplete="off"
                                className="simple-input"
                                placeholder="Road / Street / Building" />
                        
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <span htmlFor="Road" className="block text-sm font-medium text-gray-700">
                            Payment options
                            </span>

                            <div className="flex flex-row flex-wrap mt-2 gap-4 justify-start ">

                                {paymentOptions.map((option) => {
                                    return (
                                        <span key={option.value} className="flex flex-row items-center space-x-2 mr-3 sm:mr-0">
                                            <input onChange={handlePaymentMethodChange} type="radio" id={option.value} name="payment_option" checked={paymentMethod === option.value } value={option.value} className="focus:ring-0 text-primary-1" />
                                            <label className=' cursor-pointer select-none ' htmlFor={option.value}> {option.name} </label>
                                        </span>
                                    )
                                })
                                }

                                
                                

                            </div>
                            <div className="bg-gray-100 p-2 rounded-sm text-sm my-3">

                                   { paymentMethod === 'Cash' ? 
                                        (<p className='break-all'>Pay cash on delivery <br />
                                         (<b className="text-red-600">Only for orders within Nairobi, please choose Mpesa if outside Nairobi</b>) </p>)
                                        : (<p> 
                                            {/* <li>Mpesa on delivery - For orders within Nairobi</li> */}
                                            <li>Mpesa before delivery - For orders to other parts of the country</li>
                                             </p>)
                                    }

                            </div>

                            
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <span htmlFor="Road" className="block text-sm font-medium text-gray-700">
                               Delivery note (email required)
                            </span>

                            <div className="flex flex-row items-center space-x-4 mt-2">
                                <input onChange={handleInvoiceOption} type="checkbox" id="invoice" name="vehicle1" value="invoice" className="focus:ring-0 form-checkbox text-primary-1" />
                                <label htmlFor="invoice" className='cursor-pointer select-none'> Send delivery note</label>
                            </div>

                        </div>

                        <div className="col-span-12">
                            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
                                Other instructions
                            </label>
                            <textarea
                                onChange={(e) => handleChange(e, 'instructions')}
                                value={details.instructions}
                                id="instructions"
                                placeholder="instructions"
                                className="simple-input" />
                        </div>

                        <div className="col-span-12 flex justify-end">
                            <div
                                onClick={placeOrder}
                                className="flat-btn bg-primary  text-white text-base rounded-sm pointer">
                                    {loading ? <div className="flex flex-row space-x-2"> <LoaderIcon /> <span>Loading</span> </div> : <span>Place order</span>}
                                </div>
                        </div>
                </div>}
                    {basket.length <= 0 && <div className="flex p-3 justify-center">
                        <div className="mt-4 font-bold text-gray-500 text-2xl pb-3"> Your cart is empty </div>
                    </div>}
            </div>
            </NoSsr>
        </div>
    )
}

export default Checkout
