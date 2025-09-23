import { useState } from "react"
import { useRouter
 } from "next/router"
import Feedback from "components/shared/Feedback"

import { useToasts } from 'react-toast-notifications'

const FeedbackPage = () => {
    const [loading, setLoading] = useState(false)


    const router = useRouter()

    const handleSubmit = async (postData) => {
        try {

        } catch (err) {

        }
    }
    return (
        <div className="container p-5 h-screen items-center flex flex-col">
            <div className="bg-white p-2 mt-16 rounded-lg w-full sm:w-3/5 md:w-3/5 flex flex-col items-center">
                <Feedback handleSubmit={handleSubmit} loading={loading} title="Leave us a feedback" />
            </div>
        </div>
    )
}

export default FeedbackPage