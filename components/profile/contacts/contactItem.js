import Image from "next/image";
import MockAvatar from "assets/images/mock-avatar.png";
import Star from "assets/svg/common/star.svg";

import styles from "styles/components/profile/contacts/ContactItem.module.scss";

export default function ContactItem({ info, ...props }) {
  console.log(info);
  const renderStars = () => {
    let tmp = [];
    let star = info?.score;
    if (star == 0) star = 1;
    for (let i = 0; i < star; i++) {
      tmp.push(
        <div className={styles.star}>
          <Image src={Star} />
        </div>
      );
    }
    return tmp;
  };
  return (
    <div className={styles.contactItemContainer}>
      <div className={styles.avatar}>
        <Image src={info?.profilePicture || MockAvatar} />
      </div>
      <div className={styles.desc}>
        <div className={styles.name}>{info?.username ?? "کاربر میهمان"}</div>
        <div className={styles.stars}>{renderStars()}</div>
      </div>
    </div>
  );
}
