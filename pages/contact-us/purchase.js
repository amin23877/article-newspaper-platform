import MembershipPlans from "components/profile/contacts/membershipPlans";
import styles from 'styles/pages/PurchaseContact.module.scss';

export default function Purchase () {
    return (
        <div className={styles.purchaseContainer}>
            <div className={styles.subtitle}>برای دسترسی به محتوا لطفا با خرید اشتراک از مهدی حمایت کنید :)</div>
            <div className={styles.title}>سطح عضویت را انتخاب کنید</div>
            <MembershipPlans />
        </div>
    )
}