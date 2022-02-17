import Button from "components/common/button";
import styles from "styles/components/manageAccount/Messages.module.scss"
import SearchIcon from 'assets/svg/common/search.svg'
import MockUser from 'assets/images/contact/mock-avatar.png'
import Image from "next/image"
import DownArrow from "assets/svg/common/chevron-down.svg"
import { useState } from "react";

export default function Messages () {

    const [activeIndex, setActiveIndex] = useState(1)
    const [activeMessage, setActiveMessage] = useState(0)

    const messages = [
        {
            username: 'Mahdi Azari',
            image: MockUser,
            time: '11 ساعت پیش',
            message: 'با سلام، اطلاعات حسابتان را تکمیل نمایید.',
            reply: ''
        },
        {
            username: 'Mahdi Azari',
            image: MockUser,
            time: '1 ماه پیش',
            message: 'با سلام، اطلاعات حسابتان را تکمیل نمایید.',
            reply: 'با تشکر از اطلاع رسانی شما'
        },
        {
            username: 'Mahdi Azari',
            image: MockUser,
            time: '4 ماه پیش',
            message: 'با سلام، اطلاعات حسابتان را تکمیل نمایید.',
            reply: ''
        },
        {
            username: 'Mahdi Azari',
            image: MockUser,
            time: '4 ماه پیش',
            message: 'با سلام، اطلاعات حسابتان را تکمیل نمایید.',
            reply: ''
        },
    ]

    const changeTab = (index) => {
        setActiveIndex(index)
    }
    return (
        <>
            <Button classes={styles.newMsgBtn}>
                پیام جدید
            </Button>
            <div className={styles.searchContainer}>
                <div className={styles.search}>
                    <div className={styles.searchIcon}>
                        <Image src={SearchIcon} alt=""/>
                    </div>
                    <input className={styles.searchInput} placeholder='جستجوی پیام ها' />
                </div>
                <div className={styles.filter}>
                    زمان
                    <div className={styles.arrow}>
                        <Image src={DownArrow} alt='' className={styles.arrow}/>
                    </div>
                </div>
                <div className={styles.filter}>
                    نوع
                    <div className={styles.arrow}>
                        <Image src={DownArrow} alt='' className={styles.arrow}/>
                    </div>
                </div>
                <div className={styles.filter}>
                    موضوع
                    <div className={styles.arrow}>
                        <Image src={DownArrow} alt='' className={styles.arrow}/>
                    </div>
                </div>
                <div className={styles.filter}>
                    برچسب
                    <div className={styles.arrow}>
                        <Image src={DownArrow} alt='' className={styles.arrow}/>
                    </div>
                </div>
            </div>

            <div className={styles.tabs}>
                <div className={`${styles.tab} ${activeIndex === 1 ? styles.active : styles.normal}`} onClick={() => changeTab(1)}>
                    <div>پیام های ورودی</div>
                    <span>12</span>
                </div>
                <div className={`${styles.tab} ${activeIndex === 2 ? styles.active : styles.normal}`} onClick={() => changeTab(2)}>
                    <div>پیام های خروجی</div>
                    <span>782</span>
                </div>
                <div className={`${styles.tab} ${activeIndex === 3 ? styles.active : styles.normal}`} onClick={() => changeTab(3)}>
                    <div>بایگانی</div>
                    <span>251</span>
                </div>
            </div>

            <div className={styles.messageList}>
                {messages.map((message, index) => {
                    return (
                        <div className={styles.messageContainer} key={index}>
                            <div className={styles.info}>
                                <div className={styles.user}>
                                    <div className={styles.avatar}>
                                        <Image src={message.image} alt=''/>
                                    </div>
                                    <div>{message.username}</div>
                                </div>
                                <div className={styles.time}>{message.time}</div>
                            </div>
                            <div className={styles.message}>
                                {message.message}
                            </div>
                            <div className={styles.reply}>
                                {message.reply !== '' ? 
                                `پاسخ : ${message.reply}`
                                :null
                                }
                            </div>
                            {activeMessage === index ? 
                            <div className={styles.buttons}>
                                <Button>
                                    تایید
                                </Button>
                                <Button variant='outline'>
                                    بایگانی
                                </Button>
                            </div>
                            :null
                            }
                        </div>
                    )
                })}
            </div>
        </>
    )
}