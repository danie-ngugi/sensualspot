import { connectToDatabase, ObjectId } from '../../../../util/db'

const toJson = a => JSON.parse(JSON.stringify(a))

export default async (req, res) => {
    const { db } = await connectToDatabase()
    const { phrase } = req.query

    try {
      const products = await db
        .collection('products')
        .find({ name: new RegExp(phrase, 'i') })
        .toArray()
    
      const customResults = await metaSearch(phrase, db)

      res.json({ products: toJson(products), custom: customResults, state: true })
    } catch(err) {
      res.json({ msg: err.message, state: false })
    }
}


export async function metaSearch (keyword, db) {
    let brands = []
    //  let _subcategories = []
    let categories = []
    let subcategories = []
    const searchPhrase = new RegExp(keyword, 'i');
    try {
      // search category, subcategory & brand
      const _brands = await db.collection('brands').find({ 'name': searchPhrase  }).limit(6).toArray()
      const _categories = await db.collection('categories').find({ name: searchPhrase }).limit(6).toArray()
      const _subcategories = await db.collection('subcategories').find({ name: searchPhrase }).limit(6).toArray()

      if (_brands.length >= 1) {
        brands = await makeBrandsSchema(toJson(_brands))
      }

      if (_categories.length >= 1) {
        categories = await makeCategorySchema(toJson(_categories))
      }

      if (_subcategories.length >= 1) {
        subcategories = await makeSubcategorySchema(toJson(_subcategories), db)
      }
  
      const results = [ ...brands, ...categories, ...subcategories ]
      //   console.log('results ->', results)
      return results
    } catch (err) {
      throw err
    }
  }

export async function makeBrandsSchema (brandsItems) {
    const items = brandsItems.map((item) => { return { _id: item._id, name: item.name, type: 'brand', url: `/brand/${item.url}` } })
    return items
}

export async function makeCategorySchema (categories) {
    const items = categories.map((item) => { return { _id: item._id, name: item.name, type: 'category', url: `/${item.url}` } })
    return items
}

export async function makeSubcategorySchema (subcategories, db) {
  let items = []
  let categories = []

  for (const subcategory of subcategories) {
    const _category = categories.find((c) => {
      const a = JSON.stringify(subcategory.categoryId)
      const b = JSON.stringify(c._id)
      return a == b
    })
    if (_category) {
      // category data available
     items = [ ...items, { _id: subcategory._id, name: subcategory.name, type: 'category', url: `/${_category.url}/${subcategory.url}` } ] 
    } else {
      //  console.log('subcategory.categoryId', subcategory.categoryId)
      const newCat = await db.collection('categories').findOne({ _id: ObjectId(subcategory.categoryId) })
      categories = [ ...categories, newCat]
      items = [ ...items, { _id: subcategory._id, name: subcategory.name, type: 'category', url: `/${newCat.url}/${subcategory.url}` } ]
    }
  }
    
    return items
}