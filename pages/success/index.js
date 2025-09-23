import { useState } from "react"
import { useRouter } from "next/router"
import Head from 'next/head'

import Feedback from "components/shared/Feedback"

import { useToasts } from 'react-toast-notifications'
import ProgressPannel from 'components/checkout/ProgressPannel'

import OrderPreview from 'components/checkout/OrderPreview';


import { connectToDatabase, ObjectId } from 'util/db'

import { business } from "common/data"
import HowToPay from "components/shared/HowToPay"

const Success = ({ order }) => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const { addToast } = useToasts()

    const sendFeedback = async (feedback) => {
        try {
            setLoading(true)
            const response = await fetch('/api/feedback', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...feedback
                }),
            })

            const data = await response.json()
            
            if (data.state) {
                router.replace('/')
               
            } else {
                throw new Error(data.msg)
            }
            
        } catch (err) {
            addToast(`Error: ${err.message}`, {
                appearance: 'error',
                autoDismiss: true,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container pb-5 mb-20 pt-3  px-3 items-center flex flex-col mx-auto">
            <Head>
                <title>{`Your order have been placed successfully - ${business.name}`}</title>
            </Head>

            <div className="mx-auto w-full sm:w-4/5 mt-8 mb-2">
                <ProgressPannel activeItem={4} done={true} />
            </div>

            <div className="bg-white p-2 mt-16 rounded-lg w-full  md:w-4/5 flex flex-col items-center">
                <h1 className="font-bold text-xl primary-text mb-3">Order placed successfully </h1>

                <p>
                    You will receive a call to confirm your order. Thank you for shopping with <b> {business.name} </b>.
                </p>
            </div>

            
            <div className="mx-auto w-full sm:w-4/5 mt-8 mb-2">
                {order && order?.paymentMethod === 'Mpesa' && <div className="bg-white p-4 my-4 rounded-md">
                    <HowToPay />
                </div>}
                {order && <div className="bg-white p-4 mt-6 rounded-md">
                    <h2 className="text-2xl font-semibold">Order details</h2>
                    <OrderPreview order={order} />
                </div> }
            </div>

           {/* <div className="bg-white flex flex-col  w-full  md:w-4/5 mt-12 p-2">
                <Feedback loading={loading} handleSubmit={sendFeedback} title="Rate your shopping experience" />
           </div> */}
        </div>
    )
}


export async function getServerSideProps (context) {
    try {
        const id = context?.query?.id;
        const { db } = await connectToDatabase()
    
    
        const order =  await db
            .collection('orders')
            .findOne({ _id: ObjectId(id) })
    
        return {
            props: {
                order: JSON.parse(JSON.stringify(order))
            }
        }
    } catch (err) {
        return {
            props: {
                order: null
            }
        }
    }
}

export default Success