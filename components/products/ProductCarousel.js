import { useState } from 'react'

import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import { Navigation, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { makeImageUrl } from 'common/methods'

const ProductCarousel = ({ images, hasThumbs, productName }) => {
    const [activeThumb, setActiveThumb] = useState(null)
    const makeThumberUrl = (url) => hasThumbs ? url.replace('/products', '/thumbs').replace('/offers', '/thumbs').split('.webp')[0] + '-thumb.webp' : url
    return (
        <>
            <div className="overflow-hidden">
            {images.length > 1 ? (
                    <Swiper
                    spaceBetween={10}
                    loop={true}
                    slidesPerView={1}
                    navigation={true}
                    modules={[ Navigation, Thumbs ]}
                    grabCursor={true}
                    className="products-image-slider overflow-hidden w-full"
                    thumbs={{ swiper: activeThumb }}
                >
                    { images.map((img, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <img src={img} width={600} height={600} alt={`${productName}`} className=" object-contain max-h-full max-w-full" />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>

                ) : <img src={images[0]} width={600} height={600} alt={`${productName}`} className=" object-contain max-h-full max-w-full" />}

                <section className="thumb">
                <Swiper
                    onSwiper={setActiveThumb}
                    spaceBetween={10}
                    loop={images.length >= 4}
                    slidesPerView={images.length >= 4 ? 4 : images.length}
                    
                    modules={[ Navigation, Thumbs ]}
                    className="products-image-slider-thumbs"
                >
                    { images.map((img, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="products-image-slider-thumbs-wrapper">
                                    {/* <img src={img} className="rounded-md" alt="product image" /> */}
                                    <img 
                                        className='h-full t_img'
                                        // makeThumberUrl(img) 
                                        src={img} 
                                        width={90} 
                                        height={90} alt="Product thumb image" />
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                </section>
            </div>
            <style global jsx>
                {`
                    .products-image-slider {

                    }
                    .products-image-slider .swiper-slide {
                        overflow: hidden;
                        position: relative;
                        
                    }
                   

                    .swiper-button-prev, .swiper-button-next {
                        color: #78909C;
                    }
                    .t_img {
                        border-radius: 10%;

                    }
                    .products-image-slider-thumbs {
                        margin-top: 6px;
                        
                        margin-bottom: 10px;
                    }
                    .products-image-slider-thumbs .swiper-slide {
                        cursor: pointer;
                        border: 1px solid #dddbdb;
                        border-radius: 10%;

                    }
                    .products-image-slider-thumbs .swiper-slide-thumb-active {
                        border: 1px solid #00B0FF;
                    }
                    .products-image-slider-thumbs-wrapper {
                        max-height: 90px;
                        
                    }
                    .products-image-slider-thumbs-wrapper .swiper-slide, .products-image-slider-thumbs-wrapper .swiper-slide-thumb-active {
                        max-width: 90px;
                    }
                    .thumb .swiper-slide {
                        max-height: 90px;
                        max-width: 90px;
                    }
                    
                `}
            </style>
        </>
    )
}


export default ProductCarousel