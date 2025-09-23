import Link from 'next/link'

const QuickAction = () => {
    return (
        <div className="flex flex-col sm:flex-row  items-stretch h-96 sm:h-72 gap-4 lg:gap-8">
            <div className="bg-[url('/section/banner11.jpeg')]  bg-no-repeat  flex-grow flex flex-row items-center">
                <div className="bg-orange-300 w-full h-full flex">
                    <div className="my-auto mx-auto inline-flex flex-col px-8 p-4 gap-2 ">
                        <span className="text-sm">Pocket friendly prices</span>
                        <h3 className="text-2xl">Featured items</h3>
                        <Link
                            href="/featured"
                            className="inline-flex w-auto items-center justify-center px-6 py-3 mx-auto text-lg font-medium text-white rounded-md lg:mx-0 bg-accent-700 hover:bg-accent-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600">

                            <span>Shop now</span>
                            <svg
                                className="w-5 h-5 ml-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>

                        </Link>
                    </div>
                </div>
            </div>
            {/* bg-[url('/section/banner11.jpeg')] */}
            <div className=" bg-blue-300 bg-cover flex-grow flex flex-row items-center">
                <div  className="flex flex-col px-8 p-4 gap-2 flex-grow-0 mx-auto">
                    <span className="text-sm">Offers & discounts</span>
                    <h3 className="text-2xl">Offers</h3>
                    <Link
                        href="/offers"
                        className="inline-flex items-center justify-center px-6 py-3 mx-auto text-lg font-medium text-white rounded-md lg:mx-0 bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">

                        <span>Get offers</span>
                        <svg
                            className="w-5 h-5 ml-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>

                    </Link>
                   
                </div>
            </div>
            
        </div>
    );
}

export default QuickAction