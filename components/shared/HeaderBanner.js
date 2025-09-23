
const HeaderBanner = ({ title, description}) => {
    return (
        <div className="w-full">
        <div className="text-white transform bg-primary-1">
            <div className="max-w-6xl px-4 pt-32 pb-20 mx-auto transform sm:px-6 lg:px-8">
                <h1 className="text-4xl font-medium"> {title} </h1>
                <p className="pt-4 text-xl text-gray-300 lg:w-3/6">
                    {description}
                </p>
            </div>
        </div>
        <div className="mb-20 transform -skew-y-3 -mt-14 h-24 bg-primary-1"></div>
    </div>
    )
}

export default HeaderBanner