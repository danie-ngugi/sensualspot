import Image from "next/image"


const ImageCollage = ({  }) => {
    return (
        <section className="flex flex-col max-w-5xl px-4 mx-auto mt-16 sm:px-8">
        <div className="flex flex-col flex-1 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-start justify-center px-4 pb-8 sm:pr-0 sm:w-1/2 sm:order-2">
            <h3 className="mb-4 ml-2 text-4xl bold">Keep glowing </h3>
            <p className="max-w-md ml-2 text-xl text-gray-600">
             Time to get your sking growing with our premium products that have been tested and proven to work.
            </p>
            <a href="#" className="flex justify-center mt-4">
              <div
                className="relative ml-2 tracking-wider text-center duration-150 ease-in-out border-b-4 cursor-pointer text-primary-600 border-primary-600 hover:text-primary-700 hover:border-primary-700 transision-all hover:px-2 hover:ml-0"
              >
                Find out more
              </div>
            </a>
          </div>
          <div className="flex flex-row justify-center w-full max-w-md gap-4 mx-auto sm:w-1/2 sm:mx-0">
            <div className="flex flex-col flex-1 gap-4 pt-12 sm:pt-24">
              <div className="w-full h-full aspect-w-1 aspect-h-1">
                <Image
                  src="/images/collage/black_girl.jpg"
                  alt=""
                  width={200}
                  height={200}
                  className="object-cover object-center rounded-md "
                />
              </div>
              <div className="w-full h-full aspect-w-1 aspect-h-1">
                <Image
                  src="/images/collage/two_girls.jpg"
                  width={160}
                  height={160}
                  alt=""
                  className="object-cover object-center rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-4 pb-12 sm:pb-24">
              <div className="w-full h-full aspect-w-1 aspect-h-1">
                <Image
                  src="/images/collage/girl_long_hair.jpg"
                  width={150}
                  height={150}
                  alt=""
                  className="object-cover object-center rounded-md"
                />
              </div>
              <div className="w-full h-full aspect-w-1 aspect-h-1">
                <Image
                  src="/images/collage/applying_makeup.jpg"
                  width={200}
                  height={200}
                  alt=""
                  className="object-cover object-center rounded-md "
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default ImageCollage