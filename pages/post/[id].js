import styles from '/styles/pages/Post.module.scss';
import Ad from 'assets/images/post/advertisement.png';
import Image from 'next/image';
import Link from 'next/link';
import MockUser from 'assets/images/contact/mock-avatar.png';
import MockAvatar from 'assets/images/mock-avatar.png'
import Button from "components/common/button";
import BronzePlan from 'assets/images/contact/bronze-plan.svg'
import SilverPlan from 'assets/images/contact/silver-plan.svg'
import GoldPlan from 'assets/images/contact/gold-plan.svg'
import Close from 'assets/images/post/close.svg';
import Heart from "assets/svg/common/heart.svg";
import Comment from "assets/svg/common/comment-outline.svg";
import ThumbUp from 'assets/images/post/thumb-up.svg';
import ThumbDown from 'assets/images/post/thumb-down.svg';
import DotsVertical from "assets/images/post/dots-vertical.svg";
import Bell from "assets/images/post/bell.svg";
import Send from "assets/images/post/send.svg";
import MockNews from 'assets/images/953473320video.png';
import { useUser } from "hooks/useUser";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import axios from 'axios'
import { Endpoints } from 'utils/endpoints';
import cookie from 'cookie'
export default function Post({ postInfo }) {
    console.log('post', postInfo)
    const router = useRouter()
    const { type, id } = router.query

    const [user, getUser, hasInitialized, memberType] = useUser()
    const [showAd, setShowAd] = useState(true)
    const [packages, setPackages] = useState()

    useEffect(() => {
        getUser()
        getPackages()
        return
    }, [])

    const getPackages = async () => {
        const { accessToken } = cookie.parse(document?.cookie);

        let p = await axios.get(Endpoints.baseUrl + '/payment/packages',{
            headers: {
                authorization: accessToken
            }
        })
        setPackages(p.data.data.packages)
    }

    const closeAd = () => {
        setShowAd(false)
    }

    const latestPosts = [
        {
            image: MockNews,
            title: 'مطالعات کارشناسی ارشد سینمایی - رنگ و فرم',
            time: '11 ساعت پیش',
            description: 'منبعی از درآمد و سوددهی شد. گرفت. صنعت ساخت و نمایش فیلم‌های متحرک تقریبًا به محض عمومی شدن، تبدیل به اولین تصاویر متحرک در اواخر دهه 0881 با ظهور فیلم عکاسی سلولوید در دسترس قرار',
            likeCount: 22,
            commentCount: 12
        },
        {
            image: MockNews,
            title: 'عنوان',
            time: '11 ساعت پیش',
            description: 'منبعی از درآمد و سوددهی شد. گرفت. صنعت ساخت و نمایش فیلم‌های متحرک تقریبًا به محض عمومی شدن، تبدیل به اولین تصاویر متحرک در اواخر دهه 0881 با ظهور فیلم عکاسی سلولوید در دسترس قرار',
            likeCount: 22,
            commentCount: 12
        },
        {
            image: MockNews,
            title: 'عنوان',
            time: '11 ساعت پیش',
            description: 'منبعی از درآمد و سوددهی شد. گرفت. صنعت ساخت و نمایش فیلم‌های متحرک تقریبًا به محض عمومی شدن، تبدیل به اولین تصاویر متحرک در اواخر دهه 0881 با ظهور فیلم عکاسی سلولوید در دسترس قرار',
            likeCount: 22,
            commentCount: 12
        },
        {
            image: MockNews,
            title: 'عنوان',
            time: '11 ساعت پیش',
            description: 'منبعی از درآمد و سوددهی شد. گرفت. صنعت ساخت و نمایش فیلم‌های متحرک تقریبًا به محض عمومی شدن، تبدیل به اولین تصاویر متحرک در اواخر دهه 0881 با ظهور فیلم عکاسی سلولوید در دسترس قرار',
            likeCount: 22,
            commentCount: 12
        },
        {
            image: MockNews,
            title: 'عنوان',
            time: '11 ساعت پیش',
            description: 'منبعی از درآمد و سوددهی شد. گرفت. صنعت ساخت و نمایش فیلم‌های متحرک تقریبًا به محض عمومی شدن، تبدیل به اولین تصاویر متحرک در اواخر دهه 0881 با ظهور فیلم عکاسی سلولوید در دسترس قرار',
            likeCount: 22,
            commentCount: 12
        }
    ]

    const comments = [
        {
            text: 'خیلی ممنون از محتوای زیباتون ممنون میشم راجب سیستم های دیگه هم ویدیو بذارید',
            time: '2 ساعت پیش',
            user: MockUser,
            username: 'Nima Kazemi'
        },
        {
            text: 'بسیار عالی بود',
            time: '11 ساعت پیش',
            user: MockAvatar,
            username: 'Saba Ahmadi'
        },
        {
            text: 'خیلی ممنون از محتوای زیباتون ممنون میشم راجب سیستم های دیگه هم ویدیو بذارید',
            time: '2 ساعت پیش',
            user: MockUser,
            username: 'Nima Kazemi'
        },
        {
            text: 'بسیار عالی بود',
            time: '11 ساعت پیش',
            user: MockAvatar,
            username: 'Saba Ahmadi'
        },
        {
            text: 'خیلی ممنون از محتوای زیباتون ممنون میشم راجب سیستم های دیگه هم ویدیو بذارید',
            time: '2 ساعت پیش',
            user: MockUser,
            username: 'Nima Kazemi'
        },
        {
            text: 'بسیار عالی بود',
            time: '11 ساعت پیش',
            user: MockAvatar,
            username: 'Saba Ahmadi'
        },
        {
            text: 'خیلی ممنون از محتوای زیباتون ممنون میشم راجب سیستم های دیگه هم ویدیو بذارید',
            time: '2 ساعت پیش',
            user: MockUser,
            username: 'Nima Kazemi'
        },

    ]
    const renderTime = (post) => {
        var updated_at = Math.floor(new Date(post.updatedAt).getTime() / 1000);
        var now = Math.floor(Date.now() / 1000);
        var diff = Math.abs(now - updated_at);
        if (diff < 60) {
            return `${diff} ثانیه پیش`
        } else if (diff < 3600) {
            return `${Math.floor(diff / 60)} دقیقه پیش`
        } else if(diff < 86400) {
            return `${Math.floor(diff / 3600)} ساعت پیش`
        }else{
            return `${Math.floor(diff / 86400)} روز پیش`

        }

    }

    return (
        <div className={styles.postPageContainer}>
            <div className={styles.rightCol}>
                <div className={styles.ad}>
                    {showAd ?
                        <>
                            <Image src={Ad} alt='' />
                            <div className={styles.closeAd} onClick={() => closeAd()}>
                                <Image src={Close} alt='' />
                            </div>
                        </>
                        : null
                    }
                </div>
                <div className={styles.profileContainer}>
                    <div className={styles.avatarContainer}>
                        <Image src={MockUser} alt='avatar' />
                    </div>
                    <div className={styles.name}>
                        {postInfo.user.firstname} {postInfo.user.lastname}
                    </div>
                    <div className={styles.status}>
                        {/* در حال ایجاد محتوا هستید */}
                    </div>
                    {memberType !== '' ?
                        null
                        :
                        <>
                            <Button classes={styles.joinButton} variant='filled'
                            >
                                <Link href={{ pathname: '/user/1/purchase', query: { paymentType: 'اشتراک', title: 'عنوان' } }} passHref>
                                    <span>حامی شوید</span>
                                </Link>
                            </Button>

                            <div className={styles.rightColContainer}>
                                <div className={styles.membershipHeader}>اشتراک ها</div>
                                {packages && packages.map((pack) => (
                                    <div className={styles.membership}>
                                        <div className={styles.membershipImage}>
                                            <Image src={GoldPlan} alt='gold-plan' />
                                        </div>
                                        <div className={styles.membershipText}>
                                            <div>{pack.title}</div>
                                            <div className={styles.membershipSubtitle}>{pack.defaultPrice}  تومان ماهیانه</div>
                                        </div>
                                    </div>
                                ))}
                                {/* <div className={styles.membership}>
                            <div className={styles.membershipImage}>
                                <Image src={SilverPlan} alt='silver-plan'/>
                            </div>
                            <div className={styles.membershipText}>
                                <div>اشتراک نقره ای</div> 
                                <div className={styles.membershipSubtitle}>30 هزار تومان ماهیانه</div>
                            </div>
                        </div>
                        <div className={styles.membership}>
                            <div className={styles.membershipImage}>
                                <Image src={BronzePlan} alt='bronze-plan'/>
                            </div>
                            <div className={styles.membershipText}>
                                <div>اشتراک برنزی</div> 
                                <div className={styles.membershipSubtitle}>10 هزار تومان ماهیانه</div>
                            </div>
                        </div> */}
                            </div>
                            <div className={styles.rightColContainer}>
                                <div className={styles.membershipHeader}>آخرین محتواها</div>
                                {latestPosts.map((post, index) => {
                                    return (
                                        <div key={index} className={styles.sidePost}>
                                            <div className={styles.postImage}>
                                                <Image src={post.image} width='47px' height='40px' alt='' />
                                            </div>
                                            <div className={styles.postText}>
                                                <div className={styles.postTitle}>{post.title}</div>
                                                <div className={styles.postTime}>{post.time}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className={styles.leftCol}>
                {type === 'video' ?
                    <iframe
                        className={styles.banner}
                        src="https://aspb22.cdn.asset.aparat.com/aparat-video/806851e3c1500641e2208a3400d70f7827115864-480p.mp4?wmsAuthSign=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjFkZmNlZmI1OWZjZDMwNTcwYTAzNTFlOTg0MTNjMjA3IiwiZXhwIjoxNjQzNjM5MzE3LCJpc3MiOiJTYWJhIElkZWEgR1NJRyJ9.utCABN8MI6kcXq0scOxZ37fac1aoM4E63sexHw3xjUk" frameBorder="2" width="100%" height="340px"></iframe>
                    :
                    <embed
                        src="http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&navpanes=0&scrollbar=0"
                        type="application/pdf"
                        frameBorder="0"
                        scrolling="auto"
                        height="610px"
                        width="667px"
                    ></embed>
                }
                <div className={styles.videoText}>
                    <div className={styles.postTitle}>{postInfo.title}</div>
                    <div className={styles.postTime}>{renderTime(postInfo)}</div>
                </div>
                <div className={styles.members}>756 مشترک</div>
                <div className={styles.videoButtons}>
                    <div className={styles.actions}>
                        <div className={styles.like}>
                            <div className={styles.icon}>
                                <Image src={Heart} alt="" />
                            </div>
                            <div className={styles.count}>{latestPosts[0].likeCount}</div>
                        </div>
                        <div className={styles.comment}>
                            <div className={styles.icon}>
                                <Image src={Comment} alt="" />
                            </div>
                            <div className={styles.count}>
                                {latestPosts[0].commentCount}
                            </div>
                        </div>
                    </div>
                    <div className={styles.more}>
                        <div>
                            <Image src={Bell} alt='' />
                        </div>
                        <div>
                            <Image src={DotsVertical} alt='' />
                        </div>
                    </div>
                </div>
                <div className={styles.lightLine}></div>
                <div className={styles.description}>{postInfo.description}</div>
                <div>{`${postInfo.commentsCount} نظر`}</div>
                <div className={styles.newComment}>
                    <div className={styles.commentAvatar}>
                        <Image src={MockAvatar} alt='' />
                    </div>
                    <div className={styles.userNewComment}>
                        <div className={styles.sendBtn}><Image src={Send} alt='' /></div>
                        <input type='text' placeholder='دیدگاه خود را وارد نمایید ...' />
                    </div>
                </div>
                {comments.map((comment, index) => {
                    return (
                        <div key={index} className={styles.comment}>
                            <div className={styles.commentAvatar}>
                                <Image src={comment.user} alt='' />
                            </div>
                            <div className={styles.commentTexts}>
                                <div className={styles.userAndTime}>
                                    <div>{comment.username}</div>
                                    <div className={styles.commentTime}>{comment.time}</div>
                                </div>
                                <div className={styles.commentText}>{comment.text}</div>
                                <div className={styles.thumbs}>
                                    <div>
                                        <Image src={ThumbUp} alt='' />
                                    </div>
                                    <div>
                                        <Image src={ThumbDown} alt='' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}


export const getStaticPaths = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export async function getStaticProps(context) {

    try {

        const pageInfo = await axios.get(`${Endpoints.baseUrl}/post/single/${context.params.id}`)

        return {
            props: {
                postInfo: pageInfo.data.data.post,
            }, // will be passed to the page component as props

        };
    }
    catch (e) {
        console.log('eeeeeeeeeeeeeeeeeeeeeeeeee', e)

        return {
            props: {
                postInfo: null
            }, // will be passed to the page component as props

        };

    }

}