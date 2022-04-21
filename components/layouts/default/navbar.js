import styles from "styles/components/layouts/default/Navbar.module.scss";
import ActiveLink from "components/common/active-link";
import UniversalSearch from "./UniversalSearch";
import Button from "components/common/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUser } from "hooks/useUser";
import { useEffect, useState } from "react";
import Popup from "components/common/popup";
import MockAvatar from "assets/images/mock-avatar.png";
import UserIcon from "../../../assets/svg/popup/user.svg";
import CreditCardIcon from "../../../assets/svg/popup/credit-card.svg";
import InfoIcon from "../../../assets/svg/popup/info.svg";
import SlashIcon from "../../../assets/svg/popup/slash.svg";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "redux/users";
import Text from "components/common/typography/text";
import NavMenu from "components/layouts/default/navMenu";
import DrawerNavMenu from "components/layouts/default/drawerNavMenu";

export default function Navbar({ pages }) {
  const { pathname, route } = useRouter();

  const [getUser, hasInitialized] = useUser();
  const [showPopup, setShowPopup] = useState(false);
  const user = useSelector((state) => state.users.userInfo);
  const Dispatch = useDispatch();

  useEffect(() => {
    if (!hasInitialized) getUser();
  });

  useEffect(() => {
    if (showPopup) setShowPopup(false);
  }, [route]);

  const popupItems = [
    {
      text: "صفحه شما",
      icon: UserIcon,
      action: () => {},
      link: "/profile",
    },
    {
      text: "خرید ها و عضویت",
      icon: CreditCardIcon,
      action: () => {},
      link: "/manage-account?activeIndex=1",
    },
    {
      text: "راهنما",
      icon: InfoIcon,
      action: () => {},
      link: "/FAQ",
    },
    {
      text: "خروج از حساب",
      icon: SlashIcon,
      action: () => {
        handleLogout();
      },
    },
  ];

  const handleLogout = async () => {
    var cookies = document.cookie.split(";");
    console.log(cookies);
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    Dispatch(setUserInfo(null));
    // window.location.reload();
  };
  return (
    <div className={`${styles.boxContainer} w-100`}>
      <div className="container h-100">
        <div className={styles.contentContainer}>
          <DrawerNavMenu pages={pages} />

          <div className={styles.rightCol}>
            <Link href="/">
              <Text
                weight="bold"
                color="primary"
                size="xxl"
                className={styles.logo}
              >
                دیجی نشر
              </Text>
            </Link>

            <NavMenu pages={pages} />

            <div>
              <UniversalSearch />
            </div>
          </div>

          {pathname !== "/login" && pathname !== "/signup" && !user && (
            <div className={styles.leftCol}>
              <Link href="/login">
                <Button classes={styles.loginButton} variant="filled">
                  ورود
                </Button>
              </Link>
            </div>
          )}

          {user ? (
            <div className={styles.leftCol}>
              <a>
                <div
                  className={styles.profileInfo}
                  onClick={() => {
                    if (showPopup) {
                      setShowPopup(false);
                    } else setShowPopup(true);
                  }}
                >
                  <div className={styles.name}>
                    {user.username ?? "کاربر میهمان"}
                  </div>
                  <div className={styles.profilePic}>
                    <Image src={MockAvatar} alt="avatar" />
                  </div>
                  {showPopup ? (
                    <Popup
                      popupSet={setShowPopup}
                      containerClass={styles.popup}
                      items={popupItems}
                    >
                      <div className={styles.popupHeader}>
                        <div className={styles.popupAvatar}>
                          <Image src={MockAvatar} alt="avatar" />
                        </div>
                        <div className={styles.headerTexts}>
                          <div className={styles.headerUsername}>
                            {user.username ?? "کاربر میهمان"}
                          </div>
                          <Link href="/manage-account">
                            <Text
                              weight="bold"
                              color="primary"
                              size="xl"
                              className={styles.headerLink}
                            >
                              مدیریت حساب دیجی نشر
                            </Text>
                          </Link>
                        </div>
                      </div>
                    </Popup>
                  ) : (
                    ""
                  )}
                </div>
              </a>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
