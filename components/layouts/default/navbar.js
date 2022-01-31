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
import TrashIcon from "../../../assets/svg/popup/trash.svg";
import EyeOffIcon from "../../../assets/svg/popup/eye-off.svg";
import EditIcon from "../../../assets/svg/popup/edit.svg";
import ShareIcon from "../../../assets/svg/popup/share.svg";
import CommentsIcon from "../../../assets/svg/popup/comments.svg";
import LockIcon from "../../../assets/svg/popup/lock.svg";

export default function Navbar() {
    const { pathname, asPath } = useRouter()

    const [user, getUser, hasInitialized] = useUser()
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {

        if (!hasInitialized)
            getUser()
        return
    })

    const links = [
        {route: '/', text: 'خانه'},
        {route: '/newspaper', text: 'روزنامه'},
        {route: '/journal', text: 'مجله'},
        {route: '/video', text: 'ویدئو'},
        {route: '/podcast', text: 'پادکست'},
        {route: '/article', text: 'مقاله'},
    ]

    const popupItems = [
        {text: 'حذف', icon: TrashIcon, action: () => {}},
        {text: 'لغو نمایش', icon: EyeOffIcon, action: () => {}},
        {text: 'ویرایش', icon: EditIcon, action: () => {}},
        {text: 'به اشتراک گذاشتن', icon: ShareIcon, action: () => {}},
        {text: 'بستن نظرات', icon: CommentsIcon, action: () => {}},
        {text: 'حق نشر', icon: LockIcon, action: () => {}},
    ]

    console.log(showPopup)

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
                                        {showPopup ? <Popup popupSet={setShowPopup} containerClass={styles.popup} items={popupItems} /> : ''}
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
