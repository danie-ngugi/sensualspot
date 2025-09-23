import { connectToDatabase } from '../../../util/db'

export const queryCategories = async () => {

    try {
        const { db } = await connectToDatabase()

        //  featured products
        //  brands
        //  categories
        //  seo content
    
        const categories = await db
            .collection('categories')
            .find({}, { _id: 1, name: 1, metaDescription: 0, metaTitle:0, description: 0, h1: 0  })
            .sort({ priority: -1 })
            .toArray()
            
        const subcategories = await db
            .collection('subcategories')
            .find({})
            .toArray()


        const types = await db
            .collection('producttypes')
            .find({}, { _id: 1, name: 1, url: 1  })
            .toArray()


        

        // const featuredSubcategories = await db
        //     .collection('subcategories')
        //     .find({ isPrimary: true })
        //     .toArray()

            const featuredSubcategories = await db.collection('subcategories').aggregate(
                [
                    { $match: { isPrimary: true } },
                    {
                        $lookup: {
                            from: "categories",
                            localField: "categoryId",    // field in the orders collection
                            foreignField: "_id",  // field in the items collection
                            as: "category"
                         },
                         
                    },
                ]).toArray()
         
            const menu = categories.map((category) => {
                const _subs = subcategories ?? []
                const _subcategories = _subs.filter(subcategory => JSON.stringify(subcategory.categoryId) === JSON.stringify(category._id))
                return { category, subcategories: _subcategories }
            })

            return {
                subcategories: JSON.parse(JSON.stringify(subcategories)), 
                categories: JSON.parse(JSON.stringify(categories)) ,
                menu: JSON.parse(JSON.stringify(menu)),
                featuredSubcategories: JSON.parse(JSON.stringify(featuredSubcategories)),
                types: JSON.parse(JSON.stringify(types))

            }

    } catch (err) {
        // throw(new Error(err))
        console.log(err)
        return {
            subcategories: [], 
                categories: [],
                menu: [],
                featuredSubcategories: [],
                types: []
        }
    }

}

export default async (req, res) => {
   

    //  console.log(subcategories, 'categories')

    const { subcategories, categories, menu, featuredSubcategories, types } = await queryCategories()

    // console.log('featuredSubcategories =====> ', featuredSubcategories)

    res.json({ 
        state: true, 
        subcategories: JSON.parse(JSON.stringify(subcategories)), 
        categories: JSON.parse(JSON.stringify(categories)) ,
        menu: JSON.parse(JSON.stringify(menu)),
        featuredSubcategories: JSON.parse(JSON.stringify(featuredSubcategories)),
        types: JSON.parse(JSON.stringify(types)),
    })
}
