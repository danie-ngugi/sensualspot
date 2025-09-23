import Link from "next/link"

import { business } from 'common/data'

const ContactUsSection = () => {
    return <>
        <section className="px-8 py-20 mx-auto overflow-x-hidden bg-white">
            <div className="relative w-full max-w-5xl mx-auto">
                <div
                className="relative z-10 flex flex-col items-center justify-center w-full px-8 py-12 mx-auto text-center bg-white border border-gray-100 shadow-xl md:justify-between md:text-left md:flex-row rounded-xl"
                >
                <div>
                    <h3>Do you have any questions about {business.name} </h3>
                    <p className="mt-2 text-gray-600">Our support team is available for you anytime</p>
                </div>
                <Link
                    href="/contact-us"
                    className="flex items-center justify-center max-w-[280px] px-6 py-3 mt-6 text-lg font-medium text-white rounded-md md:mt-0 bg-primary-600 hover:bg-primary-700">

                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                    </svg>
                    <span>Contact us</span>

                </Link>
                </div>
                <svg
                className="absolute right-0 z-0 w-auto h-48 transform translate-x-1/2 -translate-y-1/2 top-4 text-secondary-700"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fill="currentColor"
                    d="M147 59.2c4.7 9.2-7.1 28.2-11 50.4-4 22.3 0 47.8-11.1 60-11 12.2-37.1 11-50.3-1.3-13.1-12.4-13.4-35.9-14.8-55.3-1.4-19.5-4-34.9 2.5-44.5 6.5-9.5 22.1-13.1 40.5-15.4 18.4-2.2 39.6-3 44.2 6.1z"
                />
                </svg>
                <svg
                className="absolute z-0 w-auto h-48 transform -translate-x-1/2 translate-y-1/2 left-4 bottom-6 text-complementary-500"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fill="currentColor"
                    d="M141.5 68.5c8.4 9.1 8.9 26.1 5 41.6-4 15.5-12.4 29.4-25.7 37.6-13.4 8.1-31.7 10.5-45.2 3.7-13.4-6.8-22.1-22.8-29.2-42.4-7.1-19.7-12.6-43-3.4-52.2 9.2-9.3 33.1-4.5 53.3-1.5 20.2 2.9 36.7 4.1 45.2 13.2z"
                />
                </svg>
            </div>
        </section>
    </>;
}

export default ContactUsSection