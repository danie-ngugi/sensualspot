import { renderText } from "../../common/methods"
import StarRating from "../shared/StarRating"


const ProductReviews = ({ reviews, product, averageRating }) => {
    return (

        
            <section className="bg-white mt-12 p-4 mb-2 rounded-sm">

                <h2 className=" first-letter:capitalize text-2xl font-bold text-gray-700 mb-4 "> {product.name} reviews </h2>

                <div>
                    <div className="rounded-md border border-gray-200 w-min py-2 px-4 justify-center flex flex-col items-center">
                        <div className="flex flex-row mb-2 items-end gap-1 ">
                            <span className="text-4xl font-extrabold text-gray-700"> {averageRating.rating.toFixed(1)}</span>
                            <span className="text-base text-gray-700 font-semibold tracking-wider"> /5 </span>
                        </div>

                        <div>
                            <StarRating setRating={() => {}} inActive={true} sm={false} initialValue={averageRating.rating}/>
                        </div>
                    </div>

                    <div className="bg-white"> 
                        
                        {reviews.map((review) => {
                            return (
                                <div
                                    key={review._id}
                                    id={review._id} 
                                    className="flex flex-col bg-gray-50 rounded-md border border-gray-200 my-6 p-2"
                                    >

                                    <div className="flex flex-row justify-between items-center">
                                        <span className="font-semibold">By: {review?.name} </span>
                                        <div className="text-green-600 text-sm font-semibold flex flex-row items-center gap-1"> 
                                       
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                        </svg>
                                        <span>Verified purchase  </span>
                                        
                                        </div>
                                    </div>

                                    <div>
                                        <div className="px-2 py-1 rounded-md border border-gray-100 flex flex-row text-sm items-center gap-1 w-min">
                                            <div className="font-semibold"> {review?.rating ?? 1} </div>
                                            <StarRating setRating={() => {}} inActive={true} sm={true} initialValue={review?.rating ?? 1}/>
                                            
                                        </div>
                                    </div>

                                    <div className=" mt-4">
                                        {renderText(review?.comment ?? '')}
                                    </div>

                                </div>
                            )
                        })}

                    </div>
                </div>

            </section>
    )
}

export default ProductReviews