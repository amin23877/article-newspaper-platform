import styles from "styles/components/manageAccount/OrderContainer.module.scss";
import Image from "next/image";
import Button from "components/common/button";
import Link from "next/link";

export default function OrderContainer({ order }) {
    return (
        <div className={styles.container}>
            <div className={styles.right}>
                <div className={styles.rightSide}>
                    <div className={styles.postImage}></div>
                </div>

                {order.incomeMethod === "buyPost" && (
                    <div className={`${styles.leftSide} ${styles.postLeftSide}`}>
                        <div className={styles.postUser}>
                            <div className={styles.smallUser}>
                                {/* <Image src={order.userAvatar} alt="" /> */}
                            </div>

                            <div className={styles.username}>نام کاربری</div>
                        </div>

                        <div className={styles.title}>عنوان</div>

                        <div className={styles.payment}>
                            <span>{order.amount} تومان</span>{" "}
                            {order.paymentMethod === "wallet" ? (
                                <span>از طریق کیف پول</span>
                            ) : (
                                <span>از طریق درگاه بانکی</span>
                            )}
                        </div>
                    </div>
                )}

                {order.incomeMethod === "subscribe" && (
                    <>
                        <div className={styles.rightSide}>
                            <div className={styles.avatar}>
                                <Image src={order.userAvatar} alt="" />
                            </div>
                            <div className={styles.username}>{order.username}</div>
                        </div>
                        <div className={styles.leftSide}>
                            <div className={styles.title}>{order.type}</div>
                            <div className={styles.payment}>{order.payment}</div>
                        </div>
                    </>
                )}
            </div>

            <div className={styles.left}>
                <div className={styles.time}>{order.createdAt}</div>
                {/* {order.type.title === undefined ? (
                    order.validUntil === 0 ? (
                        <Link
                            href={{
                                pathname: "/user/1/purchase",
                                query: { paymentType: "اشتراک", title: "عنوان" },
                            }}
                            passHref
                        >
                            <Button>تمدید</Button>
                        </Link>
                    ) : (
                        <div className={styles.expiration}>{`${order.validUntil} روز اعتبار`}</div>
                    )
                ) : null} */}
            </div>
        </div>
    );
}
