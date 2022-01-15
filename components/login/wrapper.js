import styles from "styles/components/login/Wrapper.module.scss";

export default function Wrapper({children}) {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.rightCol}>
                {children}
            </div>
            <div className={styles.leftCol}>
                <div className={styles.bgShadow}/>
                <div className={styles.circle}/>
                <div className={styles.textWrapper}>
                    <div className={styles.title}>Digi Nashr Logo</div>
                    <div className={styles.description}>دیجی نشر سایت و اپلیکیشن جهت مطالعه و دانلود و خرید نشریات و مجلات ،مقاله و صوتی به صورت قانونی است.</div>
                </div>
            </div>
        </div>
    )
}
