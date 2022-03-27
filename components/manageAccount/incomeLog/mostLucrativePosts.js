import { usePosts } from "hooks/usePosts";
import Image from "next/image";
import styles from "styles/components/manageAccount/IncomeLog.module.scss";

export default function MostLucrativePosts() {
    const { posts, status } = usePosts({ sortBy: "income" });

    return (
        <div className={`${styles.lucrative} ${styles.container}`}>
            <div className={styles.header}>پردرآمد ترین محتوا ها</div>

            {status === "success" &&
                posts.map((post, index) => {
                    return (
                        <div key={index} className={styles.post}>
                            <div className={styles.right}>
                                <div className={styles.image}>
                                    <Image
                                        objectFit="cover"
                                        layout="fill"
                                        src={post.files[0].url}
                                        alt="post-img"
                                    />
                                </div>

                                <div className={styles.title}>{post.title}</div>
                            </div>

                            <div className={styles.value}>{`${post.price} تومان`}</div>
                        </div>
                    );
                })}

            <div className={styles.more}>همه موارد</div>
        </div>
    );
}
