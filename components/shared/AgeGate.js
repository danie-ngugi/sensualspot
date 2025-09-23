import { useState, useContext, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { business } from 'common/data';

// import { useState, useEffect } from 'react'
// import { isOfAge } from "common/data"
export const isOfAge = (typeof(localStorage) !== 'undefined' ? localStorage.getItem('isOfAge') : false)

const AgeGate = () => {

    const [legalAge, setLegalAge] = useState(isOfAge)

    const [ isOpen, setIsOpen] = useState(legalAge === null)

    const setAge = () => {
        console.log('set age')
    }

    const handleClose = (v) => {
        if (!v) {
            return false
        }

        localStorage.setItem('isOfAge', true)
        setIsOpen(false)
    }

    return legalAge ? null : (
        <Transition.Root show={isOpen} as={Fragment} afterLeave={() => { setAge }}>
            <Dialog onClose={() => handleClose(false) } className="fixed inset-0 p-4 pt-[15vh] lg:pt-[25vh] overflow-y-auto z-30">
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

                    
                    <div className="flex flex-row items-center justify-center h-full px-4">

                        <div className="bg-white p-4 rounded-md z-50 w-full sm:w-2/4">

                            <span className='text-3xl text-secondary-1 font-bold'>
                                {business.name}
                            </span>

                            <p className="my-6">
                                Welcome to {business.name}. We sell products for persons above the age of 18. 
                            </p>

                            <div className="py-2 text-lg">
                               To proceed, confirm that you are 18 years and above?
                            </div>

                            <div className="flex flex-row justify-end items-center mt-6 mb-4 space-x-6">
                                <button
                                    type="button"
                                    onClick={() => history.back() }
                                    className='text-white font-semibold px-4 py-2 bg-gray-500 rounded-md outline-none ring-0'>
                                         Go back
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleClose(true)}
                                    className='text-white font-semibold px-4 py-2 bg-green-500 rounded-md outline-none ring-0   '> I Confirm </button>
                            </div>

                        </div>
                    </div>

                </Transition.Child>
            </Dialog>
        </Transition.Root>
    )
}


export default AgeGate