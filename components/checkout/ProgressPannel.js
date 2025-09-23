import Link from "next/link"
import { DoubleCheck } from "components/icons"

const ProgressPannel = ({ activeItem, done }) => {
    const isComplete = (position) => activeItem > position
    const isDone = done ?? false

    const generatedStyles = (position) => `p-2 rounded-full border ${ activeItem >= position ? 'border-green-600 bg-green-500 text-white' : 'border-gray-400 text-gray-400'} hidden lg:block h-10 w-10 text-center`
    return (
        <div className="flex w-full">
            <div className="flex flex-row justify-evenly rounded-md border border-gray-200 bg-white w-full overflow-hidden h-16 relative">

                <div className="grow flex flex-row justify-center items-center slanted-right relative">
                    <div className={generatedStyles(1)}>
                        {isComplete(1) ? <DoubleCheck style={{ fontWeight: 'bold' }} /> : '01' }
                    </div>
                    <div className=" text-base lg:text-lg  mx-2 lg:mx-4 ">
                       {isComplete(1) && !isDone ?
                        <Link href="/cart">
                            Shopping cart
                        </Link>
                        : 'Shopping cart'
                       }
                    </div>
                </div>

                <div className=" grow flex flex-row justify-center items-center slanted-right relative">
                    <div className={generatedStyles(2)}>
                        {isComplete(2) ? <DoubleCheck style={{ fontWeight: 'bold' }} /> : '02' }
                    </div>
                    <div className=" lg:text-lg mx-2 lg:mx-4 ">
                    {isComplete(2) && !isDone ?
                        <Link href="/checkout">
                            Checkout
                        </Link>
                        : 'Checkout'
                       }
                    </div>
                </div>
                <div className=" grow flex flex-row justify-center first-line: items-center relative">
                    <div className={generatedStyles(3)}>
                        {isComplete(3) ? <DoubleCheck style={{ fontWeight: 'bold' }} /> : '03' }
                    </div>
                    <div className=" lg:text-lg mx-2 lg:mx-4 ">Confirmation</div>
                </div>
            </div>
        </div>
    );
}

export default ProgressPannel