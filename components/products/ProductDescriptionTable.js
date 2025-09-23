import { toCurrency } from 'common/methods'

const ProductDescriptionTable = ({ product }) => {
  const variants = product.variants || []
  const options = variants.map(variant => {
    return variant.title
  }).join(' - ')
  const variantPrices = variants.filter((variant) => {
    if (variant.priceEffect && variant.price > 1) {
      return true;
    } else { return false; }
  })

  return (
    <div className="p-2 text-left">
      <table className="table-auto">
        
        <tbody>
          <tr>
            <th>Product Name</th>
            <td className="capitalize"> {product.name} </td>
          </tr>

         {variants.length >= 1 && <tr>
            <th>Options</th>
            <td> {options} </td>
          </tr>}
          <tr>
            <th>Price</th>
            <td>
              {variantPrices.length >= 1 ? variantPrices.map(variant => {
                return (<li key={variant.title}>
                  {variant.title} @ {variant.priceEffect ? `${toCurrency(variant.price)}` : `${product.price}` }
                </li>)
              }) : toCurrency(product.price)}
            </td>
          </tr>
         {product.country && <tr>
            <th>Country of origin</th>
            <td> { product.country } </td>
          </tr>}

          {
            product.brand && product.brand !== 'undefined' && typeof (product.brand) !== 'undefined'
              ? <tr>
                <th>Brand</th>
                <td> { product.brand.name } </td>
              </tr>
              : null
          }

          {/* <tr>
            <th>Condition</th>
            <td> { product.condition } </td>
          </tr> */}

          <tr>
            <th>Availability</th>
            <td>
              {
                product.availability ? <span>In Stock</span> : <span>Out of Stock</span>
              }
            </td>
          </tr>

          <tr>
            <th>Shipment</th>
            <td> Free </td>
          </tr>
        </tbody>
        <caption className=" text-gray-400 text-xs rounded-sm"> {product.name} price in Kenya </caption>
      </table>
      <style jsx>
        {`
          table{
            width:100%;
            font-size: 14px;
            caption-side: bottom;
          }
          tr {
            padding: 6px;
          }
          li {
            list-style: none;
          }
          caption {
            text-align:right;
        }
        `}
      </style>
    </div>
  )
}

export default ProductDescriptionTable
