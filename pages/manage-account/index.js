import styles from 'styles/pages/ManageAccount.module.scss';
import { useState, useEffect } from "react";
import {useRouter} from "next/router";
import {useUser} from "hooks/useUser";
import MockAvatar from 'assets/images/contact/mock-avatar.png';
import ArrowLeft from 'assets/svg/common/arrow-left.svg';
import PersonalInfo from 'components/manageAccount/personalInfo';
import Image from "next/image";

export default function ManageAccount () {

    const router = useRouter()
    const [user, getUser, hasInitialized, memberType] = useUser()
    const [activeMenu, setActiveMenu] = useState(0)

    useEffect(() => {
        
        if (!hasInitialized) {
            getUser()
        }
        return
    },[hasInitialized, getUser])

    const menuItems = [
        'اطلاعات شخصی',
        'لیست سفارش ها',
        'گزارش مالی',
        'آنالیز محتوا',
        'حامی ها',
        'دنبال کننده ها',
        'جستجوهای ذخیره شده',
        'پیام ها',
        'خروج'
    ]

    const onChangeMenu = (menuIndex) => {
        setActiveMenu(menuIndex)
    }

    return (
        <div className={styles.manageAccountPage}>
            <div className={styles.rightCol}>
                <div className={styles.welcomeText}>{`${user !== undefined ? user.username : ''} خوش آمدید .`}</div>
                {user !== undefined && user.isContentProvider ? 
                <div className={styles.providerTitle}>شما ناشر هستید.</div>
                :null
                }

                <div className={styles.status}>
                    <div className={styles.statusTitle}>امتیاز شما</div>
                    <div className={styles.statusValue}>{`${0} امتیاز`}</div>
                </div>
                <div className={styles.status}>
                    <div className={styles.statusTitle}>
                        کیف پول
                        <div className={styles.balance}>
                            {`${user !== undefined ? user.balance : 0} هزار تومان`}
                        </div>
                    </div>
                    {user !== undefined && user.balance === 0 ? 
                    <div className={styles.statusValue}>
                        فعالسازی کیف پول
                        <div className={styles.iconContainer}>
                            <Image src={ArrowLeft} alt=''/>
                        </div>
                    </div>
                    :null
                    }
                </div>

                <ul className={styles.menuItems}>
                    {menuItems.map((menu, index) => {
                        return (
                            <li key={menu} 
                            onClick={() => onChangeMenu(index)}
                            className={activeMenu === index ? styles.activeMenu : styles.menu}>
                                {menu}
                            </li>
                        )
                    })}
                </ul>
                
            </div>
            <div>
                <PersonalInfo user={user}/>
            </div>
        </div>
    )
}