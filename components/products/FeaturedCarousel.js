import React from "react";
import Slider from "react-slick";
import ProductPreview from "./ProductPreview";

const FeaturedCarousel = ({ products }) => {

  // console.log('Featured items', products.length)

  const len = products.length


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: len >= 4 ? 4 : len,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

    return (
      <div className="px-2  sm:mx-3 sm:my-4 ">
        
        <Slider {...settings} >
          {products.map((product) => {
            return (
                <div key={product._id} className=" sm:px-2 sm:mx-2 py-3 sm:max-w-[320px]">
                    <ProductPreview product={product} />
                </div>
            )
          })}
        </Slider>
      </div>
    );
}

export default FeaturedCarousel