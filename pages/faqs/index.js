import Head from "next/head"
import { business } from "../../common/data"
import { renderText } from "../../common/methods"
import { connectToDatabase } from "../../util/db"



const FAQs = ({ faqs, meta }) => {

    // console.log(faqs, meta)

    return (
        <div className="mx-auto py-12 px-6">
            <Head>
                <title>{meta.metaTitle}</title>
                <meta name="description" content={meta.description} />
            </Head>

            <h1 className="font-bold text-4xl"> {meta.h1} </h1>

            <section className="my-12 p-6 bg-white rounded-sm flex flex-col gap-8">
                {faqs.map((faq) => {
                    return (
                        <details key={faq._id}>
                            <summary className="cursor-pointer font-medium "> {faq.question} </summary>
                            <div className="py-2">
                                {renderText(faq.answer)}
                            </div>
                        </details>
                    )
                })}
            </section>

        </div>
    )

}

export async function getStaticProps() {
    try {
        const { db } = await connectToDatabase()

        const metaPromise =  db.collection('pagedatas').findOne({ url: '/faqs'})
        const faqsPromise =  db.collection('faqs').find({}).toArray()

        let [ meta, faqs] = await Promise.all([
            metaPromise,
            faqsPromise
        ])

        if (!meta) {
            meta = {
                title: `${business.productTypes} shopping FAQs - ${business.name}`,
                description: `${business.productTypes} frequently asked questions - ${business.name}`,
                h1: `${business.name} FAQs`
            }
        }

        return {
            props: {
                meta: JSON.parse(JSON.stringify(meta)),
                faqs: JSON.parse(JSON.stringify(faqs)),
            }
        }
    } catch (err) {
        return {
            props: {
                page: null
            }
        }
    }
} 



export default FAQs