import MembershipPlans from "components/profile/contacts/membershipPlans";
import styles from 'styles/pages/PurchaseContact.module.scss';
import { useState } from "react";
import {useRouter} from "next/router";
import MockAvatar from 'assets/images/contact/mock-avatar.png';
import Image from "next/image";
import PurchaseCard from "components/profile/contacts/purchaseCard";
import Modal from '@mui/material/Modal';

export default function Purchase () {

    const router = useRouter()
    const {paymentType, title} = router.query

    const [membership, setMembership] = useState(paymentType)

    const [open, setOpen] = useState(false); // Modal to pay for membership
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const selectMembership = (membershipType) => {
        setMembership(membershipType)
    }

    return (
        <div className={styles.purchaseContainer}>
            <div className={styles.top}>
                <div className={styles.text}>
                    <div className={styles.subtitle}>برای دسترسی به محتوا لطفا با خرید اشتراک از مهدی حمایت کنید :)</div>
                    {paymentType !== undefined ?
                    (paymentType.includes('اشتراک')) ? 
                    <div className={styles.title}>سطح عضویت را انتخاب کنید</div>
                    :
                    <div className={styles.payTitle}>
                        {'هزینه محتوا ' + paymentType + ' هزار تومان می باشد.'}
                    </div>
                    :
                    null
                    }
                </div>
                <div className={styles.avatarContainer}>
                    
                    <div className={styles.image}>
                        <Image src={MockAvatar} alt=''/>
                    </div>
                    
                    <span className={styles.name}>
                        mehdi sarmast
                    </span>
                </div>
            </div>
            {paymentType !== undefined ?
            paymentType.includes('اشتراک') ? 
            <MembershipPlans openModal={handleOpen} selectMembership={(type) => selectMembership(type)}/>
            :
            <PurchaseCard balance={5} paymentType={paymentType} paymentAmount={parseInt(paymentType)} title={title}/>
            :null
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title2"
                aria-describedby="modal-modal-description2"
            >
                <div className={styles.modalContainer}>
                    <PurchaseCard balance={5} paymentType={membership !== undefined ? membership.title : ''} paymentAmount={membership !== undefined ? membership.cost : ''} title={title}/>
                </div>
                
            </Modal>
        </div>
    )
}