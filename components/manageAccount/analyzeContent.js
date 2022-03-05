import styles from 'styles/components/manageAccount/AnalyzeContent.module.scss'
import FilterIcon from 'assets/svg/common/filter.svg'
import NoImage from 'assets/images/manage-account/image.svg'
import EditIcon from "assets/images/manage-account/edit.svg";
import Image from 'next/image'
import Button from 'components/common/button'
import { useEffect, useState } from 'react';
import axios from 'axios'
import cookie from 'cookie'
import { Endpoints } from 'utils/endpoints';
export default function AnalyzeContent() {

    const contents = [
        {
            image: null,
            date: '1400/06/25',
            show: true,
            views: 789,
            likes: 125,
            comments: 18,
            income: 'رایگان'
        },
        {
            image: null,
            date: '1400/05/25',
            show: true,
            views: 354,
            likes: 320,
            comments: 0,
            income: 'خرید اشتراک',
            value: 3060000
        },
        {
            image: null,
            date: '1400/05/15',
            show: false,
            views: 384,
            likes: 62,
            comments: 3,
            income: 'پرداخت',
            value: 1350000
        },
        {
            image: null,
            date: '1400/04/29',
            show: true,
            views: 124,
            likes: 96,
            comments: 17,
            income: 'خرید اشتراک',
            value: 8050000
        },
    ]

    const [posts, setPosts] = useState()
    useEffect(async () => {
        const { accessToken } = cookie.parse(document?.cookie);

        let tPosts = await axios.get(Endpoints.baseUrl + '/post/me/posts', {
            headers: {
                authorization: accessToken
            }
        })
        setPosts(tPosts.data.data.posts);
    }, [])
    const putSlash = (number) => {
        const str = number.toString()
        var ret = [];
        var num = 0
        for (let i = str.length; i >= 0; i -= 3) {
            ret.push(str.substr(i, 3))

            if (str.length > num * 3 && (str.length - num * 3 < 3)) {
                ret.push(str.substr(0, str.length - num * 3))
            }
            num++
        }

        for (let i = 0; i < ret.length; i++) {
            if (ret[i] === '') {
                ret.splice(i, 1);
            }
        }

        return ret.reverse().join('/')
    }
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
        <div className={styles.container}>
            <div className={styles.title}>
                آنالیز محتوا
            </div>
            <div className={styles.box}>
                <div className={styles.filterIcon}>
                    <Image src={FilterIcon} alt='' />
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
                    <div>پسند</div>
                    <div>نظرات</div>
                    <div>درآمد</div>
                </div>
            </div>
            {posts && posts.map((content, index) => {
                return (
                    <div key={index} className={styles.contentBox}>
                        <div className={styles.imageContainer}>
                            <div className={styles.image}>
                                <div className={styles.img}>
                                    <Image width={60} height={60} loader={() => content.coverImage?.url} src={content.coverImage?.url || NoImage} alt='' />
                                </div>
                                <div className={styles.noImageText}>پیش نمایش محتوا</div>
                            </div>
                        </div>
                        <div className={styles.info}>
                            <div>{renderTime(content)}</div>
                            <div>{'show'}</div>
                            <div>{`${content.likesCount} پسند`}</div>
                            <div>{`${content.commentsCount} نظر`}</div>
                            <div className={styles.income}>
                                <div>{content.income}</div>
                                {content.value !== undefined ?
                                    <div>{`${putSlash(content.value)} تومان`}</div>
                                    : null
                                }
                            </div>
                        </div>

                        <div className={styles.item} >
                            <div className={styles.icon}>
                                <Image src={EditIcon} alt='' />
                            </div>
                            <div className={styles.text}>ویرایش</div>
                        </div>
                    </div>
                )
            })}

            <Button classes={styles.button}>
                موارد بیشتر
            </Button>
        </div>
    )
}