import MembershipPlans from "components/profile/contacts/membershipPlans";
import styles from 'styles/pages/PurchaseContact.module.scss';
import {useRouter} from "next/router";
import MockAvatar from 'assets/images/contact/mock-avatar.png';
import Image from "next/image";

export default function Purchase () {

    const router = useRouter()
    const {paymentType} = router.query
    console.log(paymentType)

    return (
        <div className={styles.purchaseContainer}>
            <div className={styles.top}>
                <div className={styles.text}>
                    <div className={styles.subtitle}>برای دسترسی به محتوا لطفا با خرید اشتراک از مهدی حمایت کنید :)</div>
                    <div className={styles.title}>سطح عضویت را انتخاب کنید</div>
                </div>
                <div className={styles.avatarContainer}>
                    
                    <div className={styles.image}>
                        <Image src={MockAvatar}/>
                    </div>
                    
                    <span className={styles.name}>
                        mehdi sarmast
                    </span>
                </div>
            </div>
            <MembershipPlans />
        </div>
    )
}