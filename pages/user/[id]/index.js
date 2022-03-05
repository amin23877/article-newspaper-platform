import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from "next/router";
import MockAvatar from 'assets/images/contact/mock-avatar.png'
import GoldRank from 'assets/images/contact/gold-rank.svg'
import styles from 'styles/pages/User.module.scss'
import Button from "components/common/button";
import Tab from "components/common/tab";
import Feed from "components/profile/tabs/feed";
import About from "components/profile/tabs/about";
import LoginModal from 'components/common/login-modal';
import {useUser} from "hooks/useUser";
import {useEffect, useState} from "react";
import Instagram from "assets/svg/social-media/instagram-greeen-circle.svg";
import Twitter from "assets/svg/social-media/twitter-green-circle.svg";
import Facebook from "assets/svg/social-media/facebook-green-circle.svg";
import Linkedin from "assets/svg/social-media/linkedin-greeen-circle.svg";
import MembershipPlans from 'components/profile/contacts/membershipPlans';
import PurchaseCard from 'components/profile/contacts/purchaseCard';
import Modal from '@mui/material/Modal';
import Dots from "assets/svg/common/dots.svg";

export default function Index() {

    
    const [followed, setFollowed] = useState(false)
    const [membership, setMembership] = useState('')
    const [membershipCost, setMembershipCost] = useState(0)
    const [user, getUser, hasInitialized, memberType] = useUser()

    const [loginOpen, setLoginOpen] = useState(false); // modal for logging in
    const handleLoginOpen = () => setOpen(true);
    const handleLoginClose = () => setOpen(false);

    const [open, setOpen] = useState(false); // Modal to pay for membership
    const handleOpen = (membership, cost) => {
        setMembershipCost(cost)
        setMembership(membership)
        setOpen(true)
    }
    const handleClose = () => setOpen(false);

    const router = useRouter()

    useEffect(() => {
        
        if (!hasInitialized) {
            getUser()
        }
        return
    },[hasInitialized, getUser])

    const onFollow = () => {
        if (!user) {
            handleLoginOpen()
        }
        else setFollowed(!followed)
    }

    const selectMembership = (membershipType) => {
        setMembership(membershipType)
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.headerContainer}>
                <div className={`${styles.buttonContainer} container`}>
                    <Button classes={styles.addContentButton} variant={followed ? 'outline' : 'filled'}
                     onClick={() => onFollow()}
                     >
                            <a>
                                <span>{followed ? 'دنبال می کنید' : 'دنبال کردن'}</span>
                            </a>
                    </Button>
                </div>
                <div className={styles.avatarContainer}>
                    <Image src={MockAvatar} alt=""/>
                </div>
                {memberType.includes('اشتراک') ? 
                <div className={styles.rankContainer}>
                    <Image src={GoldRank} alt=""/>
                </div>
                :null
                }
            </div>
            <div className={styles.contentContainer}>
                
                <div className={styles.name}>
                    {'mehdi salamati'}
                </div>
                <div className={styles.status}>
                    در حال ایجاد دوره های هنری، تصاویر و پادکست های آموزشی ویدیویی است
                </div>
                

                {!(memberType.includes('اشتراک')) ? 
                <>
                <div className={styles.title}>
                    انتخاب عضویت
                </div>
                <MembershipPlans openModal={handleOpen} selectMembership={(type) => selectMembership(type)}/>
                </>
                :null
                }

                <div className={styles.followersSection}>
                    <span>{853} نفر دنبال کننده</span>
                    
                    <div className={styles.social}>
                        <a href='https://google.com'>
                            <Image src={Instagram} alt=""/>
                        </a>
                        <a href='https://google.com'>
                            <Image src={Twitter} alt=""/>
                        </a>
                        <a href='https://google.com'>
                            <Image src={Facebook} alt=""/>
                        </a>
                        <a href='https://google.com'>
                            <Image src={Linkedin} alt=""/>
                        </a>
                    </div>
                </div>

                {/* <div className={styles.bar}>
                    <div className={styles.user}>
                        <div className={styles.barImage}>
                            <Image src={MockAvatar}/>
                        </div>
                        <span>{'mehdi salamati'}</span>
                    </div>
                    {memberType !== '' ? 
                    <div className={styles.barRank}>
                        <Image src={GoldRank} width={25} height={25}/>
                    </div>
                    : null}
                    <a href='/' className={styles.dots}>
                        <Image src={Dots} alt=""/>
                    </a>
                </div> */}
                <div className={styles.tabsContainer}>
                    <Tab
                        items={
                            [
                                {
                                    name: 'feed',
                                    text: 'محتوا',
                                    content: Feed,
                                },
                                {
                                    name: 'forYou',
                                    text: 'درباره',
                                    content: About
                                },
                            ]
                        }
                    />
                </div>
        
            </div>

            <LoginModal open={loginOpen} handleClose={handleLoginClose} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title2"
                aria-describedby="modal-modal-description2"
            >
                <div className={styles.modalContainer}>
                    <PurchaseCard balance={60} paymentType={membership} paymentAmount={membershipCost} closeModal={handleClose}/>
                </div>
                
            </Modal>
        </div>
    )
}


