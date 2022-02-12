import styles from 'styles/components/manageAccount/AnalyzeContent.module.scss'
import FilterIcon from 'assets/svg/common/filter.svg'
import Image from 'next/image'

export default function AnalyzeContent () {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
            آنالیز محتوا
            </div>
            <div className={styles.box}>
                <div className={styles.filterIcon}>
                    <Image src={FilterIcon} alt=''/>
                </div>
                <div>فیلتر</div>
            </div>
            <div className={styles.box}>
                <div className={styles.content}>
                    محتوا
                </div>
                <div className={styles.menu}>
                    <div>تاریخ</div>
                    <div>نمایش</div>
                    <div>بازدیدها</div>
                    <div>پسند</div>
                    <div>نظرات</div>
                    <div>درآمد</div>
                </div>
            </div>
        </div>
    )
}