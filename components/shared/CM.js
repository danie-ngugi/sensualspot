import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'


import { CloseIcon, LoaderIcon } from 'components/icons'

import ProductDetailsView from '../products/ProductDetailsView';

const CartModal = ({product, handleClose}) => {
  

    return (
        <div className="modal fixed bg-white p-3 w-5/6 sm:w-4/6 rounded-md">
            <div className="overlay" onClick={() => handleClose()}></div>
        
            <div className="modal absolute bg-white p-3 w-5/6 sm:w-3/6 overflow-scroll rounded-md">
                <div className="flex flex-col mb-2">
                  <div className="grid grid-cols-10 border-b-2 border-gray-300 p-2">
                   
                    <div className="mt-2 col-span-9"></div>
                    <div className="flex flex-row justify-end col-span-1">
                        <span onClick={() => handleClose()} className="flex flex-row justify-center items-center bg-gray-100 px-2 border border-gray-200  cursor-pointer  rounded-lg text-true-gray-400"> esc </span>
                        {/* <CloseIcon /> */}
                    </div>
                  </div>
                </div>


                <div className="p-1 flex flex-col bg-red-500">
                    abcd
                   {/* <ProductDetailsView product={product} /> */}
                </div>
                
            

              
            </div>
            <style jsx> {`
                .modal{
                    z-index: 1000;
                }
                .overlay {
                    position: fixed;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background: rgba(0, 0, 0, 0.3);
                    z-index: 1000;
                }

                `} </style>
            </div>
        
    )
}

export default CartModal