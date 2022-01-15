
import styles from 'styles/common/FilterBar.module.scss'
import Magnifier from "assets/svg/common/magnifier-grey.svg";
import ChevronDown from "assets/svg/common/chevron-down.svg";
import Image from "next/image";

export default function FilterBar(props) {
    return (
        <div className={styles.filterBarContainer}>
            <div className={styles.title}>فیلتر</div>
            <div className={styles.optionsContainer}>
                <div className={styles.optionItem}>
                    <div className={styles.text}>
                        زمان
                    </div>
                    <div className={styles.icon}>
                        <Image src={ChevronDown} alt=""/>
                    </div>
                </div>
                <div className={styles.optionItem}>
                    <div className={styles.text}>
                        دسترسی
                    </div>
                    <div className={styles.icon}>
                        <Image src={ChevronDown} alt=""/>
                    </div>
                </div>
                <div className={styles.optionItem}>
                    <div className={styles.text}>
                        نوع محتوا
                    </div>
                    <div className={styles.icon}>
                        <Image src={ChevronDown} alt=""/>
                    </div>
                </div>
                <div className={styles.optionItem}>
                    <div className={styles.text}>
                        برچسب
                    </div>
                    <div className={styles.icon}>
                        <Image src={ChevronDown} alt=""/>
                    </div>
                </div>
            </div>
            <div className={styles.searchContainer}>
                <input type="text" placeholder='جستجو'/>
                <span className={styles.iconContainer}>
                    <Image src={Magnifier} alt=""/>
                </span>
            </div>
        </div>
    )
}
