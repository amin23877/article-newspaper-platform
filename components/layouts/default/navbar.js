import styles from 'styles/components/layouts/default/Navbar.module.scss'
import ActiveLink from "components/common/active-link";
import UniversalSearch from "./UniversalSearch";
import Button from "components/common/button";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";
import {useUser} from "hooks/useUser";
import {useEffect} from "react";

import MockAvatar from "assets/images/mock-avatar.png";

export default function Navbar() {
    const { pathname, asPath } = useRouter()

    const [user, getUser, hasInitialized] = useUser()

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
                                    <Button classes={styles.loginButton} variant='outline'>
                                        <Link href='/login'>
                                            <a>
                                                ورود
                                            </a>
                                        </Link>
                                    </Button>
                                    <Button>
                                        ثبت نام
                                    </Button>
                                </div>
                        ) :
                        ''
                    }
                    {user ?
                        (
                            <div className={styles.leftCol}>
                                <Link href='/profile'>
                                    <a>
                                        <div className={styles.profileInfo}>
                                            <div className={styles.name}>{user.username ?? 'کاربر میهمان'}</div>
                                            <div className={styles.profilePic}>
                                                <Image src={MockAvatar} />
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        )
                        : ''
                    }
                </div>
            </div>
        </div>
    )
}
