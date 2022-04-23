import MembershipPlans from "components/profile/contacts/membershipPlans";
import styles from "styles/pages/PurchaseContact.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import MockAvatar from "assets/images/contact/mock-avatar.png";
import Image from "next/image";
import PurchaseCard from "components/profile/contacts/purchaseCard";
import Modal from "@mui/material/Modal";
import cookie from "cookie";
import axios from "axios";
import { Endpoints } from "utils/endpoints";
import { getUserProfile } from "shared/users";

export default function Purchase({ userInfo, accessToken, id, me, postInfo }) {
  const router = useRouter();
  const { paymentType, title } = router.query;

  console.log("postInfo", postInfo);
  console.log("userInfo", userInfo);
  const [membership, setMembership] = useState(paymentType);

  const [open, setOpen] = useState(false); // Modal to pay for membership
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const selectMembership = (membershipType) => {
    setMembership(membershipType);
  };

  return (
    <div className={styles.purchaseContainer}>
      <div className={styles.top}>
        <div className={styles.text}>
          <div className={styles.subtitle}>
            برای دسترسی به محتوا لطفا با خرید اشتراک از{" "}
            {userInfo.userData.username} حمایت کنید :)
          </div>
          {paymentType !== undefined ? (
            paymentType.includes("subscribe") ? (
              <div className={styles.title}>سطح عضویت را انتخاب کنید</div>
            ) : (
              <div className={styles.payTitle}>
                {"هزینه محتوا " + paymentType + " هزار تومان می باشد."}
              </div>
            )
          ) : null}
        </div>
        <div className={styles.avatarContainer}>
          <div className={styles.image}>
            <Image src={MockAvatar} alt="" />
          </div>

          <span className={styles.name}>{userInfo.userData.username}</span>
        </div>
      </div>
      {postInfo?.post?.paymentType[0] !== "subscribe" ? (
        <MembershipPlans
          openModal={handleOpen}
          selectMembership={(type) => selectMembership(type)}
        />
      ) : (
        <PurchaseCard
          me={me}
          postId={postInfo.post._id}
          title={postInfo.post.title}
          balance={me.balance}
          username={userInfo.userData.username}
          paymentType={"bank"}
          paymentAmount={postInfo.post.price}
          closeModal={handleClose}
        />
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title2"
        aria-describedby="modal-modal-description2"
      >
        <div className={styles.modalContainer}>
          <PurchaseCard
            me={me}
            postId={postInfo.post._id}
            title={postInfo.post.title}
            balance={me.balance}
            username={userInfo.userData.username}
            paymentType={"bank"}
            paymentAmount={postInfo.post.price}
            closeModal={handleClose}
          />
        </div>
      </Modal>
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

    const userInfo = await axios.get(
      Endpoints.baseUrl + "/user/profile/" + context.query.id,
      {
        headers: {
          authorization: accessToken,
        },
      }
    );

    const postInfo = await axios.get(
      Endpoints.baseUrl + "/post/single/" + context.query.postId,
      {
        headers: {
          authorization: accessToken,
        },
      }
    );

    return {
      props: {
        me: me,
        postInfo: postInfo.data.data,
        userInfo: userInfo.data.data,
        id: context.query.id,
        accessToken: accessToken,
      },
    };
  } catch (e) {
    console.log("errrrrr", e);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}