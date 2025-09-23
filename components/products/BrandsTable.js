
import { computePriceRange, toCurrency } from 'common/methods'

const BrandsTable = ({products, brand }) => {

    return (
        <table id="price_table" className="prices_table">
          <caption className="capitalize-fist"> { brand} price in Kenya </caption>
          <thead>
            <tr>
              <th rowSpan="2"> Product Name </th>
              <th> Price </th>
              {/* <th>Category</th> */}
              <th>Availability </th>
            </tr>
          </thead>
    
          <tbody className="p-2">
            {
              products.map(product => {
                const prices = computePriceRange(product)
                return (
                  <tr key={product._id}>
                    <td className="capitalize-first"> {product.name} </td>
                    <td>  {prices.length > 1 ? `${toCurrency(prices[0])} - ${toCurrency(prices[1])}` : `${toCurrency(prices[0])}`}</td>
                    {/* <td> {product.categoryId} </td> */}
                    <td> {product.availability ? 'Available' : 'Out of stock' } </td>
                    
                  </tr>
                )
              })
            }
          </tbody>
    
          <style jsx>
            {`
            table {
                width: 100%;
                font-size: 13px;
                text-align: justify;
                padding: 10px;
            }
            table tr:nth-child(even) {
                background-color: #eee;
              }
            table tr:nth-child(odd) {
                background-color: #fff;
              }
            table td, table th {
                padding: 3px;
    
            }
              
          `}
          </style>
        </table>
      )
}


export default BrandsTable
