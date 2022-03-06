import MembershipPlans from "components/profile/contacts/membershipPlans";
import styles from 'styles/pages/PurchaseContact.module.scss';
import { useState } from "react";
import { useRouter } from "next/router";
import MockAvatar from 'assets/images/contact/mock-avatar.png';
import Image from "next/image";
import PurchaseCard from "components/profile/contacts/purchaseCard";
import Modal from '@mui/material/Modal';
import cookie from 'cookie'
import axios from 'axios'
import { Endpoints } from "utils/endpoints";
import { getUserProfile } from "shared/users";
export default function Purchase({ userInfo, accessToken, id, postInfo }) {

    const router = useRouter()
    const { paymentType, title } = router.query

    console.log('postInfo')
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
                    <div className={styles.subtitle}>برای دسترسی به محتوا لطفا با خرید اشتراک از {userInfo.firstname} حمایت کنید :)</div>
                    {paymentType !== undefined ?
                        (paymentType.includes('subscribe')) ?
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
                        <Image src={MockAvatar} alt='' />
                    </div>

                    <span className={styles.name}>
                        mehdi sarmast
                    </span>
                </div>
            </div>
            {paymentType !== undefined ?
                paymentType.includes('اشتراک') ?
                    <MembershipPlans openModal={handleOpen} selectMembership={(type) => selectMembership(type)} />
                    :
                    <PurchaseCard balance={5} paymentType={paymentType} paymentAmount={parseInt(paymentType)} title={title} />
                : null
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title2"
                aria-describedby="modal-modal-description2"
            >
                <div className={styles.modalContainer}>
                    <PurchaseCard balance={5} paymentType={membership !== undefined ? membership.title : ''} paymentAmount={membership !== undefined ? membership.cost : ''} title={title} />
                </div>

            </Modal>
        </div>
    )
}
export async function getServerSideProps(context) {
    const { accessToken } = cookie.parse(context.req.headers.cookie ?? '')
    if (!accessToken) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    try {
        const { data: { data: { me } } } = await getUserProfile(accessToken)
        if (!me) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }

        try {
            const userInfo = await axios.get(Endpoints.baseUrl + '/user/profile/' + context.query.id, {
                headers: {
                    authorization: accessToken
                }
            })
        } catch (e) {
            const userInfo = { data: { data: null } }
        }

        const postInfo = await axios.get(Endpoints.baseUrl + '/post/single/' + context.query.postId, {
            headers: {
                authorization: accessToken
            }
        })


        return {
            props: { postInfo: postInfo, userInfo: userInfo.data.data, id: context.query.id, accessToken: accessToken },
        }
    }
    catch (e) {
        console.log('errrrrr', e)
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
}