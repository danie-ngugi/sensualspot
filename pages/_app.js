

import '../styles/index.css'
// import Nav from '../components/nav'
import Footer from 'components/Footer'
import dynamic from 'next/dynamic'
import Head from 'next/head'
//  import useSWR, { SWRConfig } from 'swr'
import { useRouter } from 'next/router'

// import { connectToDatabase } from 'util/db'

import { Open_Sans } from '@next/font/google'

import NoSsr from 'components/shared/NoSsr'


import { ToastProvider } from 'react-toast-notifications';
//  import { Snack } from '../snackbar';

import { CartContextProvider } from '../context/CartContext'
import { FavoriteContextProvider } from '../context/FavoriteContext'
import { DiscountContextProvider } from 'context/DiscountContext';
import { SearchContextProvider } from 'context/SearchContext'
import { WhatsAppContextProvider } from 'context/WhatsAppContext'
import { CategoryContextProvider } from 'context/CategoriesContext'

// import MobileActions from '../components/shared/MobileActions'
// import BottomNav from 'components/BottomNav'
import GlobalNav from 'components/NewNav'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import "nprogress/nprogress.css";


import SearchModal from 'components/shared/SearchModal'
import WhatsAppModal from 'components/shared/WhatsAppModal'
import CartDialog from 'components/shared/CartModal'

import AgeGate from '../components/shared/AgeGate'


import { WhatsAppIcon, CallIcon, EmailIcon } from '../components/icons'
// import { CallIcon } from '../components/icons'

import { host } from 'common/data'
import { business } from '../common/data'

const TopProgressBar = dynamic(
  () => {
    return import("../components/shared/TopProgressBar");
  },
  { ssr: false },
);

const openSans = Open_Sans({ subsets: ['latin'] })


function MyApp({ Component, pageProps, menu, subs, types }) {

  const router = useRouter()

  const pathName = router.pathname;

  const isLandingPage = pathName.includes('/buy')

  


  return (

    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={6000}
        placement="bottom-right"
      >
       <CategoryContextProvider menu={menu} subs={subs}>
          <FavoriteContextProvider>
            <CartContextProvider cart={[]}>
              <DiscountContextProvider>
                <SearchContextProvider>
                  <WhatsAppContextProvider>

                    <SearchModal />
                    <WhatsAppModal />
                    <CartDialog />
                    <NoSsr>
                      <AgeGate />
                    </NoSsr>
                    <TopProgressBar />
                    <div className="flex flex-col min-h-screen dark:bg-true-gray-700">
                      <main className={`flex-grow ${openSans.className}`}>
                        { isLandingPage ? null : <GlobalNav menu={menu} subs={subs} /> }

                        <div className={`min-h-4 ${isLandingPage ? '' : 'mt-24 sm:mt-28'}  bg-gray-400`}></div>
                        <div className="max-w-screen-2xl mx-auto">
                          <Component {...pageProps} />
                        </div>

                        <div className="fixed bottom-12 right-6 sm:right-10 z-50 flex flex-col space-y-6">
                          
                          {/* <a href={`mailto:${business.email}`} className="bg-white aspect-square rounded-full shadow-md flex flex-row items-center justify-center w-12 text-red-500 hover:text-red-600"> 
                            <EmailIcon />
                          </a> */}

                          <a href={`https://wa.me/${business.whatsAppPhone}`} className="bg-white aspect-square rounded-full shadow-md flex flex-row items-center justify-center w-12 text-teal-500"> 
                            <WhatsAppIcon />
                          </a>
  
                          <a href={`tel://${business.phone}`} className="bg-primary-1 aspect-square text-white rounded-full shadow-md flex flex-row items-center justify-center w-12"> 
                            <CallIcon />
                           </a>
                        </div>
                        
                      </main>
                     
                    { isLandingPage ? null :  <Footer menu={menu} types={types} /> }
    
                    </div>

                  </WhatsAppContextProvider>
                </SearchContextProvider>
              </DiscountContextProvider>
            </CartContextProvider>
          </FavoriteContextProvider>
      </CategoryContextProvider>
      </ToastProvider>
      <style jsx global>{`
        html, main {
          font-family: ${openSans.style.fontFamily};
        }
      `}</style>
      </>
  )
}

MyApp.getInitialProps = async (context) => {
 

  try {
    const response = await fetch(`${host}/api/categories`)

    const data = await response.json()

    let menu = []
    let subs = []
    let types = []
    if (data.state) {
      menu = data.menu
      subs = data.featuredSubcategories
      types = data.types

    } else {
      menu = []
    }


    return { menu, subs, types }
  } catch (err) {
    // console.log(err)
    return { menu: [], subs: [], types: [] }
  }
}

export default MyApp
