import React from "react";
import styles from "styles/components/layouts/default/Navbar.module.scss";
import ActiveLink from "components/common/active-link";

function NavMenu({ pages }) {
  return (
    <div className={styles.linksContainer}>
      {pages?.map((link, index) => {
        return (
          <ActiveLink
            key={index}
            activeClassName={styles.activeLink}
            href={link.pageType == "home" ? "/" : `/${link.pageType}`}
          >
            <a className={styles.linkItem}>{link.title}</a>
          </ActiveLink>
        );
      })}
    </div>
  );
}

export default NavMenu;
