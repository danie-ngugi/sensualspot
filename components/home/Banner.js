import { useRouter } from 'next/router'
import { business } from 'common/data'

const HomeBanner = () => {
    const router = useRouter()
    const navigate = (url) => {
        router.push(url)
    }
    return (
        <div>
            {/* bg-[#e1e6ef] */}
            <div className="bg-[#e1e6ef] p-3 bg-cover bg-center rounded-sm flex flex-col lg:flex-row  min-h-[440px] mt-4 "  style={{ backgroundImage: 'url(/scentfied_banner.webp)'}}>

                <div className="flex flex-col justify-center sm:ml-16 flex-1 order-2 sm:order-1">
                    <h2 className="text-5xl font-bold py-6 text-secondary-1"> {business.name} </h2>
                    <p className='py-4 text-2xl font-thin w-1/2 text-white'>
                    Don't miss out on some very special items at extraordinary sale prices. For a limited time!
                    </p>
                    <div className='mt-4'>
                        <div  className="inline-flex cursor-pointer w-auto items-center justify-center px-6 py-3 mx-auto text-lg font-medium text-white rounded-md lg:mx-0 bg-primary-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600">
                            Shop Now 
                        </div>
                    </div>
                </div>

                {/* <div className='flex-1 min-h-[320px]  bg-no-repeat rounded-md  bg-cover order-1 sm:order-2 bg-center ' style={{ backgroundImage: 'url(/vapes_banner.webp)'}}>

                </div> */}
            </div>
        </div>
    )
}


export default HomeBanner