import { monthNDate } from "common/methods"

const OfferBanner = ({ discount }) => {
    if (!discount) return null
    return (
        <div className="bg-white rounded-sm p-3 bg-[url('/offer-banner.jpeg')] object-contain lg:bg-center h-96 shadow-sm  flex flex-col justify-center ">
           <div className="flex flex-col items-center justify-center px-6 gap-4">

                <div className="text-xl text-red-500 tracking-wider font-light"> {monthNDate(new Date())} - {monthNDate(discount.endDate)}  </div>
                <div className="text-3xl lg:text-5xl text-secondary-1 font-bold capitalize"> Buy more, Pay less</div>
                <div className="text-3xl text-gray-600"> {discount.title} </div>
                <div className=" text-gray-700 leading-6">
                    To get this offer use the discount code <br /> <i> <b className="text-secondary-1"> {discount.code} </b>  </i>
                </div>

           </div>
        </div>
    )
}


export default OfferBanner