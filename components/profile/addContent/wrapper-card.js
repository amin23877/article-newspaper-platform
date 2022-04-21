import Image from "next/image";

import styles from "styles/components/profile/addContent/WrapperCard.module.scss";

import InfoIcon from "assets/svg/common/info.svg";
import Text from "components/common/typography/text";

export default function WrapperCard({
  children,
  title,
  description,
  className,
}) {
  return (
    <div className={`${styles.cardContainer} ${className}`}>
      <div className={styles.titleContainer}>
        <Text color="black" size="l" weight="bold" className={styles.title}>
          {title}:
        </Text>
        <div className={styles.infoIcon}>
          <Image src={InfoIcon} alt="" />
        </div>
      </div>
      {description ? (
        <Text className={styles.description}>{description}</Text>
      ) : (
        ""
      )}
      {children}
    </div>
  );
}
