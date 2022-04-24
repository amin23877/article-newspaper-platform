import React from "react";
import { useMenuItems } from "hooks/manage-account/useMenuItems";
import styles from "styles/pages/ManageAccount.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveMenu } from "redux/manage-account";
import Drawer from "components/common/drawer";
import UserInformationSummery from "components/manageAccount/userInformationSummery";

function ManageAccountMenu() {
  const user = useSelector((state) => state.users.userInfo);
  const activeMenu = useSelector((state) => state.manageAccount.activeMenu);

  const menu = useMenuItems(user);

  const dispatch = useDispatch();

  const onChangeMenu = (index) => {
    dispatch(changeActiveMenu(index));
  };

  return (
    <Drawer>
      <UserInformationSummery user={user} />

      <ul className={styles.menuItems}>
        {menu.map((item, index) => {
          if (!item.isPublic && !user.isContentProvider) return null;

          return (
            <li
              key={index}
              onClick={() => onChangeMenu(index)}
              className={activeMenu === index ? styles.activeMenu : styles.menu}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </Drawer>
  );
}

export default ManageAccountMenu;
