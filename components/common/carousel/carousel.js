import Image from "next/image";
import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

import "swiper/css";

import ChevronLeft from "assets/svg/common/chevron-left.svg";
import ChevronRight from "assets/svg/common/chevron-right.svg";
import styles from "styles/common/carousel/Carousel.module.scss";

export default function Carousel({
  items = [],
  swiperOptions,
  renderSlide,
  slidesPerView = [1, 3],
}) {
  SwiperCore.use([Navigation]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: slidesPerView[0],
        },
        768: {
          slidesPerView: slidesPerView[1],
        },
      }}
      spaceBetween={24}
      navigation={{
        // Both prevEl & nextEl are null at render so this does not work
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      onInit={(swiper) => {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.update();
        swiper.navigation.init();
      }}
      {...swiperOptions}
    >
      {items.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            {typeof renderSlide === "function" && renderSlide(item)}
          </SwiperSlide>
        );
      })}

      <div className={styles.prevNav} ref={prevRef}>
        <Image src={ChevronRight} alt="" />
      </div>

      <div className={styles.nextNav} ref={nextRef}>
        <Image src={ChevronLeft} alt="" />
      </div>
    </Swiper>
  );
}
