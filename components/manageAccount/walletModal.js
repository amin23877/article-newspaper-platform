import Button from "components/common/button"
import { useState, useEffect } from "react"
import Sadad from 'assets/images/contact/sadad.svg';
import ChevronRightLight from 'assets/svg/common/chevron-right-light.svg';
import CheckCircle from "assets/images/contact/check-circle.svg";
import cardStyles from 'styles/components/profile/contacts/PurchaseCard.module.scss';
import styles from 'styles/components/manageAccount/ActivateWallet.module.scss';
import Modal from '@mui/material/Modal';
import Image from "next/image"
import Link from "next/link";
import dynamic from 'next/dynamic';
import { useCountdown } from "hooks/useCountdown";
import { childNodes } from "dom-helpers";
const ReactCodeInput = dynamic(import('react-code-input'));

export default function WalletModal ({phone, ...rest}) {

    const [step, setStep] = useState('first')
    const [subtitleText, setSubtitleText] = useState('به منظور احراز هویت شماره همراه برای فعال سازی کیف پول، کد فعال سازی به شماره همراه بالا ارسال خواهد شد.')
    const [buttonText, setButtonText] = useState('قبول شرایط و ادامه')
    
    const [open, setOpen] = useState(false); // Activate walet conditions modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [seconds, formattedTime, setIsActive, reset] = useCountdown({initSeconds: 120})

    const [code, setCode] = useState('')
    const [codeError, setCodeError] = useState(false)

    useEffect(() => {
        if (step === 'first') {
            setSubtitleText('به منظور احراز هویت شماره همراه برای فعال سازی کیف پول، کد فعال سازی به شماره همراه بالا ارسال خواهد شد.')
            setButtonText('قبول شرایط و ادامه')
        }
    },[step])

    const onButtonClick = () => {
        switch(step) {
            case 'first': 
                setStep('second')
                setSubtitleText('کد فعال سازی ارسال شده با پیامک را وارد کنید.')
                setButtonText('تایید')
                setIsActive(true)
                break
            case 'second':
                if (code.length === 4) {
                    reset()
                    setStep('third')
                    setButtonText('بازگشت به صفحه اصلی')
                    setSubtitleText('برای برخورداری از مزایایی چون خرید اشتراک، پرداخت نمایش محتوا، تبلیغات و ... میتوانید از کیف پول خود استفاده کنید.')
                }
                else {
                    setCodeError(true)
                }
                break
            case 'third':
                rest.closeModal()
                break
        }
    }

    const onGoBack = () => {
        setStep('first')
    }

    const onCodeChange = async (value) => {
        if (step === 'second' && value.length === 4) {
            setCodeError(false)
        }
        await setCode(value)
        
    }

    async function onResendOtp() {
        if (seconds > 0) return
        //await onOtpRequest(userData.phone)
        reset()
    }

    return (
        <div className={cardStyles.purchaseCardContainer}>
           <div className={cardStyles.purchaseCard}>
               <div className={cardStyles.purchaseHeader}>
                   فعال سازی کیف پول
               </div>
               {step === 'third' ? 
               <>
                <div className={styles.checkCircle}>
                    <Image src={CheckCircle} alt=''/>
                </div>
                <span className={styles.successTitle}>کیف پول شما فعال شد.</span>
               </>
               :null
                }
               {step === 'second' ? 
                <div className={cardStyles.stepBack} onClick={() => onGoBack()}>
                    <span className={cardStyles.iconContainer}>
                        <Image src={ChevronRightLight} alt=''/>
                    </span>
                        <span>
                        بازگشت به مرحله قبل
                    </span>
                </div>
                :
                null
                }
               {step === 'second' ? 
               <div className={styles.modalText}>{`تایید شماره ${phone}`}</div>
               :null
                }
               {step === 'first' ? 
               <div className={styles.title}>
                    {phone}
                </div>
                :null
                }
                <div className={styles.cardSubtitle}>
                   {subtitleText}
               </div>
               {step === 'second' ? 
               <>
               <ReactCodeInput type='number' fields={4} className={styles.codeInput} onChange={(v) => onCodeChange(v)}/>
               <div className={styles.timeout}>
                    {formattedTime}
                </div>
                <div className={styles.sendAgain} onClick={() => {onResendOtp()}}>
                    ارسال مجدد کد تایید
                </div>
                {codeError ? <span className={styles.error}>کد تایید را به درستی وارد کنید.</span> : null}
               </>
               :null
                }
               <Button variant='filled'
               classes={[cardStyles.payButton, styles.button]}
                onClick={() => onButtonClick()}
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
                <div className={styles.conditionBtn} onClick={() => handleOpen()}>شرایط استفاده از کیف پول</div>
                :null
                }
                <div className={styles.sadadImage}>
                    <Image src={Sadad} alt='Sadad'/>
                </div>
           </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title2"
                aria-describedby="modal-modal-description2"
            >
                <div className={styles.modalContainer}>
                    <div className={styles.header}>سوالات متداول کیف پول</div>
                    <div className={styles.text}>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                     چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                     است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود 
                    ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال 
                    و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها 
                    شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی 
                    و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که
                     تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و
                     زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته
                     اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                     لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                     چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                     است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود 
                    ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال 
                    و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها 
                    شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی 
                    و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که
                     تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و
                     زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته
                     اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                     لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                     چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                     است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود 
                    ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال 
                    و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها 
                    شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی 
                    و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که
                     تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و
                     زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته
                     اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                     لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                     چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                     است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود 
                    ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال 
                    و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها 
                    شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی 
                    و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که
                     تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و
                     زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته
                     اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                    </div>
                </div>
                
            </Modal> 
        </div>
    )
}