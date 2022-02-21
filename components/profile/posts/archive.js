
import styles from 'styles/components/profile/posts/Archive.module.scss'
import MockNews from "assets/images/953473320video.png";
import Image from "next/image";
import { useState } from 'react'
import ContactItem from "components/profile/contacts/contactItem";
import MoreOptions from "assets/svg/common/more-options.svg";
import Heart from "assets/svg/common/heart.svg";
import Comment from "assets/svg/common/comment-outline.svg";
import Popup from "components/common/popup";

import ArchiveIcon from 'assets/svg/popup/archive.svg'
import ShareIcon from 'assets/svg/popup/share.svg'
import PersonMinusIcon from 'assets/svg/popup/person-minus.svg'
import TrashIcon from 'assets/svg/popup/trash.svg'

export default function ArchivePost({ post, ...props }) {

    const popupItems = [
        { text: 'لغو دنبال کردن', icon: PersonMinusIcon, action: () => { } },
        { text: 'حذف', icon: TrashIcon, action: () => { } },
        { text: 'افزودن به جستجو های ذخیره شده', icon: ArchiveIcon, action: () => { } },
        { text: 'به اشتراک گذاشتن', icon: ShareIcon, action: () => { } },
    ]

    const [showPopup, setShowPopup] = useState(false)
    const renderTime = () => {
        var updated_at = Math.floor(new Date(post.updatedAt).getTime() / 1000);
        var now = Math.floor(Date.now() / 1000);
        var diff = Math.abs(now - updated_at);
        if (diff < 60) {
            return `${diff} ثانیه پیش`
        } else if (diff < 3600) {
            return `${Math.floor(diff / 60)} دقیقه پیش`
        } else {
            return `${Math.floor(diff / 3600)} ساعت پیش`

        }

    }

    return (
        <div className={styles.postContainer}>
            <div className={styles.mediaPlaceholder}>
                <div className={styles.imageWrapper}>
                    <Image loader={() => post.coverImage?.url || MockNews} layout='fill'
                        objectFit='cover' src={post.coverImage?.url || MockNews} alt="" />
                </div>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.userRow}>
                    <div className={styles.userBox}>
                        <ContactItem />
                    </div>
                    <div className={styles.moreOptions} onClick={() => setShowPopup(!showPopup)}>
                        <Image src={MoreOptions} alt="" />
                        {showPopup ? <Popup popupSet={setShowPopup} containerClass={styles.popup} items={popupItems} /> : ''}
                    </div>
                </div>
                <div className={styles.title}>
                    {post.title}
                </div>
                <div className={styles.timingRow}>
                    <div className={styles.time}>
                        {renderTime()}
                    </div>
                </div>
                <div className={styles.actionsRow}>
                    <div className={styles.actions}>
                        <div className={styles.like}>
                            <div className={styles.icon}>
                                <Image src={Heart} alt="" />
                            </div>
                            <div className={styles.count}>{post.likesCount}</div>
                        </div>
                        <div className={styles.comment}>
                            <div className={styles.icon}>
                                <Image src={Comment} alt="" />
                            </div>
                            <div className={styles.count}>
                                {post.commentsCount}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
