import Paper from "components/common/paper";
import Text from "components/common/typography/text";
import Image from "next/image";
import Link from "next/link";

import videoIcon from "assets/svg/common/video-icon.svg";
import audioIcon from "assets/svg/common/audio-icon.svg";

import styles from "styles/homepage/HomeCard.module.scss";

export default function HomeCard({
  src,
  mediaType,
  alt,
  rounded = true,
  title,
  subtitle,
  id,
}) {
  return (
    <Link href={id ? "/post/" + id : "/"} passHref>
      <div className={styles.container}>
        <Paper
          className={styles.paper}
          style={{ borderRadius: !rounded ? 0 : "" }}
        >
          {src && <Image layout="fill" objectFit="cover" alt={alt} src={src} />}

          {mediaType && (
            <div className={styles.overlay}>
              <Image
                alt=""
                src={mediaType === "video" ? videoIcon : audioIcon}
                width={104}
                height={104}
              />
            </div>
          )}
        </Paper>

        <Text style={{ marginBottom: 0 }} color="black">
          {title}
        </Text>

        <Text style={{ margin: 0 }}>{subtitle}</Text>
      </div>
    </Link>
  );
}
