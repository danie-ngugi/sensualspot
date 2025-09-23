import { formatDate, toCurrency } from "common/methods"


const OrderPreview = ({order}) => {

    return (
        <div className="w-full" >
            <div className="flex flex-row justify-between p-3 bg-gray-200 rounded-md">
               <div className="flex flex-col">
                    <span>Date</span>
                    <span>{ formatDate(new Date(order.placedOn))}</span>
               </div>

               <div className="flex flex-col">
                   <span>Order Number</span>
                   <span> {order.orderNumber} </span>
               </div>

               <div className="flex flex-col">
                   <span> Total </span>
                   <span> {toCurrency(order.subtotal)} </span>
               </div>


            </div>

            <div className="bg-gray-200 mt-4 p-2 rounded-md ">
                {order.cart.map((item, index) => {
                    return (
                        <div key={index} className="flex flex-col sm:flex-row text-sm py-2 px-3 justify-between">
                            
                            <span className="truncate flex flex-row gap-1"> 
                                <span className="flex font-semibold sm:hidden "> Product: </span>  <span>{item.productName}</span>
                            </span>

                          { item.variantName &&  <span className="truncate flex flex-row gap-1"> 
                                <span className="flex font-semibold sm:hidden "> Variant: </span>  <span>{item.variantName}</span>
                            </span>}

                            <span className="truncate flex flex-row gap-1"> 
                                <span className="flex font-semibold sm:hidden "> Quantity: </span>  <span>{item.quantity}</span>
                            </span>

                            <span className="truncate flex flex-row gap-1"> 
                                <span className="flex font-semibold sm:hidden "> Price: </span>  <span>{toCurrency(item.price)}</span>
                            </span>
                            
                        </div>
                    )
                })}
            </div>

            <div className="bg-gray-200 mt-4 p-2 rounded-md">
                <div className="flex flex-col">
                    <span> <b> Delivered to: </b> {order?.name} </span>
                    <span> <b>Email: </b> {order?.email} </span>
                    <span> <b> Location: </b> {order?.location} </span>
                </div>
            </div>

        </div>
    )
}

export default OrderPreview