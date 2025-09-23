import { connectToDatabase } from '../../../util/db'
const sgMail = require('@sendgrid/mail')
import { format } from 'date-fns';
import styles from '../../../util/mailStyles';
//  import axios from 'axios';
import fetch from 'node-fetch';

import { business, siteUrl } from 'common/data';
import { formatDate } from 'common/methods'
import { formatCurrency } from '../../../common/methods';
import { handleSendEmail } from 'util/server/resend.server';


const { SENDGRID_API_KEY, LAXER_KEY, LAXER_SECRET, LAXER_URL, SALES_EMAIL } = process.env

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendMail = async ({ to, from, subject, text, html }) => {

    const msg = {
      to,
      from: {
        name: business.name,
        email: from
      },
      subject,
      text,
      html,
    }

    await sgMail.send(msg)
    //  console.log('Email sent')
      
    // .then(() => {
    //     console.log('Email sent');
    //   })
    //   .catch((error) => {
    //     console.error(error, 'SendGrid error')
    //   })

}


export default async (req, res) => {
  try {

    const { db } = await connectToDatabase()

    const orderData = req.body;
    const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS");
    // const createdAt = new Date(now)
    // console.log('now', now, createdAt, new Date())
    const orderCount = await db.collection('orders').countDocuments()
    //  console.log(orderCount)
    const { ops } = await db.collection('orders').insertOne({
      ...orderData,
      placedOn: now,
      createdAt: new Date(),
      orderNumber: orderCount + 1,
      pending: true,
      rejected: false,
      handled: false,
      approved: false,
      confirmed: false,
      canceled: false,
      delivered: false,
      status: 'pending',
      scheduled: false,
      paymentMethod: orderData.paymentMethod || 'Not specified'
    })

    const order = ops[0]

    const productString = order.cart.map((item) => {
        const price = item?.variant?.price && item?.variant?.price > 0 ? item?.variant?.price : item?.price

        console.log(price, ' <===== price')
  
        return `<tr>
                  <td> <a href="${siteUrl}/product/${item.url}"> ${item.productName}  </a></td>
                  <td> ${item.quantity} </td>
                  <td>${item.variantName}</td>
                  <td>${item.color}</td>
                  <td>${formatCurrency(Number(price))}</td>
                  <td> ${formatCurrency(Number(item.quantity) * Number(price))} </td>
                </tr>`
      }).join(' ')

      const discountString =  order.discount ? `<p><b>Discount:</b> ${order?.discount}</p> <p> <b>Discount code: </b> ${order?.discountCode}</p>` : '';

      const discountRow = order.discount ? `
        <tr>
        <td> </td>
        <td></td>
        <td></td>
        <td>Discount</td>
        <td> ${order.discount} </td>
        </tr>
      ` : ''

      let tableString = `
      <table style="width:100%">
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Option</th>
            <th>Color</th>
            <th>price</th>
            <th>Total</th>
          </tr>
          ${productString}
          ${discountRow}

          <tr>
          <td> </td>
          <td></td>
          <td></td>
          <td>Total</td>
          <td> ${order.subtotal} </td>
          </tr>
        </table>
      `
     
      const locationName = order?.location
      const emailDetails = order.email ? `<b>Client email: </b>  ${order.email}` : ''
      // add location url, order number, state the user is registered, locationId, house, road,
      const detailsString = `
      ${discountString}
     
     
      <p><b>Phone: </b> <a href="tel:${order.phone}">${order.phone}</a> </p>
      ${emailDetails} 
      <p><b>Road: </b> ${order?.road}.</p>
      <p><b>Location: </b> ${locationName} </p>
      <p> <b>Medium:</b> Web </p>
      `



    let content = `<html>
      <head> ${styles} </head>

        <body>

        <p> New order from ${order.name} (<a href="tel:${order.phone}">${order.phone}</a>) amounting to  ${formatCurrency(order.subtotal)}.</p>
        <br />
        <p> [order #${order.orderNumber}] <b> (${formatDate(new Date(order.placedOn))}) </b> </p>

        ${tableString} 

        
        <div style='padding: 8px; border: 2px solid #eceff1; margin: 4px; margin-top: 20px;'>
          <h2 style='color: #1a579f; '>Billing address </h2>
          ${detailsString} 
          <br> Instructions: ${order.instructions}. <br> Placed on ${new Date()}
        </div>

        </body>
      </html>
    `

    const subject = 'New Order #' + order.orderNumber

  //  const SALES_EMAIL = business.salesEmail;
    const to = business.email;



    const url = `${LAXER_URL}/api/p1/order/${LAXER_KEY}`

    // const config = {
    //   headers: {
    //     'x-access-token': LAXER_SECRET
    //   }
    // }

    //  const mailData = { to, from: SALES_EMAIL, subject, text: content, html: content }
    // await axios.post('https://mailer.dialadelivery.co.ke/zone-order', mailData)
   await Promise.all([
    handleSendEmail({
      to: [business.gmail, 'dallenkeems@gmail.com'],
      subject,
      message: content
    }),
      // sendMail({ to: business.gmail, from: SALES_EMAIL, subject, text: business.name, html: content }),
   ])
    // .catch((err) => {
    //   console.log("Failed to mail order [mailer.dial]", err.message)
    // })

   

  if (orderData.sendInvoice && null) {
  
    //  console.log('Request email');
    const laxerData = {
      email: order.email,
      phone: order.phone,
      location: order?.location,
      name: order.name,
      products: order.cart
    }
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(laxerData),
      headers: { 'x-access-token': LAXER_SECRET, 'Content-Type': 'application/json' }
    })
    // .then((response) => response.json())
    // .then((data) => console.log(data, 'lx response'))
    // .catch((err) => console.log(err.message))
  
    // axios.post(url, laxerData, config)
    // .then(({ data}) => {
    //   console.log(data, 'res data')
    // }).catch((err) => {
    //   console.log(err.message, 'res err')
    // })

  }
    
    res.json({ state: true, order })

  } catch (err) {
    console.log(err.message, 'Catch error')
    res.json({ state: false, msg: err.message, order: {} })
  }
}
