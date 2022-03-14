import Carousel from "./carousel";
import Link from "next/link";

import styles from "styles/common/carousel/CarouselContainer.module.scss";

export default function CarouselContainer({ title, seeAllText = "مشاهده همه", carouselOptions }) {
    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carouselHeader}>
                <div className={styles.title}>{title}</div>
                <div className={styles.showAllContainer}>
                    <Link href="/" as={carouselOptions.page}>
                        {seeAllText}
                    </Link>
                </div>
            </div>
            <div className={styles.sliderContainer}>
                <Carousel {...carouselOptions} />
            </div>
        </div>
    );
}
