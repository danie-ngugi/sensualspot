import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useToasts } from 'react-toast-notifications'

import { renderText } from 'common/methods'
import { connectToDatabase } from '../../util/db'
import { imageHost } from 'common/data'
import YoutubeVideo from 'components/shared/YoutubeVideo'

import CheckoutForm from 'components/shared/CheckoutForm'
import OrderPreview from 'components/shared/OrderPreview'


const LandingPage = ({ page, product }) => {
    const [ options, setOptions ] = useState({})
    const [loader, setLoader] = useState(false)

    const router = useRouter()

    const { addToast } = useToasts()

    if (!page) {
        return <div>Not found</div>
    }

    const configOptions = useCallback(
        (data) => {
            //  console.log(data)
            setOptions(data)
        },
        [ product ]
    )

    const placeOrder = async (postData) => {
        try {
            const cartItem = {
                productId: product._id,
                variantId: options.variant ? options?.variant?._id: null,
                quantity: 1,
                price: options?.price,
                variant: options?.variant,
                color: options?.color || '',
                url: product?.url,
                productName: product?.name,
                variantName: options?.variant ? options.variant?.title : '',
               
            }
            // console.log('product', cartItem)
            // console.log('data', data)

                        //   console.log(cartItems, 'cart Items')
            setLoader(true)
            const response = await fetch('/api/order/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...postData,
                    instructions: '',
                    road: '',
                    paymentMethod: 'cash',
                    sendInvoice: false,
                    cart: [cartItem],
                    subtotal: (options?.price * options?.quantity),
                }),
            })
            
            const data = await response.json()
            //  console.log('responseData', data)
            
            if (data.state) {
                router.replace(`/buy/thank-you/${data.order._id}`);
                //  resetBasket();
            }

        } catch (err) {
           // console.log(err.message)
            addToast('Failed to place order. Try again', {
                appearance: 'error',
                autoDismiss: true,
            })
        } finally {
            setLoader(false)
        }
    }
    return (
        <div className='container max-w-screen-2xl mx-auto prose'>

           <div className='mx-auto p-2 w-full lg:w-4/6 mt-6 flex flex-col mb-14'>

                <div className='mx-auto mb-12'>
                    <img className="h-36 rounded-lg" src="/armacel_dark.png" />
                </div>

                <div className='mx-auto'>   { renderText( page.introduction) } </div>
                <div className='mx-auto'> 
                    <img className='aspect-video'   src={`${imageHost}/landings/${page.url}.webp`} /> 
                </div>

                { page.sections.map((section) => {
                    return (
                        <div key={section._id} className="my-4">
                            <div> {renderText(section.content)} </div>
                           { section?.video && (<div>
                                <YoutubeVideo className="rounded-lg" video={section.video.split('v=')[1]} />
                            </div>)}
                           {section.image &&  <div> <img className="rounded-lg" src={`${imageHost}/landings/${section.image}`} /> </div>}
                        </div>
                    )

                })}


           </div>
           <div className='mx-auto p-2 w-full lg:w-4/6 mt-6 flex flex-col mb-14'>
                {/* <div className="my-6">
                    <OrderPreview setOptions={configOptions} order={{}} product={product} />
                </div> */}
               <div className='flex flex-col mt-4'>
                    {/* <div> Checkout </div> */}
                    <div>
                        <CheckoutForm handleSubmit={placeOrder} loading={loader} />
                    </div>
                </div>
           </div>

        </div>
    )
}



export async function getStaticPaths () {
    try {
        const { db } = await connectToDatabase()


        const pages =  await db
            .collection('landingpages')
            .find({})
            .toArray()
    
          const paths = pages.map((p) => ({ params: { url : p.url } }))
    
          return {
            paths,
            fallback: false
          }
    } catch {
        return {
            paths: [],
            fallback: false
          }
    }
}


export async function getStaticProps (context) {
    try {
        const url = context.params.url

        //  console.log(url, 'context url')

        const { db } = await connectToDatabase()


        const page =  await db
            .collection('landingpages')
            .findOne({ url })

        const product = await db.collection('products').findOne({ _id: page.productId  })

        return {
            props: {
                page: JSON.parse(JSON.stringify(page)),
                product: JSON.parse(JSON.stringify(product))
            }
        }
    } catch {
        return {
            props: {
                page: null,
                product: null
            }
        }
    }
}


export default LandingPage