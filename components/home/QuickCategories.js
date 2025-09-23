import { useRouter } from "next/router"
const categories = [
    { name: 'Men Watches', url: '/watches/men-watches', imageUrl: '/men-watches.jpg' },
    { name: 'Ladies Watches', url: '/watches/women-watches', imageUrl: '/women-watches.jpg' },
    { name: 'Smart Watches', url: '/watches/smart-watches', imageUrl: '/smart-watches.jpg' },
    { name: 'Belts & Wallets', url: '/wallets-belts', imageUrl: '/wallets-belts.jpg' },
]

const QuickCategories = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4">
            { categories.map((category) => {
                return (
                    <div 
                    onClick={() => router.push(category.url)}
                    key={category.url}
                    className="flex flex-col rounded-md items-center justify-center h-72 w-full  bg-cover bg-no-repeat cursor-pointer"
                    style={{ backgroundImage: `url(${category.imageUrl})` }}>
                        <div className="w-full h-full flex flex-col p-3 items-center justify-center  rounded-md bg-black bg-opacity-60">
                            <span className="text-3xl font-bold tracking-wide text-gray-200">{category.name}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )

}

export default QuickCategories