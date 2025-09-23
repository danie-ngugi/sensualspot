
import { business
 } from "common/data"
const HowToPay = ({ method }) => {
    return (
        <section className="prose">
            <h2>How to pay (M-Pesa)</h2>
            <div>
                <ul>
                    <li> Go to M-Pesa</li>
                    <li> Select Lipa na M-Pesa</li>
                    <li> Select <span className="text-green-600 font-bold">buy goods</span> option</li>
                    <li> Enter till Number {business.till}</li>
                    <li> Enter Amount</li>  
                    <li> Enter your pin and confirm the details to complete the process</li>
                </ul>
            </div>
        </section>
    )
}

export default HowToPay