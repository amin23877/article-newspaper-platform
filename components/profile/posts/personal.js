
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
import { useState } from "react";

export default function PersonalPost({ post, me, ...props }) {

    const popupItems = [
        { text: 'لغو دنبال کردن', icon: PersonMinusIcon, action: () => { } },
        { text: 'افزودن به آرشیو', icon: PieChartIcon, action: () => { } },
        { text: 'افزودن به جستجو های ذخیره شده', icon: ArchiveIcon, action: () => { } },
        { text: 'علاقمند نیستم', icon: DislikeIcon, action: () => { } },
        { text: 'توصیه نمی شود', icon: SlashIcon, action: () => { } },
        { text: 'گزارش تخلف', icon: FlagIcon, action: () => { } },
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
            <div className={styles.mediaPlaceHolder}>
                <div className={styles.imageItem}>
                    <img layout='fill'
                        objectFit='cover' src={post.coverImage?.url} alt="" />
                </div>
            </div>
            <div className={styles.descriptionContainer}>
                <div className={styles.timingRow}>
                    <div className={styles.userContainer}>
                        <ContactItem info={me} />
                    </div>
                    <div className={styles.time}>{renderTime()}</div>
                </div>
                <div className={styles.title}>
                    {post.title}
                </div>
                <div className={styles.description}>
                    {post.description}
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
                    <div className={styles.social}>
                        <div className={styles.icon}>
                            <Image src={Share} alt="" />
                        </div>
                        <div className={styles.icon}>
                            <Image src={Download} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

