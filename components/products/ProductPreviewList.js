
import ProductPreview from './ProductPreview'

const ProductPreviewList = ({ products, sm, xl, hasSidbar = false }) => {
    const _sm = sm || 5
    const _xl = xl || 6

    if (!products) {
        return null
    }

    return (
        <ul className={`grid grid-cols-2 sm:grid-cols-${_sm} lg:grid-cols-${_sm} xl:grid-cols-${hasSidbar ? 3 : 5 } gap-3 relative`}>
            {products?.map((product) => <ProductPreview key={product?._id} product={ product ? JSON.parse(JSON.stringify(product)) : {}} />)}
        </ul>
    )
}

export default ProductPreviewList
