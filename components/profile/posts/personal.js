
import styles from 'styles/components/profile/posts/Personal.module.scss'
import Heart from "assets/svg/common/heart.svg";
import Comment from "assets/svg/common/comment-outline.svg";
import Image from "next/image";

import MockNews from 'assets/images/953473320video.png'
import Share from "assets/svg/common/share.svg";
import Download from "assets/svg/common/download.svg";
import ContactItem from "../contacts/contactItem";
import PersonMinusIcon from "../../../assets/svg/popup/person-minus.svg";
import PieChartIcon from "../../../assets/svg/popup/pie-chart.svg";
import ArchiveIcon from "../../../assets/svg/popup/archive.svg";
import DislikeIcon from "../../../assets/svg/popup/thumbs-down.svg";
import SlashIcon from "../../../assets/svg/popup/slash.svg";
import FlagIcon from "../../../assets/svg/popup/flag.svg";
import {useState} from "react";

export default function PersonalPost (props) {

    const popupItems = [
        {text: 'لغو دنبال کردن', icon: PersonMinusIcon, action: () => {}},
        {text: 'افزودن به آرشیو', icon: PieChartIcon, action: () => {}},
        {text: 'افزودن به جستجو های ذخیره شده', icon: ArchiveIcon, action: () => {}},
        {text: 'علاقمند نیستم', icon: DislikeIcon, action: () => {}},
        {text: 'توصیه نمی شود', icon: SlashIcon, action: () => {}},
        {text: 'گزارش تخلف', icon: FlagIcon, action: () => {}},
    ]

    const [showPopup, setShowPopup] = useState(false)

    return (
        <div className={styles.postContainer}>
            <div className={styles.mediaPlaceHolder}>
                <div className={styles.imageItem}>
                    <Image layout='fill'
                           objectFit='cover' src={MockNews} alt=""/>
                </div>
            </div>
            <div className={styles.descriptionContainer}>
                <div className={styles.timingRow}>
                    <div className={styles.userContainer}>
                        <ContactItem />
                    </div>
                    <div className={styles.time}>11 ساعت پیش</div>
                </div>
                <div className={styles.title}>
                    عنوان
                </div>
                <div className={styles.description}>
                    منبعی از درآمد و سوددهی شد. گرفت. صنعت ساخت و نمایش فیلم‌های متحرک تقریبًا به محض عمومی شدن، تبدیل به اولین تصاویر متحرک در اواخر دهه 0881 با ظهور فیلم عکاسی سلولوید در دسترس قرار
                    <div className={styles.mask} />
                </div>
                <div className={styles.readMoreRow}>
                    <div className={styles.readMore}>
                        مطالعه بیشتر
                    </div>
                </div>
                <div className={styles.actionsRow}>
                    <div className={styles.actions}>
                        <div className={styles.like}>
                            <div className={styles.icon}>
                                <Image src={Heart} alt=""/>
                            </div>
                            <div className={styles.count}>22</div>
                        </div>
                        <div className={styles.comment}>
                            <div className={styles.icon}>
                                <Image src={Comment} alt=""/>
                            </div>
                            <div className={styles.count}>
                                12
                            </div>
                        </div>
                    </div>
                    <div className={styles.social}>
                        <div className={styles.icon}>
                            <Image src={Share} alt=""/>
                        </div>
                        <div className={styles.icon}>
                            <Image src={Download} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

