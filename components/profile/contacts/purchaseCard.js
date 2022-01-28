import styles from 'styles/components/profile/contacts/PurchaseCard.module.scss';
import Button from "components/common/button";
import CustomInput from "components/common/input";
import Image from 'next/image';
import Sadad from 'assets/images/contact/sadad.svg';
import ChevronRightLight from 'assets/svg/common/chevron-right-light.svg';
import Plus from "assets/images/contact/plus.svg";
import Minus from "assets/images/contact/minus.svg";
import CheckCircle from "assets/images/contact/check-circle.svg";

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import {useForm} from "react-hook-form";
import { useRouter } from 'next/router';

export default function PurchaseCard ({balance, paymentType, paymentAmount, title}) {

    const { register: amountFormRegister, handleSubmit: handlePhoneSubmit, formState: {isValid: isPhoneValid}  } = useForm();

    const router = useRouter()

    const [step, setStep] = useState('default')
    const [headerText, setHeaderText] = useState('')
    const [titleText, setTitleText] = useState(title)
    const [subTitleText, setSubtitleText] = useState('')
    const [outlinedButton, setOutlinedButton] = useState('')
    const [filledButton, setFilledButton] = useState('')
    const [amount, setAmount] = useState(paymentAmount)

    const payWithWallet = () => {
        setStep('useWallet')
    }

    const onChargeWallet = () => {
        if (balance >= paymentAmount) {
            router.replace('/contact-us')
        }
        else setStep('chargeWallet')
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
                if (balance < paymentAmount) {
                    header = 'موجودی کافی نمی باشد'
                    titleText = `${paymentAmount} هزار تومان بابت خرید محتوا`
                    subTitle = 'شما در حال خرید یک محتوا از mehdi sarmast هستید.'
                    outlinedButton = 'پرداخت از درگاه'
                    filledButton = 'شارژ کیف پول'
                }
                else {
                    filledButton = 'بازگشت به صفحه اصلی'
                    subTitle = `${paymentAmount} هزار تومان بابت خرید محتوا`
                }
                break
            case 'chargeWallet': 
                header = 'افزایش موجودی'
                titleText = `افزایش اعتبار : ${amount} هزار تومان`
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

    const changeAmount = (type, moneyAmount) => {
        if (type === 'plus') {
            setAmount(amount + 1)
        }
        else if(type === 'minus') {
            if (amount - 1 >= 0) {
                setAmount(amount - 1)
            }
        }
        else {
            setAmount(moneyAmount)
        }
    }

    useEffect(() => {
        setTitleText(title)
        setAmount(paymentAmount)
        console.log('balance: ', balance, 'amount: ', paymentAmount )
        setTexts()
    },[step, amount, title, paymentAmount, balance])

    return (
        <div className={styles.purchaseCardContainer}>
           <div className={styles.purchaseCard}>
               {step === 'useWallet' && balance >= paymentAmount ?
               <>
               <div className={styles.checkCircle}>
                   <Image src={CheckCircle} />
               </div>
               <span className={styles.successTitle}>پرداخت با موفقیت  انجام شد.</span>
               </>
               :
               <div className={styles.purchaseHeader}>
                   {headerText}
               </div>
                }
               {(step === 'default' || (step === 'useWallet' && balance >= paymentAmount)) ? 
                null
                :
                <div className={styles.stepBack} onClick={() => onGoBack()}>
                    <span className={styles.iconContainer}>
                        <Image src={ChevronRightLight}/>
                    </span>
                        <span>
                        بازگشت به مرحله قبل
                    </span>
                </div>
                }
                {(step === 'useWallet' && balance >= paymentAmount) ?
                null:
                <div className={styles.title}>
                    {titleText}
                </div>
                }
               <div className={styles.cardSubtitle}>
                   {subTitleText}
               </div>

                {/** choose amount to charge the wallet */}
               {step === 'chargeWallet' ? 
               <>
               <div className={styles.amountContainer}>
                <div className={`${styles.amountButtons} ${styles.plus}`}
                onClick={() => changeAmount('plus')}
                ><Image src={Plus} /></div>
                <CustomInput register={amountFormRegister} name="amount"
                value={`${amount} هزار تومان`} 
                classes={styles.amountInput}
                validation={{required: true}} 
                />
                <div className={`${styles.amountButtons} ${styles.minus}`}
                onClick={() => changeAmount('minus')}
                ><Image src={Minus} /></div>
               </div>
               <span className={styles.walletHint}>مبلغ وارد شده باید حداقل 5 هزار تومان باشد.</span>
               <div className={styles.amountButtons}>
                   <Button variant='outline'
                   onClick={() => changeAmount('amount', 100)}
                   classes={styles.amountBtn}
                    >
                        <a>
                            <span>
                                100 هزار تومان
                            </span>
                        </a>
                    </Button>
                    <Button variant='outline'
                    onClick={() => changeAmount('amount', 100)}
                   classes={styles.amountBtn}
                    >
                        <a>
                            <span>
                                100 هزار تومان
                            </span>
                        </a>
                    </Button>
                    <Button variant='outline'
                    onClick={() => changeAmount('amount', 100)}
                   classes={styles.amountBtn}
                    >
                        <a>
                            <span>
                                100 هزار تومان
                            </span>
                        </a>
                    </Button>
               </div>
               </>
               :null
               }

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
                
                {step === 'default' || (step === 'useWallet' && balance < paymentAmount) ? 
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
                <a href='/contact-us' className={styles.cancelPay}>انصراف</a>

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