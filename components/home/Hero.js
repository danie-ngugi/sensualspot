import { useRouter } from 'next/router'

const Hero = () => {
  const router = useRouter()

  return (
   <div className="container overflow-hidden pt-2 mx-auto select-none ">

        <div className="hero  bg-[#f2f3f7] rounded-lg mx-2 flex flex-col sm:flex-row justify-between">

          <div className="flex flex-col justify-center sm:w-2/6 w-full p-3 items-start pl-6  ">

            <div className=" font-black text-xl sm:text-2xl mb-6 mt-14 sm:mt-2 text-wrapper relative flex  ">
              <span className="st">Our Delivery</span>
              <ul className="dynamic-txts">
                <li><span>Westland</span></li>
                <li><span>Kilimani</span></li>
                <li><span>Kileleshwa</span></li>
                <li><span>Ruaka</span></li>
                <li><span>Lavington</span></li>
                <li><span>Langata</span></li>
              </ul>
            </div>

            <div>
             <div className="mb-6">
              Get your products delivered in 30-40 mins at no extra cost.
             </div>
            </div>

            <div>
              <span onClick={() => router.push('/categories')} className="primary-btn cursor-pointer">Shop now</span>
            </div>

          </div>

          <div className="banner w-full sm:w-4/6">

          </div>

        </div>
      

      <style jsx>{`
        .hero {
          max-height: 480px;
          min-height: 340px;
        }
        .banner {
          min-height: 200px;
          background-image: url(/banner.webp);
          background-repeat: no-repeat;
          background-size: contain;
        }


        @media only screen and (max-width: 520px) {
          .bm {
            background-image: url(/scentfied_banner.jpeg);
            background-repeat: no-repeat;
            background-size: cover;
          }
        }

        .st {
          line-height: 40px;
        }
        .text-wrapper .dynamic-txts {
          margin-left: 10px;
          line-height:40px;
          height: 40px;
          overflow: hidden;
        }
        .dynamic-txts li {
          list-style: none;
          color: var(--primary-color);
          font-weight: 400px;
          top: 0;
          position: relative;
          animation: slide 12s steps(4) infinite;
        }
        @keyframes slide {
          100% {
            top: -160px;
          }
        }
        .dynamic-txts li {
          position: relative;
        }
        .dynamic-txts li::after {
          content: "";
          position: absolute;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #f3f4f6;
          border-left: 2px solid var(--primary-color);
          animation: typing 3s steps(10) infinite;
        }
        @keyframes typing {
          40%,
          60% {
            left: calc(100% + 30px);
          }
          100% {
            left: 0;
          }
        }
        
        

      `}</style>
   </div>
  )
}

export default Hero
