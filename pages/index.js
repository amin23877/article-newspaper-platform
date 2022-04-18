import Head from "next/head";
import CarouselContainer from "components/common/carousel/carouselContainer";
import Accordion from "components/common/accordion";
import HomeCard from "components/homepage/homeCard";
import { Endpoints } from "utils/endpoints";
import { api } from "axios/api";
import styles from "styles/pages/Home.module.scss";

export default function Home({
  theBest,
  magazines,
  articles,
  videos,
  newsletter,
  podcast,
}) {
  return (
    <>
      <Head>
        <title>دیجی نشر</title>
      </Head>

      <div className="container">
        <CarouselContainer
          title={theBest.title}
          carouselOptions={{
            items: theBest.posts,
            slidesPerView: [1, 3],
            renderSlide: (item) => (
              <HomeCard
                id={item._id}
                src={item.coverImage.url}
                alt={item.title}
              />
            ),
          }}
        />

        <CarouselContainer
          title={magazines.title}
          carouselOptions={{
            items: magazines.posts,
            slidesPerView: [2, 6],

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

        <CarouselContainer
          title={newsletter.title}
          carouselOptions={{
            items: newsletter.posts,
            slidesPerView: [2, 6],

            renderSlide: (item) => (
              <HomeCard
                id={item._id}
                title={item.title}
                subtitle={item.description}
                rounded={false}
                src={item.coverImage.url}
                alt={item.title}
              />
            ),
          }}
        />

        <CarouselContainer
          title={podcast.title}
          carouselOptions={{
            items: theBest.posts,
            slidesPerView: [2, 6],

            renderSlide: (item) => (
              <HomeCard
                id={item._id}
                mediaType="audio"
                title={item.title}
                subtitle={item.description}
                src={item.coverImage.url}
                alt={item.title}
              />
            ),
          }}
        />

        <CarouselContainer
          title={articles.title}
          carouselOptions={{
            items: theBest.posts,
            slidesPerView: [2, 6],
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

        <CarouselContainer
          title={videos.title}
          carouselOptions={{
            items: theBest.posts,
            slidesPerView: [2, 4],
            renderSlide: (item) => (
              <HomeCard
                id={item._id}
                mediaType="video"
                title={item.title}
                src={item.coverImage.url}
                alt={item.title}
              />
            ),
          }}
        />

        <div className={styles.accordionContainer}>
          <Accordion />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const {
    data: {
      data: {
        page: { sections },
      },
    },
  } = await api.get(Endpoints.getHomePageData);

  let props = {};

  // extract info to separate objects
  props.theBest = sections.find((item) => item.title === "برترین ها");
  props.magazines = sections.find((item) => item.title === "مجلات");
  props.newsletter = sections.find((item) => item.title === "روزنامه ها");
  props.podcast = sections.find((item) => item.title === "پادکست ها");
  props.articles = sections.find((item) => item.title === "مقاله ها");
  props.videos = sections.find((item) => item.title === "ویدیو ها");

  return {
    props,
  };
}
