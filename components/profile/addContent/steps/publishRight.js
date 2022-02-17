
import styles from 'styles/components/profile/addContent/steps/PublishRight.module.scss'
import Button from "components/common/button";
import WrapperCard from "components/profile/addContent/wrapper-card";
import CurrencyInput from 'react-currency-input-field';

import { useState, useEffect } from 'react'
import Image from "next/image";
import ImagePlaceholder from "assets/svg/common/image-upoad-placeholder.svg";

import { DatePicker } from "jalali-react-datepicker";
import { getThemeProps } from '@mui/system';

export default function PublishRight({ onSumbit }) {

    const [sharePolicy, setSharePolicy] = useState('')
    const [price, setPrice] = useState(0)
    const [timing, setTiming] = useState(false)
    const [publishTime, setPublishTime] = useState()

    // const publishRightHandler = ()=>{
    //      setSharePolicy(props.sharePolicy)
    // }
    const selectDate = ({ value }) => {
        console.log("start ", value);
        setPublishTime(value)
    }
    return (
        <div className={styles.publishRightContainer}>
            <WrapperCard className={styles.wrapper} title="اشتراک محتوا" description='محتوایتان را به یکی از روش های زیر به اشتراک بگذارید. بیشتر بدانید'>
                <div className={styles.content}>
                    <div className={styles.buttonsContainer}>
                        <Button onClick={() => setSharePolicy('free')} variant={sharePolicy === 'free' ? 'filled' : 'outline'}>رایگان</Button>
                        <Button onClick={() => setSharePolicy('subscription')} variant={sharePolicy === 'subscription' ? 'filled' : 'outline'}>خرید اشتراک</Button>
                        <Button onClick={() => setSharePolicy('payment')} variant={sharePolicy === 'payment' ? 'filled' : 'outline'}>پرداخت</Button>
                    </div>
                </div>
            </WrapperCard>
            <WrapperCard className={styles.wrapper} title="پرداخت" description='هزینه دسترسی به محتوایتان را تعیین کنید.بیشتر بدانید'>
                <div className={styles.content}>
                    <div className={styles.inputContainer}>
                        <CurrencyInput
                            className={styles.currencyInput}
                            disabled={sharePolicy !== 'payment' ? 'disabled' : ''}
                            id="price"
                            name="price"
                            placeholder="قیمت خود را وارد کنید"
                            defaultValue={0}
                            decimalsLimit={2}
                            value={price}
                            onValueChange={(value, name) => setPrice(value)}
                        />
                        <span className={styles.label}>تومان</span>
                    </div>
                </div>
            </WrapperCard>
            <div className={styles.description}>
                پس از بارگزاری محتوا باید راهبر سایت آن را تایید کرده سپس محتوا بعد از 24 ساعت در صفحه شخصیتان قابل مشاهده می‌باشد.<br /> شما میتوانید زمان انتشار محتوایتان را تعیین نمایید.
            </div>
            <div className={styles.dateSelectionContainer}>
                <div className={styles.header}>
                    <div className={styles.title}>زمان نمایش محتوا را تعیین می کنم.</div>
                    <div className={styles.selectContainer}>
                        <div className={styles.inputWrapper}>
                            <input checked={timing} onChange={(e) => setTiming(true)} name='time' id='yes' type="radio" />
                            <label htmlFor="yes">بله</label>
                        </div>
                        <div className={styles.inputWrapper}>
                            <input checked={!timing} onChange={(e) => setTiming(false)} name='time' id='no' type="radio" />
                            <label htmlFor="no">نه</label>
                        </div>
                    </div>
                </div>
                {
                    timing && <>
                        <div className={styles.desc}>
                            تاریخ نمایش محتوایتان را تعیین نمایید.
                        </div>

                        <DatePicker onClickSubmitButton={selectDate} disabled={sharePolicy !== 'payment' ? 'disabled' : ''} className={styles.datePicker} open={true} />
                    </>
                }
            </div>
            <div className={styles.buttonContainer}>
                <Button classes={styles.button} onClick={() => onSumbit(sharePolicy, price, timing, publishTime)}>
                    تایید
                </Button>
            </div>
        </div>
    )
}

{/*<div className={styles.buttonsContainer}>*/ }
{/*    <Button variant='outline'>تاریخ</Button>*/ }
{/*    <Button variant='outline'>زمان</Button>*/ }
{/*</div>*/ }



