import { useRouter } from 'next/router'

// import { brands } from 'common/data'

import { imageHost } from 'common/data'

const Brands = ({ brands }) => {
    const navigate = useRouter()
    const handleNavigation = (route) => {
        navigate.push(`/brand/${route}`)
    }
    return (
        <div  className="rounded-md grid grid-rows-auto grid-cols-3 lg:grid-cols-8 select-none">
            {brands.map(brand => (
                <div onClick={() => handleNavigation(brand.url) } key={brand.url} className="flex flex-col justify-center items-center mx-2 my-2 py-4 px-4 sm:cursor-pointer bg-white rounded-md shadow-sm">

                    <div>
                        {/* <img alt={brand.name} src={`${imageHost}/brands/${brand.image}`} className="max-h-10" /> */}
                    </div>
                    <div className="text-sm"> {brand.name} </div>
                </div>
            ))}
        </div>
    )
}

export default Brands