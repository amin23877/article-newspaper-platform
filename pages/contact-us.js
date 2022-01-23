import Link from 'next/link'
import Image from 'next/image'
import MockAvatar from 'assets/images/contact/mock-avatar.png'
import styles from 'styles/pages/ContactUs.module.scss'
import Card from "components/common/card";
import Accordion from "components/common/accordion";
import Categories from "components/homepage/categories";
import Button from "components/common/button";
import {useRouter} from "next/router";
import {useUser} from "hooks/useUser";
import {useEffect} from "react";
import cookie from "cookie";

export default function Index() {

    const [user, getUser, hasInitialized] = useUser()

    const memberships = [
        {
            title: 'اشتراک برنزی'
        },
        {
            title: 'اشتراک نقره ای'
        },
        {
            title: 'اشتراک طلایی'
        }
    ]

    useEffect(() => {

        if (!hasInitialized)
            getUser()
        return
    })

    console.log(user)

    return (
        <div className={styles.profileContainer}>
            <div className={styles.headerContainer}>
                <div className={`${styles.buttonContainer} container`}>
                    <Button classes={styles.addContentButton}>
                        <Link href='/'>
                            <a>
                                <span>دنبال کردن</span>
                            </a>
                        </Link>
                    </Button>
                </div>
                <div className={styles.avatarContainer}>
                    <Image src={MockAvatar}/>
                </div>
            </div>
            <div className={styles.contentContainer}>
                {user ? 
                <>
                <div className={styles.name}>
                    {user.username ?? 'کاربر میهمان'}
                </div>
                <div className={styles.status}>
                    در حال ایجاد دوره های هنری، تصاویر و پادکست های آموزشی ویدیویی است
                </div>
                <div className={styles.title}>
                    انتخاب عضویت
                </div>
                </>
                :null
                }

                <div className={styles.membershipContainer}>
                    {memberships.map((membership => (
                        <div className={styles.membership}>
                            
                            <div className={styles.inputsContainer}>
                                <div className={styles.titleContainer}>
                                    {membership.title}
                                </div>
                            </div>
                            
                        </div>
                    )))}
                </div>
        
            </div>
        </div>
    )
}


