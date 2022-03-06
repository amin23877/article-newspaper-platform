import styles from 'styles/pages/ManageAccount.module.scss';
import { useState, useEffect } from "react";
import {useRouter} from "next/router";
import {useUser, updateUser} from "hooks/useUser";
import ArrowLeft from 'assets/svg/common/arrow-left.svg';
import PersonalInfo from 'components/manageAccount/personalInfo';
import OrderList from 'components/manageAccount/orderList';
import IncomeLog from 'components/manageAccount/incomeLog';
import WalletModal from 'components/manageAccount/walletModal';
import AnalyzeContent from 'components/manageAccount/analyzeContent';
import Doners from 'components/manageAccount/doners';
import Messages from 'components/manageAccount/messages';
import Modal from '@mui/material/Modal';
import Image from "next/image";
import { getUserProfile } from 'shared/users';
import cookie from 'cookie'
import axios from 'axios';
import { Endpoints } from 'utils/endpoints';
import Followers from "components/manageAccount/followers";
import Followings from "components/manageAccount/followings";
export default function ManageAccount({ user }) {

    const router = useRouter()
    // const [user, getUser, hasInitialized, memberType] = useUser()
    const [activeMenu, setActiveMenu] = useState(0)

    const [open, setOpen] = useState(false); // Modal to activate wallet
    const [messages, setMessages] = useState(); // Modal to activate wallet
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const getMessages = async () => {
        try {
            const { accessToken } = cookie.parse(document?.cookie)
            let msgs = await axios.get(Endpoints.baseUrl + `/user/supportMessages?start=0&limit=1000`, {
                headers: {
                    authorization: accessToken
                }
            })
            setMessages(msgs.data.data.messages)
        } catch (e) {
            console.log(e)
        }
    }
    const sendMessage = async (title = 'support', text) => {
        try {
            const { accessToken } = cookie.parse(document?.cookie)
            let msgs = await axios.post(Endpoints.baseUrl + `/user/supportMessage`, {
                title: title,
                text: text
            }, {
                headers: {
                    authorization: accessToken
                }
            })
            getMessages()
        } catch (e) {
            console.log(e)
        }
    }

    let menuItems = []

    if (user !== undefined && user.isContentProvider) {
        menuItems = [
            'اطلاعات شخصی',
            'لیست سفارش ها',
            'گزارش مالی',
            'آنالیز محتوا',
            'حامی ها',
            'دنبال کننده ها',
            'دنبال شونده ها',
            'جستجوهای ذخیره شده',
            'پیام ها',
            'خروج'
        ]
    }
    else {
        menuItems  = [
            'اطلاعات شخصی',
            'لیست سفارش ها',
            'آنالیز محتوا',
            'دنبال کننده ها',
            'جستجوهای ذخیره شده',
            'پیام ها',
            'خروج'
        ]
    }

    const onChangeMenu = (menuIndex) => {
        setActiveMenu(menuIndex)
    }

    const setContentProvider = async (state) => {
        const status = await updateUser({
            "isContentProvider": !(state)
        })
        if (status === 'ok') {
            alert('اطاعات با موفقیت ویرایش شد.')
            router.reload()
        }
    }

    const loadMenuPage = () => {
        switch (activeMenu) {
            case 0:
                return <PersonalInfo user={user} />
            case 1:
                return <OrderList />
            case 2:
                return <IncomeLog />
            case 3:
                return <AnalyzeContent />
            case 4:
                return <Doners />
            case 5:
                return <Followers/>
            case 6:
                return <Followings/>
            case 7:
                return <Messages
                    getMessages={getMessages}
                    messages={messages}
                    sendMessage={sendMessage}
                    me={user}
                />
        }
    }

    return (
        <div className={styles.manageAccountPage}>
            <div className={styles.container}>
                <div className={styles.rightCol}>
                <div className={styles.welcomeText}>{`${user !== undefined ? user.username : ''} خوش آمدید .`}</div>
                {user !== undefined && user.isContentProvider ? 
                <div className={styles.providerTitle} onClick={() => setContentProvider(user.isContentProvider)}>
                    شما ناشر هستید.
                </div>
                :<div className={`${styles.providerTitle} ${styles.notProviderTitle}`}
                onClick={() => setContentProvider(user.isContentProvider)}>میخواهم ناشر باشم.</div>
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
                                    <Image src={ArrowLeft} alt='' />
                                </div>
                            </div>
                            : null
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
export async function getServerSideProps(context) {

    const { accessToken } = cookie.parse(context.req.headers.cookie ?? '')

    if (!accessToken) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    try {
        const { data: { data: { me } } } = await getUserProfile(accessToken)

        if (!me) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }



        return {
            props: { user: me }
        }

    }
    catch (e) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
}