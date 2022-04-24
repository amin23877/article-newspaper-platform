import React from "react";
import Link from "next/link";
import Text from "components/common/typography/text";
import styles from "styles/components/layouts/default/Navbar.module.scss";
import Drawer from "components/common/drawer";

function DrawerNavMenu({ pages }) {
  return (
    <Drawer>
      <Link href="/">
        <Text color="primary" size="xxl" className={styles.logo}>
          دیجی نشر
        </Text>
      </Link>

      {pages?.map((link, index) => {
        return (
          <Link
            key={index}
            href={link.pageType === "home" ? "/" : link.pageType}
          >
            <Text size="l" weight="bold" className={styles.drawerLink}>
              {link.title}
            </Text>
          </Link>
        );
      })}
    </Drawer>
  );
}

export default DrawerNavMenu;
