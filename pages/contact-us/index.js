
import { CallIcon, WhatsAppIcon, EmailIcon, LocationIcon } from "components/icons"

import { business } from 'common/data'

const ContactUs = () => {
    return (<div className="  mx-auto">

            <div className="w-full">
                <div className="text-white transform bg-primary-1 -mt-1">
                    <div className="max-w-6xl px-4 pt-32 pb-20 mx-auto transform sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-medium">Want to get in touch?</h1>
                        <p className="pt-4 text-xl text-gray-300 lg:w-3/6">
                        Our support team is ready to help. 
                        </p>
                    </div>
                </div>
                <div className="mb-20 transform -skew-y-3 -mt-14 h-24 bg-primary-1"></div>
            </div>

        <div className="flex flex-col pt-5 px-4">

       

            <div className=" grid grid-cols-1 gap-3 lg:gap-4 sm:grid-cols-3 lg:grid-cols-4  mb-10 ">
                <div className="flex flex-col items-center p-3 rounded-lg bg-white">
                    <div className="w-14 h-14 border-2 border-grey-500 rounded-full flex justify-center items-center">
                       <a href={`tel://${business.phone}`} className="text-primary-1">
                        <CallIcon style={{ height: "26px", width: "26px", color: "" }} />
                       </a>
                    </div>
                   <div className="mt-3 font-semibold"> 
                        <a href={`tel://${business.phone}`} className="text-black ">{business.phone} </a>
                    </div>
                </div>

                <div className="flex flex-col items-center p-3 rounded-lg bg-white">
                    <div className="w-14 h-14 border-2 border-grey-500 rounded-full flex justify-center items-center">
                        <a href={`https://wa.me/${business.whatsAppPhone}`} target="_blank">
                            <WhatsAppIcon style={{ height: "26px", width: "26px", color: "#128C7E" }} />
                        </a>
                    </div>
                    <div className="mt-3 font-semibold">
                       <a href={`https://wa.me/${business.whatsAppPhone}`} target="_blank" className="text-black ">WhatsApp </a> 
                    </div>
                </div>

                <div className="flex flex-col items-center p-3 rounded-lg bg-white">
                    <div className="w-14 h-14 border-2 border-grey-500 rounded-full flex justify-center items-center">
                        <a href={`mailto:${business.email}`} className="text-black ">
                            <EmailIcon style={{ height: "26px", width: "26px", color: "#F44336" }} />
                        </a>
                    </div>
                   <div className="mt-3 text-base font-semibold">
                       <a  href={`mailto:${business.email}`}  className="text-black "> {business.email} </a>
                    </div>
                </div>

                <div className="flex flex-col items-center p-3 rounded-lg bg-white">
                    <div className="w-14 h-14 border-2 border-grey-500 rounded-full flex justify-center items-center">
                        <a href="#" target="_blank">
                           <LocationIcon style={{ height: "26px", width: "26px", color: "#03A9F4" }} />
                        </a>
                    </div>
                   <div className="mt-3 text-base font-semibold "> {business.location} </div>
                </div>

                {/* <div>
                   Whatsapp
                </div>

                <div>
                   Email
                </div>  */}
            </div>

            <div className="map bg-white/50 p-1 mb-10 h-60">
                {/* <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176128359914!2d36.82336231475402!3d-1.2832867990640107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1169b9341401%3A0x787f1695ca4b182!2sArmacel%20Fashion%20Store!5e0!3m2!1sen!2ske!4v1650899120184!5m2!1sen!2ske"
                className="w-full h-72"
                allowFullScreen=""
                loading="lazy"></iframe> */}
            </div>
            
        </div>   

    </div>)
}
export default ContactUs

//<iframe src="" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>