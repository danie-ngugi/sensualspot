import { format } from 'date-fns';

import { connectToDatabase } from '../../../util/db'

export default async (req, res) => {
    try {
        const { db } = await connectToDatabase()

        const { code } = req.query;

        console.log(code, 'is the sent code')

        const now = new Date();

        let isExpired = true;
    
        const discountCode = await db.collection('dicountcodes').findOne({ code })

        if (discountCode) {
            isExpired = now > new Date(discountCode.endDate) 
        }


        res.json({ state: true, code: discountCode, isExpired })
    } catch (err) {
        console.log(err)
        res.json({ state: false, msg: 'Server error: Invalid data' })
    }
}