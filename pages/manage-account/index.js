import styles from 'styles/pages/ManageAccount.module.scss';
import { useState, useEffect } from "react";
import {useRouter} from "next/router";
import {useUser} from "hooks/useUser";
import ArrowLeft from 'assets/svg/common/arrow-left.svg';
import PersonalInfo from 'components/manageAccount/personalInfo';
import OrderList from 'components/manageAccount/orderList';
import IncomeLog from 'components/manageAccount/incomeLog';
import WalletModal from 'components/manageAccount/walletModal';
import AnalyzeContent from 'components/manageAccount/analyzeContent';
import Modal from '@mui/material/Modal';
import Image from "next/image";

export default function ManageAccount () {

    const router = useRouter()
    const [user, getUser, hasInitialized, memberType] = useUser()
    const [activeMenu, setActiveMenu] = useState(0)

    const [open, setOpen] = useState(false); // Modal to activate wallet
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const loadMenuPage = () => {
        switch(activeMenu) {
            case 0:
                return <PersonalInfo user={user}/>
            case 1:
                return <OrderList />
            case 2: 
                return <IncomeLog />
            case 3: 
                return <AnalyzeContent />
        }
    }

    return (
        <div className={styles.manageAccountPage}>
            <div className={styles.container}>
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
                    <div className={styles.statusValue} onClick={() => handleOpen()}>
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
            <div className={styles.leftCol}>
                {loadMenuPage()}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title2"
                aria-describedby="modal-modal-description2"
            >
                <div className={styles.modalContainer}>
                    <WalletModal phone={user !== undefined ? user.msisdn : ''} 
                    closeModal={handleClose}
                    />
                </div>
                
            </Modal>
            </div>
        </div>
    )
}