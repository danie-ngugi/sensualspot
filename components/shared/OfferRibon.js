const OfferRibon = () => {
    
    // return (
    //     <div className="w-26 aspect-square absolute -top-2 -right-2 overflow-hidden rounded-sm">
    //         <div className="absolute top-0 left-0 bg-amber-500 h-2 w-2"></div>
    //         <div className="absolute bottom-0 right-0 bg-amber-500 h-2 w-2"></div>
    //         <a
    //             href="/"
    //             className="py-1.5 bg-amber-300 text-amber-800 font-semibold uppercase text-xs tracking-wider block w-square-diagonal text-center absolute bottom-0 right-0 rotate-45 origin-bottom-right shadow-sm hover:bg-yellow-300"
    //         >
    //            On offer
    //         </a>
    //     </div>
    // )

    return (
        <div className="w-24 aspect-square absolute -top-2 -right-2 overflow-hidden rounded-sm">
            <div className="absolute top-0 left-0 bg-red-500 h-2 w-2"></div>
            <div className="absolute bottom-0 right-0 bg-red-500 h-2 w-2"></div>
            <span
                href="/"
                className="py-1.5 bg-red-400 text-red-800 font-semibold uppercase text-xs tracking-wider block w-square-diagonal text-center absolute bottom-0 right-0 rotate-45 origin-bottom-right shadow-sm hover:bg-red-300"
            >
                On offer
            </span>
        </div>
    )
}

export default OfferRibon