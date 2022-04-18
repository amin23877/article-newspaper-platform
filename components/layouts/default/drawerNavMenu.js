import { createPortal } from "react-dom";
import React, { useEffect, useRef, useState } from "react";
import { useWhenClickOutside } from "hooks/useWhenClickOutside";
import Link from "next/link";
import Text from "components/common/typography/text";
import styles from "styles/components/layouts/default/Navbar.module.scss";
import hamburger from "assets/svg/common/hamburger.svg";
import Image from "next/image";

function DrawerNavMenu({ pages }) {
  const drawerRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  useWhenClickOutside([drawerRef], () => {
    handleClose();
  });

  return (
    <div className={styles.drawerContainer}>
      <div onClick={handleOpen} className={styles.drawerTrigger}>
        <Image alt={""} src={hamburger} width={20} height={20} />
      </div>

      {/* render drawer only in client side */}
      {mounted &&
        createPortal(
          <div
            ref={drawerRef}
            className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
          >
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
          </div>,
          document.body
        )}
    </div>
  );
}

export default DrawerNavMenu;
