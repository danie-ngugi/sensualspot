import { format } from 'date-fns';

import { connectToDatabase, ObjectId } from '../../../util/db'

export default async (req, res) => {
    try {
        const { db } = await connectToDatabase()

        const data = req.body;
        const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS");
    
        await db.collection('feedback').insertOne({
          ...data,
          orderId: ObjectId(data?.orderId),
          createdAt: now
        })

        res.json({ state: true })
    } catch (err) {
        console.log(err)
        res.json({ state: false, msg: 'Server error: Invalid data' })
    }
}