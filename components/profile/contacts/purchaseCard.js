import styles from 'styles/components/profile/contacts/PurchaseCard.module.scss';
import Button from "components/common/button";
import Image from 'next/image';
import Sadad from 'assets/images/contact/sadad.svg';
import ChevronRightLight from 'assets/svg/common/chevron-right-light.svg'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PurchaseCard ({balance, paymentType, title}) {

    const router = useRouter()
    const [step, setStep] = useState('default')
    const [headerText, setHeaderText] = useState('')

    const payWithWallet = () => {
        setStep('useWallet')
    }

    const onChargeWallet = () => {
        setStep('chargeWallet')
    }

    const setHeader = () => {
        let text = ''
        switch(step) {
            case 'default':
                text = 'خرید محتوا'
                break
            case 'useWallet':
                if (balance === 0) {
                    text = 'موجودی کافی نمی باشد'
                }
                break
            case 'chargeWallet': 
                text = 'افزایش موجودی'
                break
        }
        setHeaderText(text)
    }

    const onGoBack = () => {
        switch(step) {
            case 'useWallet': 
                setStep('default')
                break
        }
    }

    useEffect(() => {
        setHeader()
    },[step])

    return (
        <div className={styles.purchaseCardContainer}>
           <div className={styles.purchaseCard}>
               <div className={styles.purchaseHeader}>
                   {headerText}
               </div>
               {step !== 'default' ? 
                <div className={styles.stepBack} onClick={() => onGoBack()}>
                    <span className={styles.iconContainer}>
                        <Image src={ChevronRightLight}/>
                    </span>
                        <span>
                        بازگشت به مرحله قبل
                    </span>
                </div>
                :null
                }
               <div className={styles.title}>
                    {step === 'default' ? 
                    `${title}`
                    :`${paymentType} هزار تومان بابت خرید محتوا`
                    }
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
                        <span>
                            {step === 'default' ?
                            'پرداخت':
                            'شارژ کیف پول'
                            }
                        </span>
                    </a>
                </Button>
                <Button variant='outline'
               classes={styles.payButton}
               onClick={() => payWithWallet()}
                >
                    <a>
                        <span>
                            {step === 'default' ?
                            'پرداخت با کیف پول':
                            'پرداخت از درگاه'
                            }
                        </span>
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