
import { useState, useContext, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react'

import { LoaderIcon } from 'components/icons';

import { useToasts } from 'react-toast-notifications'

import { WhatsAppContext } from 'context/WhatsAppContext';
import { toCurrency } from 'common/methods';

import { business, siteUrl } from 'common/data';

const WhatsAppModal = () => {
    const { isOpen, setIsOpen, activeProduct } = useContext(WhatsAppContext)

    const { addToast } = useToasts()


    const [activeVariant, setActiveVariant] = useState()
    const [ quantity, setQuantity] = useState(1)
    const [location, setLocation] = useState('')

    useEffect(() => {
        setActiveVariant(activeProduct?.variants.length >= 1 ? activeProduct.variants[0] : null )
    }, [activeProduct])

    const resetForm = () => {
        console.log('reset')
    }

    const closeDialog = () => {
        setLocation('')
        setIsOpen(false);
    }

    const sendOrder = () => {
        if (!location) {
            // throw error
            addToast("Please input your location", {
                appearance: 'error',
                autoDismiss: true,
            })

            return
        }
        const quantity = Number(quantity) || 1
        const variantStr = activeVariant ? activeVariant.title : ''
        const cost = activeVariant && activeVariant.priceEffect ? activeVariant.price : activeProduct.price
        const productUrl = `${siteUrl}/product/${activeProduct.url}`
        const msg = ` Hello ${business.name} , I want to order ${quantity} of ${activeProduct.name} ${variantStr} @ ${toCurrency(cost)} ( ${productUrl} ) .
        Make this delivery to ${location}. Regards`

       

        const url = `https://api.whatsapp.com/send?phone=${business.whatsAppPhone}&text=${msg}`
        const win = window.open(url, '_blank')
        win.focus()
        closeDialog()
    }

    const handleVariantChange = (variant) => {
        // if (variant.priceEffect) {
        //    setActivePrice({ price: variant.price })
        // } else {
        //     setActivePrice({ price: product.price })
        // }
        if (!variant) return
        setActiveVariant(variant)
      }

    return (
        <Transition.Root show={isOpen} as={Fragment} afterLeave={() => { resetForm }}>
        <Dialog onClose={setIsOpen} className="fixed inset-0 p-4 pt-[10vh] lg:pt-[15vh] overflow-y-auto z-30">
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
                   activeProduct ? (
                    <div className="max-w-2xl p-4 relative bg-white mx-auto rounded-xl shadow-2xl right-1 ring-black/5 divide-y divide-gray-100 overflow-hidden">
                        <div className="py-3 text-center font-medium text-[#128C7E] text-xl">
                                Checkout via WhatsApp
                        </div>

                        <div className="flex flex-col gap-4">


                        <div className="mt-3 flex flex-row">
                            
                            {activeProduct && activeProduct.variants && activeProduct?.variants?.map((variant) => {
                                return (
                                    <div
                                        key={variant.title}
                                        onClick={() => handleVariantChange(variant)}
                                        className={` m-1 p-1 rounded-md cursor-pointer 
                                        ${ activeVariant && activeVariant?.title === variant.title ? 'bg-secondary text-white' : 'border-gray-500 border'}`}>
                                        {variant.title} 
                                    </div>
                                )
                            })}
                        </div>
                           

                            <div className="flex flex-col">
                                 <label className="my-1 text-gray-700 text-base px-1 cursor-pointer"  htmlFor="location">Delivery location</label>
                                <input 
                                    autoComplete="off"
                                    type="text"
                                    required
                                    onChange={(e) => setLocation(e.target.value)}
                                    className=" ring-1 ring-gray-300 border-1 focus:border-1 focus:outline-none focus:ring-1 h-10 block w-full px-4 sm:text-sm border-gray-300 rounded-md"
                                    id="location" placeholder='Delivery location' />
                            </div>
                            <div className="flex flex-col">
                                 <label className="my-1 text-gray-700 text-base px-1 cursor-pointer"  htmlFor="quantity">Quantity</label>
                                <input 
                                    autoComplete="off"
                                    type="number"
                                    min={1}
                                    value={quantity}
                                    onChange={(e) => {
                                        const q = e.target.value;
                                        // if (Number(q) < 1) return;
                                        setQuantity(q)
                                    }}
                                    className=" ring-1 ring-gray-300 border-1 focus:border-1 focus:outline-none focus:ring-1 h-10 block w-full px-4 sm:text-sm border-gray-300 rounded-md"
                                    id="quantity" placeholder='Quantity' />
                            </div>

                            <div className="text-right text-sm mt-3 font-bold text-primary-1">
                              <i>
                              {activeProduct.name} {' @ '}
                               {activeVariant?.priceEffect && activeVariant.price ?  toCurrency(activeVariant.price * (Number(quantity) || 1)) : toCurrency(activeProduct.price * (Number(quantity) || 1))  }
                              </i>
                            </div>
                        </div>

                        <div className="flex flex-row justify-end mt-8 gap-4">

                            <div
                                onClick={closeDialog}
                                className="px-4 py-2 mt-3 rounded-lg bg-gray-700 text-white cursor-pointer"
                            >Cancel</div>

                            <div
                                onClick={sendOrder}
                                className="px-4 py-2 mt-3 rounded-lg bg-[#128C7E] text-white cursor-pointer"
                            >Place order</div>

                        </div>
                    </div>
                   ) : (
                       <div className="max-w-2xl p-4 relative bg-white mx-auto rounded-xl shadow-2xl">
                           Error! please try again
                       </div>
                   )
               } 
                
            </Transition.Child>
        </Dialog>
        </Transition.Root>
    )
}

export default WhatsAppModal