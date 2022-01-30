import styles from '/styles/pages/Post.module.scss';
import Ad from 'assets/images/post/advertisement.png';
import Image from 'next/image';
import Link from 'next/link';
import MockAvatar from 'assets/images/mock-avatar.png';
import Button from "components/common/button";
import BronzePlan from 'assets/images/contact/bronze-plan.svg'
import SilverPlan from 'assets/images/contact/silver-plan.svg'
import GoldPlan from 'assets/images/contact/gold-plan.svg'
import Close from 'assets/images/post/close.svg';
import MockNews from 'assets/images/953473320video.png'
import {useUser} from "hooks/useUser";
import { useEffect, useState } from 'react';

export default function Post () {

    const [user, getUser, hasInitialized, memberType] = useUser()
    const [showAd, setShowAd] = useState(true)

    useEffect(() => {
        getUser()
        //console.log(user)
        return
    },[])

    const closeAd = () => {
        setShowAd(false)
    }

    const latestPosts = [
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

    return (
        <div className={styles.postPageContainer}>
            <div className={styles.rightCol}>
                <div className={styles.ad}>
                    {showAd ? 
                    <>
                    <Image src={Ad} alt='' />
                    <div className={styles.closeAd} onClick={() => closeAd()}>
                        <Image src={Close} alt=''/>
                    </div>
                    </>
                    :null
                    }
                </div>
                <div className={styles.profileContainer}>
                    <div className={styles.avatarContainer}>
                        <Image src={MockAvatar} alt='avatar'/>
                    </div>
                    <div className={styles.name}>
                        {user !== undefined ?
                        user.username ?? 'کاربر میهمان'
                        :null
                        }
                    </div>
                    <div className={styles.status}>
                        در حال ایجاد محتوا هستید
                    </div>
                    {memberType !== '' ? 
                    null
                    :
                    <>
                    <Button classes={styles.joinButton} variant='filled'
                    >
                        <Link href={{ pathname: '/user/1/purchase', query: {paymentType: 'اشتراک', title: 'عنوان'}}} passHref>
                            <span>حامی شوید</span>
                        </Link>
                    </Button>

                    <div className={styles.rightColContainer}>
                        <div className={styles.membershipHeader}>اشتراک ها</div>
                        <div className={styles.membership}>
                            <div className={styles.membershipImage}>
                                <Image src={GoldPlan} alt='gold-plan'/>
                            </div>
                            <div className={styles.membershipText}>
                                <div>اشتراک طلایی</div> 
                                <div className={styles.membershipSubtitle}>60 هزار تومان ماهیانه</div>
                            </div>
                        </div>
                        <div className={styles.membership}>
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
                        </div>
                    </div>
                    <div className={styles.rightColContainer}>
                        <div className={styles.membershipHeader}>آخرین محتواها</div>
                        {latestPosts.map((post, index) => {
                            return (
                                <div key={index} className={styles.sidePost}>
                                    <Image className={styles.postImage} src={post.image} width='47px' height='40px' alt=''/>
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
                <iframe
                className={styles.banner} 
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" frameBorder="2" width="697px" height="340px"></iframe>
            </div>
        </div>
    )
}


