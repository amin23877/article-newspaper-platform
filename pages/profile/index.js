import Image from "next/image";
import Link from "next/link";
import styles from "styles/pages/Profile.module.scss";
import Button from "components/common/button";

import FolderPlus from "assets/svg/common/folder-plus.svg";
import MockAvatar from "assets/images/mock-avatar.png";
import Contacts from "components/profile/contacts/contacts";
import Instagram from "assets/svg/social-media/instagram-greeen-circle.svg";
import Twitter from "assets/svg/social-media/twitter-green-circle.svg";
import Facebook from "assets/svg/social-media/facebook-green-circle.svg";
import Linkedin from "assets/svg/social-media/linkedin-greeen-circle.svg";
import Tab from "components/common/tab";
import Feed from "components/profile/tabs/feed";
import ForYou from "components/profile/tabs/forYou";
import cookie from "cookie";
import { getUserProfile } from "shared/users";
import axios from "axios";
import { Endpoints } from "utils/endpoints";
import { useState } from "react";
import About from "components/profile/tabs/about";
import Text from "components/common/typography/text";

export default function Index({
  me,
  followers,
  followings,
  followingsCount,
  followersCount,
  tags,
}) {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div className={styles.profileContainer}>
      <div className={styles.headerContainer}>
        <div className={`${styles.buttonContainer} container`}>
          {me.isContentProvider && (
            <Button classes={styles.addContentButton}>
              <Link href="/profile/addContent">
                <a>
                  <Text color="white">افزودن محتوا</Text>
                  <span className={styles.addContentIcon}>
                    <Image layout="fill" alt="add-content" src={FolderPlus} />
                  </span>
                </a>
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.rightCol}>
          <div className={styles.userInfoContainer}>
            <div className={styles.profileContentBox}>
              <div className={styles.avatarContainer}>
                <Image layout="fill" alt="user-avatar" src={MockAvatar} />
              </div>

              <Text color="black" weight="bold" className={styles.name}>
                {me.username ?? "کاربر میهمان"}
              </Text>

              <div className={styles.status}>
                {me.isContentProvider && " در حال ایجاد محتوا هستید"}
              </div>
            </div>

            <Contacts count={followersCount} data={followers} />

            <Contacts
              type="following"
              count={followingsCount}
              data={followings}
            />

            <div className={styles.socialContainer}>
              <div className={styles.social}>
                {me?.socials?.instagram && (
                  <a href={me?.socials?.instagram}>
                    <Image src={Instagram} alt="" />
                  </a>
                )}
                {me?.socials?.twitter && (
                  <a href={me?.socials?.twitter}>
                    <Image src={Twitter} alt="" />
                  </a>
                )}
                {me?.socials?.facebook && (
                  <a href={me?.socials?.facebook}>
                    <Image src={Facebook} alt="" />
                  </a>
                )}
                {me?.socials?.linkedin && (
                  <a href={me?.socials?.linkedin}>
                    <Image src={Linkedin} alt="" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.leftCol}>
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
                  text: "برای تو",
                  // content: ForYou,
                },
                {
                  name: "about",
                  text: "درباره",
                  // content: Archive,
                },
              ]}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <div className={styles.contents}>
              {activeTab === "feed" && <Feed tags={tags} me={me} />}
              {activeTab === "forYou" && <ForYou tags={tags} me={me} />}
              {activeTab === "about" && <About me={me} />}
            </div>
          </div>
        </div>
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

    const followersReq = axios.get(
      Endpoints.baseUrl +
        "/user/followers?start=0&limit=4&sortBy=_id&sortOrder=-1",
      {
        headers: {
          authorization: accessToken,
        },
      }
    );

    const followingsReq = axios.get(
      Endpoints.baseUrl +
        "/user/followings?start=0&limit=4&sortBy=_id&sortOrder=-1",
      {
        headers: {
          authorization: accessToken,
        },
      }
    );

    const followingsCountReq = axios.get(
      Endpoints.baseUrl + "/user/followings/count",
      {
        headers: {
          authorization: accessToken,
        },
      }
    );

    const followersCountReq = axios.get(
      Endpoints.baseUrl + "/user/followers/count",
      {
        headers: {
          authorization: accessToken,
        },
      }
    );

    const tagsReq = axios.get(Endpoints.baseUrl + "/post/tags", {
      headers: {
        authorization: accessToken,
      },
    });

    const [
      {
        data: {
          data: { followers },
        },
      },
      {
        data: {
          data: { followings },
        },
      },
      {
        data: {
          data: { count: followingsCount },
        },
      },
      {
        data: {
          data: { count: followersCount },
        },
      },
      {
        data: {
          data: { tags: tags },
        },
      },
    ] = await Promise.all([
      followersReq,
      followingsReq,
      followingsCountReq,
      followersCountReq,
      tagsReq,
    ]);

    return {
      props: {
        me,
        followers,
        followings,
        followingsCount,
        followersCount,
        tags,
      },
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
