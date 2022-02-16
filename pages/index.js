import Head from 'next/head'
import HeaderOnly from 'layouts/header-only.js'
import styles from 'styles/pages/Home.module.scss'
import MockBests from 'assets/images/mock-bests.png'
import MockJournals from 'assets/images/mock-magazine.png'
import MockNewspapers from 'assets/images/mock-newspaper.png'
import MockPodcasts from 'assets/images/mock-podcast.png'
import MockArticles from 'assets/images/mock-article.png'
import CarouselContainer from "components/common/carousel/carouselContainer";
import Accordion from "components/common/accordion";
import Categories from "components/homepage/categories";
import Button from "components/common/button";
import { useRouter } from "next/router";
import axios from 'axios';
import { Endpoints } from 'utils/endpoints'
export default function Home({ pageInfo }) {

    console.log('pageInfo', pageInfo)
    const router = useRouter()

    const bestCarousel = {
        title: 'برترین ها',
        options: [
            { route: '/', bestSeller: true, },
            { route: '/', },
            { route: '/', bestSeller: true, },
            { route: '/', bestSeller: true, },
            { route: '/', },
            { route: '/', }
        ],
        slidesPerView: 3,
        radius: true,
        image: MockBests,
    }

    const journalsCarousel = {
        title: 'مجلات',
        options: [
            { route: '/', bestSeller: true, title: 'مجله دانشمند شماره 57', subTitle: 'آبان 1400' },
            { route: '/', title: 'مجله دانشمند شماره 57', subTitle: 'آبان 1400' },
            { route: '/', bestSeller: true, title: 'مجله دانشمند شماره 57', subTitle: 'آبان 1400' },
            { route: '/', bestSeller: true, title: 'مجله دانشمند شماره 57', subTitle: 'آبان 1400' },
            { route: '/', title: 'مجله دانشمند شماره 57', subTitle: 'آبان 1400' },
            { route: '/', title: 'مجله دانشمند شماره 57', subTitle: 'آبان 1400' }
        ],
        slidesPerView: 6,
        radius: true,
        image: MockJournals,
        page: '/journal'
    }

    const newspaperCarousel = {
        title: 'روزنامه ها',
        options: [
            { route: '/', bestSeller: true, title: 'روزنامه اقتصاد', subTitle: 'آبان 1400' },
            { route: '/', title: 'روزنامه اقتصاد', subTitle: 'آبان 1400' },
            { route: '/', bestSeller: true, title: 'روزنامه اقتصاد', subTitle: 'آبان 1400' },
            { route: '/', bestSeller: true, title: 'روزنامه اقتصاد', subTitle: 'آبان 1400' },
            { route: '/', title: 'روزنامه اقتصاد', subTitle: 'آبان 1400' },
            { route: '/', title: 'روزنامه اقتصاد', subTitle: 'آبان 1400' }
        ],
        slidesPerView: 4,
        radius: false,
        image: MockNewspapers,
        page: '/newspaper',
    }

    const podcastCarousel = {
        title: 'پادکست',
        options: [
            { route: '/', bestSeller: true, title: 'اپیزود سوم مغازه ی خودکشی', subTitle: 'با صدای مریم عزیزی' },
            { route: '/', title: 'اپیزود سوم مغازه ی خودکشی', subTitle: 'با صدای مریم عزیزی' },
            { route: '/', bestSeller: true, title: 'اپیزود سوم مغازه ی خودکشی', subTitle: 'با صدای مریم عزیزی' },
            { route: '/', bestSeller: true, title: 'اپیزود سوم مغازه ی خودکشی', subTitle: 'با صدای مریم عزیزی' },
            { route: '/', title: 'اپیزود سوم مغازه ی خودکشی', subTitle: 'با صدای مریم عزیزی' },
            { route: '/', title: 'اپیزود سوم مغازه ی خودکشی', subTitle: 'با صدای مریم عزیزی' }
        ],
        slidesPerView: 4,
        radius: true,
        type: 'audio',
        image: MockPodcasts,
        page: '/podcast',
    }

    const articleCarousel = {
        title: 'مقاله ها',
        options: [
            { route: '/', bestSeller: true, title: 'مجله دانشمند شماره 57', subTitle: 'آبان 1400' },
            { route: '/', title: 'مجله دانشمند شماره 57', subTitle: 'آبان 1400' },
            { route: '/', bestSeller: true, title: 'مجله دانشمند شماره 57', subTitle: 'آبان 1400' },
            { route: '/', bestSeller: true, title: 'مجله دانشمند شماره 57', subTitle: 'آبان 1400' },
            { route: '/', title: 'مجله دانشمند شماره 57', subTitle: 'آبان 1400' },
            { route: '/', title: 'مجله دانشمند شماره 57', subTitle: 'آبان 1400' }
        ],
        slidesPerView: 6,
        radius: true,
        image: MockArticles,
        page: '/article',
    }

    const videoCarousel = {
        title: 'ویدئو',
        options: [
            { route: '/', bestSeller: true, title: 'مستند زندگی سخت در قطب' },
            { route: '/', title: 'مستند زندگی سخت در قطب' },
            { route: '/', bestSeller: true, title: 'مستند زندگی سخت در قطب' },
            { route: '/', bestSeller: true, title: 'مستند زندگی سخت در قطب' },
            { route: '/', title: 'مستند زندگی سخت در قطب' },
            { route: '/', title: 'مستند زندگی سخت در قطب' }
        ],
        slidesPerView: 4,
        radius: true,
        type: 'video',
        page: '/video',
    }

    const carouselsList = [bestCarousel, journalsCarousel, newspaperCarousel, podcastCarousel, articleCarousel, videoCarousel]

    return (
        <div>
            <Head>
                <title>دیجی نشر</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='container'>
                {router.asPath !== '/' ?
                    <Categories />
                    : null
                }
                {carouselsList.map((carousel) => (
                    <CarouselContainer
                        key={carousel.title}
                        title={carousel.title} carouselOptions={
                            {
                                items: carousel.options,
                                swiperOptions: { slidesPerView: carousel.slidesPerView },
                                radius: carousel.radius,
                                type: carousel.type,
                                image: carousel.image,
                                page: carousel.page,
                            }
                        } />
                ))}
                {router.asPath !== '/' ?
                    <div className={styles.showMore}>
                        <Button classes={styles.showMoreBtn}>
                            موارد بیشتر
                        </Button>
                    </div>
                    :
                    null
                }
                <div className={styles.accordionContainer}>
                    <Accordion />
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    const pageInfo = await axios.get(`${Endpoints.baseUrl}/pages/home`)

    return {
        props: {
            pageInfo: pageInfo.data.data.page
        }, // will be passed to the page component as props

    };

}