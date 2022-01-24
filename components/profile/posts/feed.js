import styles from 'styles/components/profile/posts/Feed.module.scss'
import MoreOptions from "assets/svg/common/more-options.svg";
import Heart from "assets/svg/common/heart.svg";
import Comment from "assets/svg/common/comment-outline.svg";
import Image from "next/image";

import MockNews from 'assets/images/953473320video.png'
import {useState} from "react";
import Popup from "components/common/popup";
import TrashIcon from "../../../assets/svg/popup/trash.svg";
import EyeOffIcon from "../../../assets/svg/popup/eye-off.svg";
import EditIcon from "../../../assets/svg/popup/edit.svg";
import ShareIcon from "../../../assets/svg/popup/share.svg";
import CommentsIcon from "../../../assets/svg/popup/comments.svg";
import LockIcon from "../../../assets/svg/popup/lock.svg";

export default function FeedPost (props) {

    const popupItems = [
        {text: 'حذف', icon: TrashIcon, action: () => {}},
        {text: 'لغو نمایش', icon: EyeOffIcon, action: () => {}},
        {text: 'ویرایش', icon: EditIcon, action: () => {}},
        {text: 'به اشتراک گذاشتن', icon: ShareIcon, action: () => {}},
        {text: 'بستن نظرات', icon: CommentsIcon, action: () => {}},
        {text: 'حق نشر', icon: LockIcon, action: () => {}},
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
                    <div className={styles.time}>11 ساعت پیش</div>
                    <div className={styles.moreActions} onClick={() => setShowPopup(!showPopup)}>
                        <Image src={MoreOptions} alt=""/>
                        {showPopup ? <Popup popupSet={setShowPopup} containerClass={styles.popup} items={popupItems} /> : ''}
                    </div>
                </div>
                <div className={styles.title}>
                    عنوان
                </div>
                <div className={styles.description}>
                    منبعی از درآمد و سوددهی شد. گرفت. صنعت ساخت و نمایش فیلم‌های متحرک تقریبًا به محض عمومی شدن، تبدیل به اولین تصاویر متحرک در اواخر دهه 0881 با ظهور فیلم عکاسی سلولوید در دسترس قرار
                    <div className={styles.mask} />
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
                    <div className={styles.readMore}>
                        مطالعه بیشتر
                    </div>
                </div>
            </div>
        </div>
    )
}