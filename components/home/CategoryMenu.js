import Link from "next/link"




export function CategoryMenu ({ categories }) {
    return (
        <ul className="my-3 gap-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
            {categories.map(category => {
                // console.log(category, 'cat')
                return <li className="flex flex-col" key={category.url}>
                    <div>
                        <Link href={category.url}>
                            <img className="object-cover rounded-md" src={category.image} />
                        </Link>
                    </div>
                    <div className="mt-2 w-full text-center font-bold">
                       <Link href={category.url}> {category.name} </Link>
                    </div>
                </li>
            })}
        </ul>
    )
}