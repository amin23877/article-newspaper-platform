
import styles from 'styles/components/profile/posts/Personal.module.scss'
import Heart from "assets/svg/common/heart.svg";
import RHeart from "assets/svg/common/heart-filled.svg";
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
import PaidLockIcon from "assets/images/contact/lock.svg"
import Link from 'next/link';

import { useState } from "react";
import Button from 'components/common/button';
import { useRouter } from 'next/router';

export default function PersonalPost({ post, me, handleLikePost, _handlePay, ...props }) {
    const router = useRouter()

    const popupItems = [
        { text: 'لغو دنبال کردن', icon: PersonMinusIcon, action: () => { } },
        { text: 'افزودن به آرشیو', icon: PieChartIcon, action: () => { } },
        { text: 'افزودن به جستجو های ذخیره شده', icon: ArchiveIcon, action: () => { } },
        { text: 'علاقمند نیستم', icon: DislikeIcon, action: () => { } },
        { text: 'توصیه نمی شود', icon: SlashIcon, action: () => { } },
        { text: 'گزارش تخلف', icon: FlagIcon, action: () => { } },
    ]
console.log('meeee',me)

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
    const handlePay = () => {
        _handlePay({
            balance:me.balance,
            paymentType:'buy',
            paymentAmount:1000,
            title:post.title,
            postId:post._id,
            username:post.user.username
        })
    }
    const likePost = () => {
        handleLikePost(post._id, !post.liked)
    }
    return (
        <div className={styles.postContainer}>
            <div className={styles.mediaPlaceHolder}>
                <div className={styles.imageItem}>
                    <Image loader={() => post.coverImage?.url || MockNews} layout='fill'
                        objectFit='cover' src={post.coverImage?.url || MockNews} alt="" />
                    {/* {paid && !(paymentType == memberType) ? */}
                    <div className={styles.paidImageContent}>
                        <div className={styles.paidLock}>
                            <Image src={PaidLockIcon} alt="" />
                        </div>
                        <div>
                            قفل این محتوا را با تبدیل شدن به یک حامی باز کنید.
                        </div>
                        <Button variant='outline' classes={styles.donateButton}
                            onClick={handlePay}
                        >
                            {/* <Link href={{ pathname: '/user/1/purchase', query: { paymentType: paymentType, title: post.title } }} passHref> */}
                            <span>خرید کنید </span>
                            {/* </Link> */}
                        </Button>
                    </div>
                    {/* : null
                    } */}
                </div>
            </div>
            <div className={styles.descriptionContainer}>
                <div className={styles.timingRow}>
                    <div className={styles.userContainer}>
                        <ContactItem info={post.user} />
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
                <div onClick={()=>{router.push('/post/'+post._id)}} className={styles.readMoreRow}>
                    <div className={styles.readMore}>
                        مطالعه بیشتر
                    </div>
                </div>
                <div className={styles.actionsRow}>
                    <div className={styles.actions}>
                        <div className={styles.like}>
                            <div onClick={likePost} className={styles.icon}>
                                <Image src={post.liked ? RHeart : Heart} alt="" />
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

