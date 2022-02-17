import Button from "components/common/button";
import styles from "styles/components/manageAccount/Messages.module.scss"
import SearchIcon from 'assets/svg/common/search.svg'
import Image from "next/image"
import DownArrow from "assets/svg/common/chevron-down.svg"
import { useState } from "react";

export default function Messages () {

    const [activeIndex, setActiveIndex] = useState(1)

    const changeTab = (index) => {
        setActiveIndex(index)
    }
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
                    <div className={styles.arrow}>
                        <Image src={DownArrow} alt='' className={styles.arrow}/>
                    </div>
                </div>
                <div className={styles.filter}>
                    نوع
                    <div className={styles.arrow}>
                        <Image src={DownArrow} alt='' className={styles.arrow}/>
                    </div>
                </div>
                <div className={styles.filter}>
                    موضوع
                    <div className={styles.arrow}>
                        <Image src={DownArrow} alt='' className={styles.arrow}/>
                    </div>
                </div>
                <div className={styles.filter}>
                    برچسب
                    <div className={styles.arrow}>
                        <Image src={DownArrow} alt='' className={styles.arrow}/>
                    </div>
                </div>
            </div>

            <div className={styles.tabs}>
                <div className={`${styles.tab} ${activeIndex === 1 ? styles.active : styles.normal}`} onClick={() => changeTab(1)}>
                    <div>پیام های ورودی</div>
                    <span>12</span>
                </div>
                <div className={`${styles.tab} ${activeIndex === 2 ? styles.active : styles.normal}`} onClick={() => changeTab(2)}>
                    <div>پیام های خروجی</div>
                    <span>782</span>
                </div>
                <div className={`${styles.tab} ${activeIndex === 3 ? styles.active : styles.normal}`} onClick={() => changeTab(3)}>
                    <div>بایگانی</div>
                    <span>251</span>
                </div>
            </div>
        </>
    )
}