import Document, { Html, Head, Main, NextScript } from 'next/document'
// import FavIcon from '../assets/image/favicon.png'

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,400&display=swap" rel="stylesheet" /> */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        </Head>
        <body className="bg-[#ECEFF1]">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
