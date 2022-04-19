import styles from "styles/components/login/Wrapper.module.scss";
import Text from "components/common/typography/text";

export default function Wrapper({ children }) {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.rightCol}>{children}</div>
      <div className={styles.leftCol}>
        <div className={styles.bgShadow} />
        <div className={styles.circle} />
        <div className={styles.textWrapper}>
          <Text
            weight="bold"
            color="white"
            size="huge"
            className={styles.title}
          >
            Digi Nashr Logo
          </Text>
          <Text align="center" color="white" className={styles.description}>
            دیجی نشر سایت و اپلیکیشن جهت مطالعه و دانلود و خرید نشریات و مجلات
            ،مقاله و صوتی به صورت قانونی است.
          </Text>
        </div>
      </div>
    </div>
  );
}
