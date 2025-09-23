import { connectToDatabase } from '../../../util/db'

export default async (req, res) => {
    const { db } = await connectToDatabase()
    const { url } = req.query

    const products = await db
        .collection('products')
        .findOne({ url })

    res.json(products)
}