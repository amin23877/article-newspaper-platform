import Button from "components/common/button";
import styles from "styles/components/manageAccount/Messages.module.scss"
import SearchIcon from 'assets/svg/common/search.svg'
import Image from "next/image"

export default function Messages () {
    return (
        <>
            <Button classes={styles.newMsgBtn}>
                پیام جدید
            </Button>
            <div className={styles.searchContainer}>
                <div className={styles.search}>
                    <div className={styles.searchIcon}>
                        <Image src={SearchIcon} alt=""/>
                    </div>
                    <input className={styles.searchInput} placeholder='جستجوی پیام ها' />
                </div>
                <div className={styles.filter}>
                    زمان
                </div>
                <div className={styles.filter}>
                    نوع
                </div>
                <div className={styles.filter}>
                    موضوع
                </div>
                <div className={styles.filter}>
                    برچسب
                </div>
            </div>
        </>
    )
}