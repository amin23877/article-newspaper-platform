import styles from "styles/common/LoginModal.module.scss";
import Button from "./button";
import Modal from "@mui/material/Modal";
import Link from "next/link";

export default function LoginModal({ handleClose, open = false }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={styles.modalContainer}>
                <div className={styles.text}>برای ادامه، وارد حساب کاربری شوید.</div>
                <Button variant="filled" classes={styles.loginButton}>
                    <Link href="/login">
                        <a>
                            <span>ورود به دیجی نشر</span>
                        </a>
                    </Link>
                </Button>
                <a className={styles.cancel} onClick={handleClose}>
                    انصراف
                </a>
            </div>
        </Modal>
    );
}
