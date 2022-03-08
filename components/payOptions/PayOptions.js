import {Modal} from '@mui/material';
import LoginModal from 'components/common/login-modal';
import PurchaseCard from 'components/profile/contacts/purchaseCard';
import {useUser} from 'hooks/useUser';
import {useEffect, useState} from 'react';

const PayOptions = ({
                        openModal,
                        step,
                        setOpenModal,
                        postId,
                        balance,
                        title = "",
                        username,
                        paymentType,
                        paymentAmount,
                        me
                    }) => {
    const [loginOpen, setLoginOpen] = useState(false); // modal for logging in
    const [user, getUser, hasInitialized, memberType] = useUser()

    const [open, setOpen] = useState(false); // Modal to pay for membership

    useEffect(() => {
        if (!openModal) {
            setLoginOpen(false)
            setOpen(false)
        } else {
            if (!me) {
                setLoginOpen(true)
            } else {
                setOpen(true)
            }
        }
    }, [openModal])
    const handleClose = () => {
        setLoginOpen(false)
        setOpen(false)
        setOpenModal(false)
    }
    return (
        <>
            <LoginModal open={openModal && loginOpen} handleClose={handleClose}/>
            <Modal
                open={openModal && open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title2"
                aria-describedby="modal-modal-description2"
            >
                <PurchaseCard me={me} Istep={step} postId={postId} title={title} balance={balance}
                              username={username} paymentType={paymentType} paymentAmount={paymentAmount}
                              closeModal={handleClose}/>
            </Modal>
        </>
    )
}

export default PayOptions