import React, { useState } from "react";
import styles from "styles/components/manageAccount/UserInformationSummary.module.scss";
import Image from "next/image";
import ArrowLeft from "assets/svg/common/arrow-left.svg";
import { updateUser } from "hooks/useUser";
import { useRouter } from "next/router";
import PayOptions from "components/payOptions/PayOptions";
import Text from "components/common/typography/text";

const payInfo = {
  paymentAmount: 5,
  paymentType: "increasePay",
  title: "افزایش اعتبار",
  postId: 0,
  username: 0,
  step: "chargeWallet",
};

function UserInformationSummery({ user }) {
  const router = useRouter();

  const [openPay, setOpenPay] = useState(false);

  const setContentProvider = async (state) => {
    const status = await updateUser({
      isContentProvider: !state,
    });
    if (status === "ok") {
      alert("اطاعات با موفقیت ویرایش شد.");
      router.reload();
    }
  };

  return (
    user && (
      <>
        <Text color="primary" size="xxl" weight="bold">
          {user.username}
          خوش آمدید
        </Text>

        {user.isContentProvider ? (
          <Text
            size="xl"
            className={styles.providerTitle}
            onClick={() => setContentProvider(user.isContentProvider)}
          >
            شما ناشر هستید.
          </Text>
        ) : (
          <Text
            size="xl"
            color="primary"
            className={`${styles.providerTitle} ${styles.notProviderTitle}`}
            onClick={() => setContentProvider(user.isContentProvider)}
          >
            میخواهم ناشر باشم.
          </Text>
        )}

        <div className={styles.status}>
          <Text weight="bold">امتیاز شما</Text>
          <div className={styles.statusValue}>{`${0} امتیاز`}</div>
        </div>

        <div onClick={() => setOpenPay(true)} className={styles.status}>
          <Text className={styles.statusTitle}>
            کیف پول
            <div className={styles.balance}>
              {`${user.balance ?? 0} هزار تومان`}
            </div>
          </Text>

          <div className={styles.statusValue}>
            افزایش اعتبار کیف پول
            <div className={styles.iconContainer}>
              <Image src={ArrowLeft} alt="" />
            </div>
          </div>
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
      </>
    )
  );
}

export default UserInformationSummery;
