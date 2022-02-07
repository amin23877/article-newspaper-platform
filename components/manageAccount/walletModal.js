import Button from "components/common/button"
import { useState } from "react"
import Sadad from 'assets/images/contact/sadad.svg';
import cardStyles from 'styles/components/profile/contacts/PurchaseCard.module.scss';
import styles from 'styles/components/manageAccount/ActivateWallet.module.scss'
import Image from "next/image"
import Link from "next/link";

export default function WalletModal ({phone, ...rest}) {

    const [step, setStep] = useState('first')
    const [subtitleText, setSubtitleText] = useState('به منظور احراز هویت شماره همراه برای فعال سازی کیف پول، کد فعال سازی به شماره همراه بالا ارسال خواهد شد.')
    const [buttonText, setButtonText] = useState('قبول شرایط و ادامه')

    return (
        <div className={cardStyles.purchaseCardContainer}>
           <div className={cardStyles.purchaseCard}>
               <div className={cardStyles.purchaseHeader}>
                   {step !== 'second' ? 'فعال سازی کیف پول' : 'سوالات متداول کیف پول'}
               </div>
               {step === 'first' ? 
               <div className={styles.title}>
                    {phone}
                </div>
                :null
                }
                <div className={styles.cardSubtitle}>
                   {subtitleText}
               </div>
               <Button variant='filled'
               classes={[cardStyles.payButton, styles.button]}
                // onClick={() => onFilledButton()}
                >
                    <a>
                        <span>
                            {buttonText}
                        </span>
                    </a>
                </Button>
                {step !== 'third' ? 
                <div className={cardStyles.cancelPay} onClick={rest.closeModal}>
                    <Link href='/manage-account' >انصراف</Link>
                </div>
                :null
                }
                {step === 'first' ? 
                <div className={styles.conditionBtn}>شرایط استفاده از کیف پول</div>
                :null
                }
                <div className={styles.sadadImage}>
                    <Image src={Sadad} alt='Sadad'/>
                </div>
           </div>
                
        </div>
    )
}