import Image from "next/image";
import MockAvatar from "assets/images/contact/mock-avatar.png";
import GoldRank from "assets/images/contact/gold-rank.svg";
import styles from "styles/pages/User.module.scss";
import Button from "components/common/button";
import Tab from "components/common/tab";
import Feed from "components/profile/tabs/feed";
import About from "components/profile/tabs/about";
import LoginModal from "components/common/login-modal";
import { useUser } from "hooks/useUser";
import { useEffect, useState } from "react";
import Instagram from "assets/svg/social-media/instagram-greeen-circle.svg";
import Twitter from "assets/svg/social-media/twitter-green-circle.svg";
import Facebook from "assets/svg/social-media/facebook-green-circle.svg";
import Linkedin from "assets/svg/social-media/linkedin-greeen-circle.svg";
import MembershipPlans from "components/profile/contacts/membershipPlans";
import PurchaseCard from "components/profile/contacts/purchaseCard";
import Modal from "@mui/material/Modal";
import cookie from "cookie";
import axios from "axios";
import { getUserProfile } from "shared/users";
import { Endpoints } from "utils/endpoints";
import Text from "components/common/typography/text";

export default function Index({ userInfo, id, accessToken }) {
  console.log("user", userInfo);

  const [followed, setFollowed] = useState(userInfo.isFollowing);
  const [membership, setMembership] = useState("");
  const [membershipCost, setMembershipCost] = useState(0);
  const [user, getUser, hasInitialized, memberType] = useUser();
  const [activeTab, setActiveTab] = useState("feed");

  const [loginOpen, setLoginOpen] = useState(false); // modal for logging in
  const handleLoginOpen = () => setOpen(true);
  const handleLoginClose = () => setOpen(false);

  const [open, setOpen] = useState(false); // Modal to pay for membership
  const handleOpen = (membership, cost) => {
    setMembershipCost(cost);
    setMembership(membership);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!hasInitialized) {
      getUser();
    }
  }, [hasInitialized, getUser]);

  const onFollow = async () => {
    if (!user) {
      handleLoginOpen();
    } else {
      await axios({
        method: !followed ? "POST" : "DELETE",
        url: Endpoints.baseUrl + `/user/follow/${id}`,
        headers: { authorization: accessToken },
      });
      setFollowed(!followed);
    }
  };

  const selectMembership = (membershipType) => {
    setMembership(membershipType);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.headerContainer}>
        <div className={`${styles.buttonContainer} container`}>
          <Button
            classes={styles.followButton}
            variant={followed ? "outline" : "filled"}
            onClick={() => onFollow()}
          >
            <a>
              <span>{followed ? "دنبال می کنید" : "دنبال کردن"}</span>
            </a>
          </Button>
        </div>
        <div className={styles.avatarContainer}>
          <Image src={userInfo.userData.coverImage || MockAvatar} alt="" />
        </div>
        {memberType.includes("اشتراک") ? (
          <div className={styles.rankContainer}>
            <Image src={GoldRank} alt="" />
          </div>
        ) : null}
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.name}>{userInfo.userData.username}</div>

        {!memberType.includes("اشتراک") ? (
          <>
            <div className={styles.title}>انتخاب عضویت</div>
            <MembershipPlans
              openModal={handleOpen}
              selectMembership={(type) => selectMembership(type)}
            />
          </>
        ) : null}

        <div className={styles.followersSection}>
          <Text style={{ margin: 0 }} weight="bold" size="xxl">
            {853} نفر دنبال کننده
          </Text>

          <div className={styles.social}>
            <a href="https://google.com">
              <Image src={Instagram} alt="" />
            </a>
            <a href="https://google.com">
              <Image src={Twitter} alt="" />
            </a>
            <a href="https://google.com">
              <Image src={Facebook} alt="" />
            </a>
            <a href="https://google.com">
              <Image src={Linkedin} alt="" />
            </a>
          </div>
        </div>

        <div className={styles.tabsContainer}>
          <Tab
            items={[
              {
                name: "feed",
                text: "محتوا",
                // content: Feed,
              },
              {
                name: "forYou",
                text: "درباره",
                // content: About
              },
            ]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div className={styles.contents}>
            {activeTab === "feed" && <Feed id={id} />}
            {activeTab === "forYou" && <About me={userInfo} />}
          </div>
        </div>
      </div>

      <LoginModal open={loginOpen} handleClose={handleLoginClose} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title2"
        aria-describedby="modal-modal-description2"
      >
        <div className={styles.modalContainer}>
          <PurchaseCard
            balance={60}
            paymentType={membership}
            paymentAmount={membershipCost}
            closeModal={handleClose}
          />
        </div>
      </Modal>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { accessToken } = cookie.parse(context.req.headers.cookie ?? "");

  try {
    const userInfo = await axios.get(
      Endpoints.baseUrl + "/user/profile/" + context.query.id,
      {
        headers: {
          authorization: accessToken,
        },
      }
    );

    return {
      props: {
        userInfo: userInfo.data.data,
        id: context.query.id,
        accessToken: accessToken,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {},
    };
  }
}
