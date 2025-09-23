export default async function handleWebhook(req, res) {
    try {
        const { pages } = req.query
        //  console.log('revalidating  ===>', page)

        if (!pages) {
            throw(new Error('Invalid pages'))
        }
        const promises = pages.split('__').filter((p) => p !== '').map((p) => res.unstable_revalidate(p))

       // await res.unstable_revalidate(page);
       await Promise.all(promises)
        res.send({ revalidated: true })
    } catch (err) {
        res.send({ error: err.message })
    }
}