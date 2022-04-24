import { createPortal } from "react-dom";
import React, { useEffect, useRef, useState } from "react";
import { useWhenClickOutside } from "hooks/useWhenClickOutside";
import styles from "styles/common/Drawer.module.scss";
import hamburger from "assets/svg/common/hamburger.svg";
import Image from "next/image";

function Drawer({ children }) {
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
            {children}
          </div>,
          document.getElementById("__next")
        )}
    </div>
  );
}

export default Drawer;
