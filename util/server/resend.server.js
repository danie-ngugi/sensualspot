
import { business, domain } from 'common/data'
import { Resend } from 'resend'
import { v4 as uuid } from 'uuid'

const { RESEND_API_KEY } = process.env

const resend = new Resend(RESEND_API_KEY)



export const handleSendEmail = ({
  to,
  subject,
  message
}) => {
  // "Acme <onboarding@resend.dev>"
//   console.log(to, subject)
  return resend.emails
    .send({
      from: `${business.name} <info@${domain}>`,
      to: to,
      subject: subject,
      html: message,
      reply_to: `info@${domain}`,
      headers: {
        'X-Entity-Ref-ID': uuid()
      }
    })
    .then((a) => console.log(a))
    .catch((err) => console.log(err))
}
