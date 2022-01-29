import styles from 'styles/components/profile/contacts/MembershipPlans.module.scss';
import BronzePlan from 'assets/images/contact/bronze-plan.svg'
import SilverPlan from 'assets/images/contact/silver-plan.svg'
import GoldPlan from 'assets/images/contact/gold-plan.svg'
import Button from "components/common/button";
import Image from 'next/image';
import Cookies from 'js-cookie';
import {useRouter} from 'next/router';

export default function MembershipPlans ({openModal}) {

    const router = useRouter()

    const onJoinMembership = (membershipType, cost) => {
        // Cookies.set('membership', `${membershipType}`)
        openModal(membershipType, cost)
    }


    const memberships = [
        {
            title: 'اشتراک برنزی',
            image: BronzePlan,
            cost : 10,
            subtitle: 'اشتراک عادی',
            features: ['مشاهده محتوا', 'نظرات']
        },
        {
            title: 'اشتراک نقره ای',
            image: SilverPlan,
            cost: 30,
            subtitle: 'اشتراک معمولی',
            features: ['مشاهده محتوا', 'نظرات', 'اشتراک گذاری محتوا']
        },
        {
            title: 'اشتراک طلایی',
            image: GoldPlan,
            cost: 60,
            subtitle: 'اشتراک VIP',
            features: ['مشاهده محتوا', 'نظرات', 'اشتراک گذاری محتوا', 'دانلود محتوا']
        }
    ]

    return (
        <div className={styles.membershipContainer}>
            {memberships.map((membership => (
                <div className={styles.membership} key={membership.title}>
                    <div className={styles.membershipTitle}>
                        {membership.title}
                    </div>
                    <div className={styles.image}>
                        <Image src={membership.image} alt=""/>
                    </div>
                    <div className={styles.cost}>
                        {`${membership.cost} هزار تومان ماهیانه`}
                    </div>
                    <div className={styles.subtitle}>
                        {membership.subtitle}
                    </div>
                    <ul className={styles.features}>
                        {membership.features.map(((feature, index) => (
                            <li key={index}>{feature}</li>
                        )))}
                    </ul>
                    <Button classes={styles.addContentButton} onClick={() => onJoinMembership(membership.title, membership.cost)}
                    >
                        <a>
                            <span>ملحق شوید</span>
                        </a>
                    </Button>
                </div>
            )))}
        </div>
    )
}