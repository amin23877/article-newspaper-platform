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
    const [titleText, setTitleText] = useState(title)
    const [subTitleText, setSubtitleText] = useState('')
    const [outlinedButton, setOutlinedButton] = useState('')
    const [filledButton, setFilledButton] = useState('')

    const payWithWallet = () => {
        setStep('useWallet')
    }

    const onChargeWallet = () => {
        setStep('chargeWallet')
    }

    const setTexts = () => {
        let header = ''
        let titleText = ''
        let subTitle = ''
        let outlinedButton = ''
        let filledButton = ''
        switch(step) {
            case 'default':
                header = 'خرید محتوا'
                titleText = title
                subTitle = 'شما در حال خرید یک محتوا از mehdi sarmast هستید.'
                outlinedButton = 'پرداخت با کیف پول'
                filledButton = 'پرداخت'
                break
            case 'useWallet':
                if (balance === 0) {
                    header = 'موجودی کافی نمی باشد'
                    titleText = `${paymentType} هزار تومان بابت خرید محتوا`
                    subTitle = 'شما در حال خرید یک محتوا از mehdi sarmast هستید.'
                    outlinedButton = 'پرداخت از درگاه'
                    filledButton = 'شارژ کیف پول'
                }
                break
            case 'chargeWallet': 
                header = 'افزایش موجودی'
                titleText = `افزایش اعتبار : ${50} هزار تومان`
                subTitle = 'شما در حال افزایش موجودی برای کیف پول به شماره تلفن 09333655504 هستید.'
                filledButton = 'افزایش موجودی'
                break
        }
        setHeaderText(header)
        setTitleText(titleText)
        setSubtitleText(subTitle)
        setOutlinedButton(outlinedButton)
        setFilledButton(filledButton)
    }

    const onGoBack = () => {
        switch(step) {
            case 'useWallet': 
                setStep('default')
                break
            case 'chargeWallet':
                setStep('useWallet')
                break
        }
    }

    useEffect(() => {
        setTexts()
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
                    {titleText}
               </div>
               <div className={styles.cardSubtitle}>
                   {subTitleText}
               </div>

               <Button variant='filled'
               classes={styles.payButton}
               onClick={() => onChargeWallet()}
                >
                    <a>
                        <span>
                            {filledButton}
                        </span>
                    </a>
                </Button>
                
                {step === 'default' || step === 'useWallet' ? 
                <Button variant='outline'
               classes={styles.payButton}
               onClick={() => payWithWallet()}
                >
                    <a>
                        <span>
                            {outlinedButton}
                        </span>
                    </a>
                </Button>
                :null
                }   
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