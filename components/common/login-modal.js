
import styles from 'styles/common/LoginModal.module.scss'
import Button from "./button";
import Modal from '@mui/material/Modal';


export default function LoginModal({handleClose, open = false}) {

    

    return ( 
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={styles.modalContainer}>
                    <div className={styles.text}>
                        برای ادامه، وارد حساب کاربری شوید.
                    </div>
                    <Button variant='filled' classes={styles.loginButton}
                     >
                        <a href='/login'>
                            <span>ورود به دیجی نشر</span>
                        </a>
                    </Button>
                    <a className={styles.cancel} onClick={handleClose}>
                        انصراف
                    </a>
                </div>
                
            </Modal>
        
    )
}
