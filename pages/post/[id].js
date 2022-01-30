import styles from '/styles/pages/Post.module.scss';
import Ad from 'assets/images/post/advertisement.png';
import Image from 'next/image';
import Link from 'next/link';
import MockAvatar from 'assets/images/mock-avatar.png';
import Button from "components/common/button";
import BronzePlan from 'assets/images/contact/bronze-plan.svg'
import SilverPlan from 'assets/images/contact/silver-plan.svg'
import GoldPlan from 'assets/images/contact/gold-plan.svg'
import {useUser} from "hooks/useUser";
import { useEffect } from 'react';

export default function Post () {

    const [user, getUser, hasInitialized, memberType] = useUser()

    useEffect(() => {
        getUser()
        //console.log(user)
        return
    },[])

    return (
        <div className={styles.postPageContainer}>
            <div className={styles.rightCol}>
                <div className={styles.ad}>
                    <Image src={Ad} alt='ad'/>
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

                    <div className={styles.membershipsContainer}>
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
                    </>
                    }
                </div>
            </div>
            <div className={styles.leftCol}>
                Left Column
            </div>
        </div>
    )
}

// export async function useServerSideProps(context) {

//     const [user, getUser, hasInitialized, memberType] = samin()
//     useEffect(() => {
//         if (!hasInitialized)
//             getUser()
//             //console.log(user)
//         return
//     })
//     console.log(user)

//         return {
//             props: {user}
//         }

    
// }

