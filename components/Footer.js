import Link from 'next/link'
import { business } from 'common/data'

// import { categories } from 'common/data'

import SocialMediaSection from './shared/SocialMediaSection'
import { quickLinks } from '../common/data';

const Footer = ({ menu, types }) => {

  return <>
 
    <footer className="mt-10 text-gray-300 bg-zinc-800 dark:bg-true-gray-800 dark:text-white min-h-44">
      <section className=" 2xl:max-w-7xl 3xl:max-w-7xl mx-auto">

        <SocialMediaSection />
        <div className="  flex flex-col gap-3 p-4 sm:flex-row justify-around ">

          <div className="flex-1 mt-4 sm:mt-0">
            <h3 className="font-semibold text-lg mb-1 text-white ">Contact us</h3>

            <div className="mt-3 flex flex-col text-base gap-1">
              <div className="mb-1"> {business.phone} </div>
              <div className="mb-1">{business.email} </div>
              <div className="mb-1"> {business.location} </div>
              <div className="mb-1">  {business.hours}  </div>
            </div>
          </div>


          <div className="flex-1 mt-4 sm:mt-0">
            <h3 className="font-semibold text-lg mb-1 text-white">About us</h3>

            <div className="mt-3 flex flex-col text-base gap-1">
              <div className="mb-1">
              
                <Link href="/shipping-policy" className='text-white hover:text-primary-50'>
                  Shipping policy
                </Link>
              </div>
              <div className="mb-1">
                <Link href="/terms" className='text-white hover:text-primary-50'>
                  Terms & conditions
                </Link>
              </div>
              <div className="mb-1">
                <Link href="/contact-us" className='text-white hover:text-primary-50'>
                  Contact us
                </Link>
              </div>
              <div className="mb-1">
                <Link href="/about" className="text-gray-300 hover:text-primary-50">
                      About us 
                </Link>
              </div>
              <div className="mb-1">
                <Link href="/faqs" className="text-gray-300 hover:text-primary-50">
                      FAQs
                </Link>
              </div>
              <div className="mb-1">
                <Link href="/collections" className="text-gray-300 hover:text-primary-50">
                      Collections
                </Link>
              </div>

            </div>
          </div>

          <div className="flex-1 mt-4 sm:mt-0">
            <h3 className="font-semibold text-lg mb-1 text-white">Quick Links</h3>

            <ul className="mt-3 flex flex-col text-base gap-1">
              
              {quickLinks?.map((link) => {
                return (
                  <li  key={link.url}>
                      <Link href={link.url} className='text-white hover:text-primary-50 w-min'>
                        {link.page}
                      </Link>
                  </li>
                )
              })}
              </ul>
              
            

          </div>

          <div className="flex-1 mt-4 sm:mt-0">
            <h3 className="font-semibold text-lg mb-1 text-white"> Categories </h3>
            <div className="grid grid-cols-2">
              {menu?.map(({category}) => {
                return (
                  <div className="mb-1" key={category.url}>
                    <Link href={`/${category.url}`} className="text-gray-300 hover:text-primary-50 w-min">
                      {category.name} 
                    </Link>
                  </div>
                );
              })}

              {
                types?.map((type) => {
                  return (
                    <div className="mb-1" key={type.url}>
                      <Link href={`/category/${type.url}`} className="text-gray-300 hover:text-primary-50">
                        {type.name} 
                      </Link>
                  </div>
                  )
                })
              }
            </div>
          </div>

      

        </div>
        <section className="flex flex-row mt-6 px-3">
          {/* <div cl> */}
            <div className=" gap-4 flex flex-col w-full ">
              <h3 className="font-semibold text-lg mb-1 text-white"> Payment methods </h3>
              
              <div className="flex flex-col sm:flex-row w-full sm:items-center gap-4">

                <div className=" flex flex-row items-center flex-wrap gap-4 justify-between px-3">

                  <img className="w-14 rounded-sm" src="/icons/cash.webp" />
                  <img className="w-14 rounded-sm" src="/icons/visa.webp" />
                  <img className="w-14 rounded-sm" src="/icons/mastercard.webp" />
                  {/* <img className="w-14 rounded-sm" src="/icons/paypal.webp" /> */}
                  
                </div>

                  <div className="flex flex-row text-xl border border-gray-700 px-2 rounded-md py-1 items-center gap-3">
                    <span className="font-bold text-green-500 block ">Mpesa Till No.</span>
                    <span className="font-bold "> {business.till} </span>
                  </div>
              </div>


                {/* <div className='mb-1 mt-4 items-center justify-center w-full  rounded-md'>
                  <div className="flex flex-row justify-around h-24 items-center border border-gray-400 rounded-md">

                    <img className="sm:w-32   object-contain h-full " src="/icon_nobg.png" />

                    <div className="flex flex-col px-4 flex-1">
                      <span className='text-2xl md:text-3xl font-extrabold'> {business.name} </span>

                    </div>
                  </div>
                </div> */}
              
      
              
              </div>
          {/* </div> */}
        </section>
        <div className="flex flex-row items-center justify-end bg-neutral-900/15">
          <span className="p-2 text-white text-xs" target="_blank" rel="noocd pener noreferrer">
            Developed by Apnest Digital Agency
          </span> <small className="text-white pr-3"> &copy; {new Date().getFullYear()} </small>
        </div>
      </section>
    </footer>
  </>;
}

export default Footer
