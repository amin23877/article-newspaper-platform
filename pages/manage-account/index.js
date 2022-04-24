import styles from "styles/pages/ManageAccount.module.scss";
import { Fragment, useEffect } from "react";
import cookie from "cookie";
import UserInformationSummery from "components/manageAccount/userInformationSummery";
import { useRouter } from "next/router";
import { getUserProfile } from "shared/users";
import { useMenuItems } from "hooks/manage-account/useMenuItems";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveMenu } from "redux/manage-account";

export default function ManageAccount({ user }) {
  const menu = useMenuItems(user);

  const activeMenu = useSelector((state) => state.manageAccount.activeMenu);

  const dispatch = useDispatch();

  const router = useRouter();

  const { activeIndex } = router.query;

  const onChangeMenu = (menuIndex) => {
    dispatch(changeActiveMenu(menuIndex));
  };

  useEffect(() => {
    if (activeIndex) dispatch(changeActiveMenu(activeIndex));
  }, [activeIndex, dispatch]);

  return (
    <div className={styles.manageAccountPage}>
      <div className={styles.container}>
        <div className={styles.rightCol}>
          <UserInformationSummery user={user} />

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
            <Fragment key={index}>
              {activeMenu === index && item.element}
            </Fragment>
          ))}
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
