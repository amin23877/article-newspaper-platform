import Link from 'next/link'
import Image from "next/image";
import { useRef } from "react";

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper';

import 'swiper/css';

import MockNews from 'assets/images/953473320video.png'
import bestSellerBadge from 'assets/svg/common/best-seller-badge.svg'
import AudioIcon from 'assets/svg/common/audio-icon.svg'
import VideoIcon from 'assets/svg/common/video-icon.svg'
import ChevronLeft from 'assets/svg/common/chevron-left.svg'
import ChevronRight from 'assets/svg/common/chevron-right.svg'
import styles from 'styles/common/carousel/Carousel.module.scss'

export default function Carousel({ items = [], swiperOptions, radius = true, type = '', image = MockNews }) {

    SwiperCore.use([Navigation]);

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <Swiper
            spaceBetween={24}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
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
            {
                items.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            {
                                item.bestSeller ?
                                    (<div className={styles.bestSellerBadge}>
                                        <Image src={bestSellerBadge} alt='' />
                                    </div>) :
                                    ''
                            }
                            <Link href={item.route}>
                                <a className={
                                    `${styles.anchor} ${radius ? styles.radius : ''} ${item.contentType === 'podcast' || item.contentType === 'video' ? styles.grayScale : ''}`
                                }>
                                    <div className={styles.iconContainer}>
                                        {
                                            (() => {
                                                switch (item.contentType) {
                                                    case ('podcast'):
                                                        return (
                                                            <div className={styles.icon}>
                                                                <Image src={AudioIcon} alt="" />
                                                            </div>
                                                        )
                                                    case ('video'):
                                                        return (
                                                            <div className={styles.icon}>
                                                                <Image src={VideoIcon} alt="" />
                                                            </div>
                                                        )
                                                }
                                            })()
                                        }
                                        <Image loader={() => item.image} height={type == 'best' ?'300px':(type=='magazine' || type=='article')?'250px':'200px'} width="100%" className={`${styles.imageItem}`} src={item.image} alt="" />
                                    </div>
                                    {item.title || item.subTitle ?
                                        (
                                            <div className={styles.descriptionContainer}>
                                                {item.title ? <div className={styles.title}>{item.title}</div> : null}
                                                {item.subTitle ? <div className={styles.subTitle}>{item.subTitle}</div> : null}
                                            </div>
                                        ) :
                                        ''}
                                </a>
                            </Link>
                        </SwiperSlide>
                    )
                })
            }
            <div className={styles.prevNav} ref={prevRef}>
                <Image src={ChevronRight} alt="" />
            </div>
            <div className={styles.nextNav} ref={nextRef}>
                <Image src={ChevronLeft} alt="" />
            </div>
        </Swiper>
    );
};
