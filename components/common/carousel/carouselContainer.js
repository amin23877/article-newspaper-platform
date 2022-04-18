import Carousel from "./carousel";
import Link from "next/link";

import styles from "styles/common/carousel/CarouselContainer.module.scss";
import Text from "components/common/typography/text";

export default function CarouselContainer({
  title,
  seeAllText = "مشاهده همه",
  carouselOptions,
}) {
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselHeader}>
        <Text weight="bold" color="primary" size="xl">
          {title}
        </Text>

        <Text>
          <Link href="/" as={carouselOptions.page}>
            {seeAllText}
          </Link>
        </Text>
      </div>
      <Carousel {...carouselOptions} />
    </div>
  );
}
