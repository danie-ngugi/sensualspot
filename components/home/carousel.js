import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { business } from '../../common/data';

const Picture = ({mobile, desktop}) => {
   //   console.log(mobile, desktop)
    return (
        <picture>
            <source  className="h-[380px] lg:h-[480px] rounded-lg  object-cover"  media="(min-width:650px)" srcSet={desktop} />
            <source  className="h-[380px] lg:h-[480px] rounded-lg  object-cover"  media="(max-width:649px)" srcSet={mobile} />
            <img  className="h-[380px] lg:h-[480px] rounded-lg  object-cover"  src={desktop} alt={`${business?.name} ${desktop}`} />
        </picture>
    );
}

const HomeCarousel = () => {
    return (
        <div className="lg:p-1 mt-6">
            <div>
                <Carousel swipeable={false} interval={6000} autoPlay showThumbs={false} infiniteLoop={true}>
                   
                    <div>
                        <Picture mobile="/banners/1.png" desktop="/banners/1.png" />
                    </div>

                    {/* <div>
                        <Picture mobile="/banners/longfill_mobile.jpg" desktop="/banners/longfill.jpg" />
                    </div> */}
                   
                   
                </Carousel>
            </div>

        </div>
    )
}

export default HomeCarousel



