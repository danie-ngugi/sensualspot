
import { useContext } from 'react'
import { toCurrency } from 'common/methods'
import NoSsr from 'components/shared/NoSsr'

import { DiscountContext } from 'context/DiscountContext'

const BasketDetails = ({ shipment, subtotal }) => {
    const { discount } = useContext(DiscountContext)

    const cost = shipment || 0

    const discountValue = () => {
        if (!discount)  return 0;
        if (discount.percentage) {
            return Math.floor((subtotal/ 100) * discount.value)
        }
        return discount.value;
    }

    const computedTotal = (cost + subtotal) - discountValue()

    return (<div className="p-3 bg-white rounded-sm flex flex-row">
        <div className="flex flex-col flex-1">
            <dl>
                <dt className=" font-medium">Products subtotal</dt>
                <NoSsr>
                    <dd className="text-sm"> {toCurrency(subtotal)} </dd>
                </NoSsr>

                <dt className="mt-3 font-medium">Discount</dt>
                <NoSsr>
                    <dd className="text-sm">
                        {toCurrency(discountValue())}
                       {discount &&  (<>
                        <br/>
                        <i className="text-xs text-red-400"> Discount code <b> <u> {discount.code}</u> </b> ({discount.title})</i>
                       </>)}
                    </dd>
                </NoSsr>
                
                <dt className="mt-3 font-medium">Delivery cost</dt>
                <dd className="text-sm"> {toCurrency(cost)} </dd>

                <dt className="mt-3 font-medium">Total cost</dt>
                <NoSsr> 
                    <dd className="text-sm underline underline-offset-1 decoration-violet-600"> {toCurrency(computedTotal)} </dd>
                </NoSsr>
            </dl>
        </div>
        <div className="flex-1 flex flex-col">

            <h2>Payment methods</h2>
            <ul className="list-disc list-inside text-sm mt-2 ml-2">
                <li className="">Cash on delivery (Nairobi delivery)</li>
                <li>Mpesa on Delivery (Outside Nairobi delivery) </li>
                {/* <li>Credit card (+2.9%)</li>
                <li>Paypal</li> */}
            </ul>
        </div>
    </div>)
}

export default BasketDetails
