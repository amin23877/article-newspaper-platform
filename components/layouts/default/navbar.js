import styles from 'styles/components/layouts/default/Navbar.module.scss'
import ActiveLink from "components/common/active-link";
import UniversalSearch from "./UniversalSearch";
import Button from "components/common/button";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";
import {useUser} from "hooks/useUser";
import {useEffect, useState} from "react";
import Popup from "components/common/popup";
import MockAvatar from "assets/images/mock-avatar.png";
import UserIcon from "../../../assets/svg/popup/user.svg";
import CreditCardIcon from "../../../assets/svg/popup/credit-card.svg";
import UsersIcon from "../../../assets/svg/popup/users.svg";
import SettingIcon from "../../../assets/svg/popup/settings.svg";
import InfoIcon from "../../../assets/svg/popup/info.svg";
import SlashIcon from "../../../assets/svg/popup/slash.svg";

export default function Navbar() {
    const { pathname, route } = useRouter()

    const [user, getUser, hasInitialized] = useUser()
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        if (!hasInitialized)
            getUser()
        return
    })

    useEffect(() => {
        if (showPopup)
            setShowPopup(false)
        return
    },[route])

    const links = [
        {route: '/', text: 'خانه'},
        {route: '/newspaper', text: 'روزنامه'},
        {route: '/journal', text: 'مجله'},
        {route: '/video', text: 'ویدئو'},
        {route: '/podcast', text: 'پادکست'},
        {route: '/article', text: 'مقاله'},
    ]

    const popupItems = [
        {text: 'صفحه شما', icon: UserIcon, action: () => {}, link: '/profile'},
        {text: 'خرید ها و عضویت', icon: CreditCardIcon, action: () => {}},
        {text: 'تعویض حساب', icon: UsersIcon, action: () => {}},
        {text: 'تنظیمات', icon: SettingIcon, action: () => {}},
        {text: 'راهنما', icon: InfoIcon, action: () => {}},
        {text: 'خروج از حساب', icon: SlashIcon, action: () => {}},
    ]

    return (
        <div className={`${styles.boxContainer} w-100`}>
            <div className="container h-100">
                <div className={styles.contentContainer}>
                    <div className={styles.rightCol}>
                        <div className={styles.logo}>
                            <Link href='/'>
                                <a>
                                    دیجی نشر
                                </a>
                            </Link>
                        </div>
                        <div className={styles.linksContainer}>
                            {links.map((link, index) => {
                                return (
                                    <ActiveLink key={index} activeClassName={styles.activeLink} href='/' as={link.route}>
                                        <a className={styles.linkItem}>{link.text}</a>
                                    </ActiveLink>
                                )
                            })}
                        </div>
                        <div>
                            <UniversalSearch />
                        </div>
                    </div>
                    {
                        pathname !== '/login' && pathname !== '/signup' && !user ?
                            (
                                <div className={styles.leftCol}>
                                    <Button classes={styles.loginButton} variant='filled'>
                                        <Link href='/login'>
                                            <a>
                                                ورود
                                            </a>
                                        </Link>
                                    </Button>
                                    {/* <Button>
                                        ثبت نام
                                    </Button> */}
                                </div>
                        ) :
                        ''
                    }
                    {user ?
                        (
                            <div className={styles.leftCol}>
                                <a>
                                    <div className={styles.profileInfo} onClick={() => {
                                        if (showPopup) {
                                            setShowPopup(false)
                                        }
                                        else setShowPopup(true)
                                    }}>
                                        <div className={styles.name}>{user.username ?? 'کاربر میهمان'}</div>
                                        <div className={styles.profilePic}>
                                            <Image src={MockAvatar} alt='avatar'/>
                                        </div>
                                        {showPopup ? 
                                        <Popup popupSet={setShowPopup} containerClass={styles.popup} items={popupItems}>
                                        <div className={styles.popupHeader}>
                                            <div className={styles.popupAvatar}>
                                                <Image src={MockAvatar} alt='avatar'/>
                                            </div>
                                            <div className={styles.headerTexts}>
                                                <div className={styles.headerUsername}>{user.username ?? 'کاربر میهمان'}</div>
                                                <Link href='/' passHref><div className={styles.headerLink}>مدیریت حساب دیجی نشر</div></Link>
                                            </div>
                                        </div>
                                        </Popup>
                                         :
                                         ''}
                                    </div>
                                </a>
                            </div>
                        )
                        : ''
                    }
                </div>
            </div>
        </div>
    )
}
