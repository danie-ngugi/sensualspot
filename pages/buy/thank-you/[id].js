import Link from 'next/link';
import { connectToDatabase, ObjectId } from '../../../util/db'

import OrderPreview from 'components/checkout/OrderPreview';

import { business } from 'common/data';
import HowToPay from 'components/shared/HowToPay';

const ThankyouPage = ({ order }) => {

    return (
        <div className='container max-w-screen-2xl mx-auto prose'>

            <div className='mx-auto p-2 w-full flex flex-col mb-14 '>

                <div className='mx-auto mb-12'>
                    <img className="h-36 rounded-lg" src="/armacel_dark.png" />
                </div>


                <div className=" w-full text-center  ">
                    <h1 className=" text-6xl mx-auto text-green-700 my-3 "> Thank you! </h1>
                    <p className="mx-auto text-lg font-light">Your order has been received</p>
                </div>

                <div className="mx-auto prose">
                   
                    <HowToPay />
                     {/* Order details */}
                    <div className="">
                        <h2 className="">Order details</h2>

                        <div>
                           <OrderPreview order={order} />
                        </div>

                    </div>

                    <div className="text-center">
                        <p>
                            Our representative will get in touch with you for delivery confirmation.
                        </p>
                       
                        <p className="text-secondary-1">
                            If you have any questions, kindly get in touch
                        </p>
                        <div className="text-lg"> <span className="font-bold">Call: </span>  {business.phone} </div>
                        <div className="text-lg mb-12"> <span className="font-bold">Email: </span>  {business.email} </div>


                        <Link
                            href="/"
                            className="px-4 py-3 bg-primary-1  text-white text-lg  rounded-md no-underline">
                            Continue shoping
                        </Link>
                    </div>
                </div>

               
            </div>
        </div>
    );
}

export async function getServerSideProps (context) {
    try {
        const id = context.params.id;
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

export default ThankyouPage