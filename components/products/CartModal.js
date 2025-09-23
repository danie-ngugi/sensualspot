import { useEffect, useState } from 'react'

// import { CloseIcon } from 'components/icons/Close'


import ProductDetailsView from './ProductDetailsView';


const CartModal = ({children, handleClose, product}) => {

    useEffect(() => {
        const handleEsc = (event) => {
           if (event.keyCode === 27) {
            handleClose()
          }
        };
        window.addEventListener('keydown', handleEsc);
    
        return () => {
          window.removeEventListener('keydown', handleEsc);
        };
      }, []);


    return (
        <div>
            <div className="overlay" onClick={() => handleClose()}></div>
        
            <div className="modal fixed bg-white p-3 w-5/6 sm:w-4/6 rounded-md">
                <div className="flex flex-col mb-2">
                  <div className="grid grid-cols-10 border-b-2 border-gray-300 p-2">
                   
                  <div className="mt-2 col-span-9"></div>
                  <div className="flex flex-row justify-end col-span-1">
                        <span onClick={() => handleClose()} className="flex flex-row justify-center items-center bg-gray-100 px-2 border border-gray-200  cursor-pointer  rounded-lg text-true-gray-400"> esc </span>
                        {/* <CloseIcon /> */}
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <ProductDetailsView product={product} />
                </div>
                
                {children}

              
            </div>
            <style jsx> {`
                .modal{
                    top: 40%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1000;
                    overflow-y: scroll;
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