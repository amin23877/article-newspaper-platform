import MembershipPlans from "components/profile/contacts/membershipPlans";
import styles from 'styles/pages/PurchaseContact.module.scss';
import {useRouter} from "next/router";
import MockAvatar from 'assets/images/contact/mock-avatar.png';
import Image from "next/image";
import PurchaseCard from "components/profile/contacts/purchaseCard";

export default function Purchase () {

    const router = useRouter()
    const {paymentType, title} = router.query

    return (
        <div className={styles.purchaseContainer}>
            <div className={styles.top}>
                <div className={styles.text}>
                    <div className={styles.subtitle}>برای دسترسی به محتوا لطفا با خرید اشتراک از مهدی حمایت کنید :)</div>
                    {paymentType === 'اشتراک طلایی' || paymentType === 'اشتراک نقره ای' || paymentType === 'اشتراک برنزی' ? 
                    <div className={styles.title}>سطح عضویت را انتخاب کنید</div>
                    :
                    <div className={styles.payTitle}>
                        {'هزینه محتوا ' + paymentType + '000' + ' تومان می باشد.'}
                    </div>
                    }
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
            {paymentType === 'اشتراک طلایی' || paymentType === 'اشتراک نقره ای' || paymentType === 'اشتراک برنزی' ? 
            <MembershipPlans />
            :
            <PurchaseCard title={title}/>
            }
        </div>
    )
}