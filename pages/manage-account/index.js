import styles from "styles/pages/ManageAccount.module.scss";
import { useEffect, Fragment, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { updateUser } from "hooks/useUser";
import ArrowLeft from "assets/svg/common/arrow-left.svg";
import PersonalInfo from 'components/manageAccount/personalInfo';
import OrderList from "components/manageAccount/orderList";
import IncomeLog from "components/manageAccount/incomeLog";
import AnalyzeContent from "components/manageAccount/analyzeContent";
import Doners from "components/manageAccount/doners";
import Messages from "components/manageAccount/messages";
import Image from "next/image";
import { getUserProfile } from "shared/users";
import cookie from "cookie";
import axios from "axios";
import { Endpoints } from "utils/endpoints";
import PayOptions from "components/payOptions/PayOptions";
import Followers from "components/manageAccount/followers";
import Followings from "components/manageAccount/followings";

const payInfo = {
    paymentAmount: 5,
    paymentType: "increasePay",
    title: "افزایش اعتبار",
    postId: 0,
    username: 0,
    step: "chargeWallet",
};

export default function ManageAccount({ user }) {
    const router = useRouter();

    const { activeIndex } = router.query;

    const [messages, setMessages] = useState();

    const [activeMenu, setActiveMenu] = useState(parseInt(activeIndex) || 0);

    const [menu, setMenu] = useState([]);

    const [openPay, setOpenPay] = useState(false);

    const onChangeMenu = (menuIndex) => {
        setActiveMenu(menuIndex);
    };

    const setContentProvider = async (state) => {
        const status = await updateUser({
            isContentProvider: !state,
        });
        if (status === "ok") {
            alert("اطاعات با موفقیت ویرایش شد.");
            router.reload();
        }
    };

    const getMessages = async () => {
        try {
            const { accessToken } = cookie.parse(document?.cookie);
            let msgs = await axios.get(
                Endpoints.baseUrl + `/user/supportMessages?start=0&limit=1000`,
                {
                    headers: {
                        authorization: accessToken,
                    },
                }
            );
            setMessages(msgs.data.data.messages);
        } catch (e) {
            console.log(e);
        }
    };

    const sendMessage = useCallback(async (title = "support", text) => {
        try {
            const { accessToken } = cookie.parse(document?.cookie);
            let msgs = await axios.post(
                Endpoints.baseUrl + `/user/supportMessage`,
                {
                    title: title,
                    text: text,
                },
                {
                    headers: {
                        authorization: accessToken,
                    },
                }
            );
            getMessages();
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        setMenu([
            {
                name: "اطلاعات شخصی",
                isPublic: true,
                element: <PersonalInfo user={user} />,
            },
            {
                name: "لیست سفارش ها",
                isPublic: true,
                element: <OrderList />,
            },
            {
                name: "گزارش مالی",
                isPublic: false,
                element: <IncomeLog />,
            },
            {
                name: "آنالیز محتوا",
                isPublic: true,
                element: <AnalyzeContent />,
            },
            {
                name: "حامی ها",
                isPublic: false,
                element: <Doners />,
            },
            {
                name: "دنبال کننده ها",
                isPublic: true,
                element: <Followers />,
            },
            {
                name: "دنبال شونده ها",
                isPublic: true,
                element: <Followings />,
            },
            {
                name: "جستجوهای ذخیره شده",
                isPublic: true,
                element: null,
            },
            {
                name: "پیام ها",
                isPublic: true,
                element: (
                    <Messages
                        getMessages={getMessages}
                        messages={messages}
                        sendMessage={sendMessage}
                        me={user}
                    />
                ),
            },
        ]);
    }, [messages, sendMessage, user]);

    return (
        <div className={styles.manageAccountPage}>
            <div className={styles.container}>
                <div className={styles.rightCol}>
                    <div className={styles.welcomeText}>{`${
                        user ? user.username : ""
                    } خوش آمدید .`}</div>
                    {user && user.isContentProvider ? (
                        <div
                            className={styles.providerTitle}
                            onClick={() => setContentProvider(user.isContentProvider)}
                        >
                            شما ناشر هستید.
                        </div>
                    ) : (
                        <div
                            className={`${styles.providerTitle} ${styles.notProviderTitle}`}
                            onClick={() => setContentProvider(user.isContentProvider)}
                        >
                            میخواهم ناشر باشم.
                        </div>
                    )}

                    <div className={styles.status}>
                        <div className={styles.statusTitle}>امتیاز شما</div>
                        <div className={styles.statusValue}>{`${0} امتیاز`}</div>
                    </div>

                    <div onClick={() => setOpenPay(true)} className={styles.status}>
                        <div className={styles.statusTitle}>
                            کیف پول
                            <div className={styles.balance}>
                                {`${user !== undefined ? user.balance : 0} هزار تومان`}
                            </div>
                        </div>

                        <div className={styles.statusValue}>
                            افزایش اعتبار کیف پول
                            <div className={styles.iconContainer}>
                                <Image src={ArrowLeft} alt="" />
                            </div>
                        </div>
                    </div>

                    <ul className={styles.menuItems}>
                        {menu.map((item, index) => {
                            if (!item.isPublic && !user.isContentProvider) return null;

                            return (
                                <li
                                    key={index}
                                    onClick={() => onChangeMenu(index)}
                                    className={
                                        activeMenu === index ? styles.activeMenu : styles.menu
                                    }
                                >
                                    {item.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className={styles.leftCol}>
                    {menu.map((item, index) => (
                        <Fragment key={index}>{activeMenu === index && item.element}</Fragment>
                    ))}
                </div>

                {payInfo && (
                    <PayOptions
                        openModal={openPay}
                        setOpenModal={setOpenPay}
                        balance={user.balance}
                        paymentType={payInfo.paymentType}
                        paymentAmount={payInfo.paymentAmount}
                        title={payInfo.title}
                        me={user}
                        step={payInfo.step}
                        postId={payInfo.postId}
                        username={payInfo.username}
                    />
                )}
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { accessToken } = cookie.parse(context.req.headers.cookie ?? "");

    if (!accessToken) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    try {
        const {
            data: {
                data: { me },
            },
        } = await getUserProfile(accessToken);

        if (!me) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }

        return {
            props: { user: me },
        };
    } catch (e) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
}
