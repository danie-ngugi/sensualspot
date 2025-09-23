
import Parallax from 'react-rellax'


const StackingCards = () => {
    return (
     
        <section className="w-full py-8 bg-gradient-to-bl from-gray-100/50 to-white/50 sm:py-20 isolate overflow-hidden ">
          <div className="flex flex-col max-w-6xl px-4 mx-auto sm:px-6 md:px-8 sm:flex-row">
            <div className="relative flex px-8 mx-auto sm:w-2/3 sm:order-2">
              <div className="relative w-full h-full ml-auto isolate">

                <Parallax speed={-1} className="z30 z-30  ">
                    
                    <img
                    alt=""
                    src="/images/sleeping.jpg"
                    className="absolute right-0 z-30 object-cover object-center w-[60%] h-auto rounded-lg -top-24 shadow-md "
                    />
                </Parallax>

                <Parallax speed={1} className="z-20">

                    <img
                    alt=""
                    src="/images/face.jpg"
                    className="relative left-0 z-20 object-cover object-center w-1/2 h-auto rounded-lg shadow-md top-24 "
                    />
                </Parallax>

                <Parallax speed={0}>
                    <img
                    alt=""
                    src="/images/product.jpg"
                    className="absolute -bottom-16 z-10 object-cover object-center w-[50%] h-auto rounded-lg shadow-md right-8 rellax"
                    data-rellax-speed="0"
                    />
                </Parallax>
              </div>
            </div>
            <div className="flex items-center w-full pt-24 sm:w-1/3 sm:pt-0">
              <div className="mx-auto sm:pr-6">
                <h1 className="text-3xl text-gray-800">
                    We care about your skin
                  <br />
                  <br />
                  <span className="text-primary-600">Healthy skin is our business</span>
                </h1>
                <p className="mt-6 text-lg text-gray-600">
                  Take advantage of our proven products and keep you looking beautiful.
                </p>
                <div className="flex flex-row justify-between gap-2 mt-8">
                  <div>
                    <h3 className="text-xl text-primary-600">100%</h3>
                    <p className="text-gray-800">Satisfaction</p>
                  </div>
                  <div>
                    {/* <h3 className="text-xl text-primary-600">24/7</h3>
                    <p className="text-gray-800">Support</p> */}
                  </div>
                  <div>
                    {/* <h3 className="text-xl text-primary-600">3.1x</h3>
                    <p className="text-gray-800">Productive</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}

export default StackingCards