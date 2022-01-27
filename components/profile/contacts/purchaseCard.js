import styles from 'styles/components/profile/contacts/PurchaseCard.module.scss';
import Button from "components/common/button";
import Image from 'next/image';
import Sadad from 'assets/images/contact/sadad.svg';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function PurchaseCard ({title}) {

    const router = useRouter()

    return (
        <div className={styles.purchaseCardContainer}>
           <div className={styles.purchaseCard}>
               <div className={styles.purchaseHeader}>
                   خرید محتوا
               </div>
               <div className={styles.title}>
                    {title}
               </div>
               <div className={styles.cardSubtitle}>
                   <div>
                   شما در حال یک خرید محتوا از
                    </div>
                    <div>mehdi sarmast</div>
                    <div>هستید.</div>
               </div>
               <Button variant='filled'
               classes={styles.payButton}
                >
                    <a>
                        <span>پرداخت</span>
                    </a>
                </Button>
                <Button variant='outline'
               classes={styles.payButton}
                >
                    <a>
                        <span>پرداخت با کیف پول</span>
                    </a>
                </Button>
                <a className={styles.cancelPay}>انصراف</a>

                <div className={styles.bottom}>
                    <div className={styles.balanceText}>
                        {'موجودی کیف پول : ' + 25 + 'هزار تومان'} 
                    </div>
                    <div className={styles.sadadImage}>
                        <Image src={Sadad}/>
                    </div>
                </div>
           </div>
                
        </div>
    )
}