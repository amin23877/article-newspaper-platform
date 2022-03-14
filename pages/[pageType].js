import Head from "next/head";
import styles from "styles/pages/Home.module.scss";
import CarouselContainer from "components/common/carousel/carouselContainer";
import Accordion from "components/common/accordion";
import Categories from "components/homepage/categories";
import Button from "components/common/button";
import axios from "axios";
import { Endpoints } from "utils/endpoints";
import HomeCard from "components/homepage/homeCard";

export default function MainPages({ pageInfo }) {
    return (
        <>
            <Head>
                <title>دیجی نشر</title>
            </Head>

            <div className="container">
                <Categories tags={pageInfo.tags} />

                {pageInfo.sections.map((section) => (
                    <CarouselContainer
                        key={section.title}
                        title={section.title}
                        carouselOptions={{
                            items: section.posts,
                            swiperOptions: { slidesPerView: 4 },
                            renderSlide: (item) => (
                                <HomeCard
                                    id={item._id}
                                    src={item.coverImage.url}
                                    alt={item.title}
                                    title={item.title}
                                    subtitle={item.description}
                                />
                            ),
                        }}
                    />
                ))}

                <div className={styles.showMore}>
                    <Button classes={styles.showMoreBtn}>موارد بیشتر</Button>
                </div>

                <div className={styles.accordionContainer}>
                    <Accordion />
                </div>
            </div>
        </>
    );
}

export async function getStaticPaths() {
    const pagesInfo = await axios.get(`${Endpoints.baseUrl}/pages`);

    const data = pagesInfo.data.data.pages;

    const paths = data.map((page) => {
        return {
            params: { pageType: page.pageType.toString() },
        };
    });

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps(context) {
    try {
        const pageInfo = await axios.get(`${Endpoints.baseUrl}/pages/${context.params.pageType}`);

        return {
            props: {
                pageInfo: pageInfo.data.data.page,
            },
        };
    } catch (e) {}
}
