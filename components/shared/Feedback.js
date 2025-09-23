import { useState } from 'react';
import { useRouter } from 'next/router';


import StarRating from "./StarRating"
import { LoaderIcon } from 'components/icons'

const Feedback = ({ handleSubmit, loading, title }) => {
    const router = useRouter()
    
    const [comments, setComments] = useState('')
    const [rating, setRating] = useState(1)

    const heading = title || 'Rate your shopping experience'

    const { id } = router.query;

    const submit = async () => {
       try {
         const postData = { comments, rating, orderId: id }
         handleSubmit(postData)
       } catch (err) {
           console.log(err.message)
       }
    }

    return (
        <div className="w-full flex flex-col ">
             <div className="mb-2 text-center font-semibold text-lg"> {heading} </div>

            <div>
                <StarRating setRating={setRating} />
            </div>

            <div className="w-full mt-1">
                <label htmlFor="comments" className="pb-1 inline-block">Comments</label>
                <textarea rows={4} onChange={(e) => setComments(e.target.value)} id="comments" className="w-full simple-input" placeholder="Your comments" />
            </div>

            <div className="text-right mt-3 p-1 mb-2">
                {loading ?
                    ( <span className=" space-x-2 btn cursor-pointer select-none flat-btn  bg-neutral-900 text-white"> <LoaderIcon /> <span>Loading</span> </span>) : 
                    ( <span onClick={submit} className="btn cursor-pointer select-none flat-btn  bg-neutral-900 text-white">Submit</span>)
                }
               
            </div>
        </div>
    )
}

export default Feedback
