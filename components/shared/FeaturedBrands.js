import Link from "next/link"


const FeaturedBrands = ({ brands }) => {
    // console.log(brands)

    const categories = Object.keys(brands)
    return (
        <section>
            {/* <h2> Our brands </h2> */}

            <div>

                {categories.map((category) => {
                    const categoryBrands = brands[category]
                    return (
                        <div key={category} className="my-6 p-3 bg-white rounded-md">
                            <h3 className="font-bold text-2xl mb-2 text-primary-500"> {category} </h3>
                            <ul className="flex flex-row flex-wrap">
                                {
                                    categoryBrands.map((brand) => {
                                        return (
                                            <li key={brand._id} className="my-1 mx-2 ">
                                                <Link href={`/brand/${brand.url}`} className="shadow-sm hover:shadow-md transition-all duration-200 py-2 px-3 rounded-sm">
                                                    {brand.name}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                        </div>
                    )
                })}

            </div>
        </section>
    )
}

export default FeaturedBrands
