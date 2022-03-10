import FeedPost from "components/profile/posts/feed";
import styles from 'styles/components/profile/TabsCommon.module.scss'

export default function About({ me, ...props }) {
    return (
        <div className={styles.aboutContainer}>
            <div className={styles.title}>{me.firstname} {me.lastname} : {me.bio}</div>
            <div>
                {me.aboutMe}

            </div>
        </div>
    )
}
