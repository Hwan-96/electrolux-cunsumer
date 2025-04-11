import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { mainVisualImages } from '@/utils/data.js';

const Carousel = () => {
  return (
    <div id="main-visual">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={true}
        speed={2000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        className="mySwiper main-visual"
      >
        {mainVisualImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img 
              src={image.pc} 
              className="pc-only" 
              alt={`메인 비주얼 ${index + 1}`} 
            />
            <img 
              src={image.mo} 
              className="m-only" 
              alt={`메인 비주얼 ${index + 1}`} 
            />
          </SwiperSlide>
        ))}
        <div className="swiper-button-next cycle-next"></div>
        <div className="swiper-button-prev cycle-prev"></div>
        <div className="swiper-pagination"></div>
      </Swiper>
    </div>
  );
};

export default Carousel;
