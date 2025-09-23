import { connectToDatabase } from '../../../util/db'

export default async (req, res) => {
    const { db } = await connectToDatabase()

    const products = await db
        .collection('products')
        .find({})
        .toArray()
    res.json(products)
}