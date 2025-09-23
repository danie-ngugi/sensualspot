const BestDealRibon = () => {
    return (
        <div className="w-24 aspect-square absolute -top-2 -right-2 overflow-hidden rounded-sm">
            <div className="absolute top-0 left-0 bg-green-500 h-2 w-2"></div>
            <div className="absolute bottom-0 right-0 bg-green-500 h-2 w-2"></div>
            <span
                className="py-1.5 bg-green-300 text-green-800 font-semibold uppercase text-xs tracking-wider block w-square-diagonal text-center absolute bottom-0 right-0 rotate-45 origin-bottom-right shadow-sm hover:bg-green-300"
            >
               Best deal
            </span>
        </div>
    )
}

export default BestDealRibon