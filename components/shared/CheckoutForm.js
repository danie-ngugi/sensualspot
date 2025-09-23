import { useState } from 'react'

import { useToasts } from 'react-toast-notifications'

import { LoaderIcon } from 'components/icons'

const CheckoutForm = ({ handleSubmit, loading }) => {
    const [details, setDetails] = useState({ name: '', email: '', phone: '', location: '' })

    const { addToast } = useToasts()


    const submit = () => {
        if (!details.name) {
            return addToast("Name is required", {
                appearance: 'error',
                autoDismiss: true,
            })
        }
        if (!details.email) {
            return addToast("Email is required", {
                appearance: 'error',
                autoDismiss: true,
            })
        }
        if (!details.phone) {
            return addToast("Phone number is required", {
                appearance: 'error',
                autoDismiss: true,
            })
        }
        if (!details.location) {
            return addToast("Location is required", {
                appearance: 'error',
                autoDismiss: true,
            })
        }

        //  console.log('handle submit')


        return handleSubmit({...details})
    }



    return (
        <div className="grid grid-cols-12 bg-white rounded-lg  sm:gap-6 gap-y-2 p-4">
            
            <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="fullname" className="text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                
                    <input
                        onChange={(e) => setDetails({ ...details, name: e.target.value })}
                        value={details.name}
                        type="text"
                        name="fullname"
                        autoComplete="fullName"
                        id="fullname"
                        className="simple-input w-full inline-block "
                        placeholder="Full Name" />
            </div>

            <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="phonenumber" className="text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                
                    <input
                        onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                        value={details.phone}
                        type="text"
                        name="phonenumber"
                        autoComplete="PhoneNumber"
                        id="phonenumber"
                        className="simple-input w-full inline-block "
                        placeholder="Phone Number" />
            </div>

            <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="phonenumber" className="text-sm font-medium text-gray-700">
                        Email
                    </label>
                
                    <input
                        onChange={(e) => setDetails({ ...details, email: e.target.value })}
                        value={details.email}
                        type="email"
                        name="email"
                        autoComplete="YourEmail"
                        id="email"
                        className="simple-input w-full inline-block "
                        placeholder="Your email" />
            </div>


            <div className="col-span-12 sm:col-span-6">
                    <label htmlFor="phonenumber" className="text-sm font-medium text-gray-700">
                        Delivery location
                    </label>
                
                    <input
                        onChange={(e) => setDetails({ ...details, location: e.target.value })}
                        value={details.location}
                        type="text"
                        name="location"
                        autoComplete="Location"
                        id="location"
                        className="simple-input w-full inline-block "
                        placeholder="Area, building, apt etc" />
            </div>

            <div className="col-span-12 mt-4">
                <div onClick={submit} className='bg-primary-1 rounded-md p-2 text-xl font-semibold text-white cursor-pointer text-center select-none'>
                    {loading ? <LoaderIcon /> : 'Place Order'}
                </div>
            </div>

        </div>
    )
}

export default CheckoutForm