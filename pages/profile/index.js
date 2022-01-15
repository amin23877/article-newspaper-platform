import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/pages/Profile.module.scss'
import Button from "components/common/button";

import FolderPlus from 'assets/svg/common/folder-plus.svg'
import MockAvatar from 'assets/images/mock-avatar.png'
import Contacts from "components/profile/contacts/contacts";
import Instagram from "assets/svg/social-media/instagram-greeen-circle.svg";
import Twitter from "assets/svg/social-media/twitter-green-circle.svg";
import Facebook from "assets/svg/social-media/facebook-green-circle.svg";
import Linkedin from "assets/svg/social-media/linkedin-greeen-circle.svg";
import Tab from "components/common/tab";
import Feed from "components/profile/tabs/feed";
import ForYou from "components/profile/tabs/forYou";
import Archive from "components/profile/tabs/archive";
import cookie from "cookie";
import {getUserProfile} from "shared/users";
import axios from "axios";
import {Endpoints} from "../../utils/endpoints";

export default function Index({me, followers, followings, followingsCount, followersCount}) {

    return (
        <div className={styles.profileContainer}>
            <div className={styles.headerContainer}>
                <div className={`${styles.buttonContainer} container`}>
                    <Button classes={styles.addContentButton}>
                        <Link href='/profile/addContent'>
                            <a>
                                <span>افزودن محتوا</span>
                                <span>
                                    <Image src={FolderPlus}/>
                                </span>
                            </a>
                        </Link>
                    </Button>
                </div>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.rightCol}>
                    <div className={styles.profileContentBox}>
                        <div className={styles.avatarContainer}>
                            <Image src={MockAvatar}/>
                        </div>
                        <div className={styles.name}>
                            {me.username ?? 'کاربر میهمان'}
                        </div>
                        <div className={styles.status}>
                            در حال ایجاد محتوا هستید
                        </div>
                    </div>
                    <div className={styles.contactsContainer}>
                        <Contacts count={followersCount} data={followers} />
                    </div>
                    <div className={styles.contactsContainer}>
                        <Contacts type='following' count={followingsCount} data={followings} />
                    </div>
                    <div className={styles.socialContainer}>
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
                </div>
                <div className={styles.leftCol}>
                    <div className={styles.tabsContainer}>
                        <Tab
                            items={
                                [
                                    {
                                        name: 'feed',
                                        text: 'محتوا',
                                        content: Feed
                                    },
                                    {
                                        name: 'forYou',
                                        text: 'برای تو',
                                        content: ForYou
                                    },
                                    {
                                        name: 'archive',
                                        text: 'آرشیو',
                                        content: Archive
                                    }
                                ]
                            }
                        />
                    </div>
                </div>
            </div>
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
        const {data: {data: { me } } } = await getUserProfile(accessToken)

        if (!me) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }

        const followersReq = axios.get(Endpoints.baseUrl + '/user/followers?start=0&limit=4&sortBy=_id&sortOrder=-1',{
            headers: {
                authorization: accessToken
            }
        })


        const followingsReq = axios.get(Endpoints.baseUrl + '/user/followings?start=0&limit=4&sortBy=_id&sortOrder=-1',{
            headers: {
                authorization: accessToken
            }
        })

        const followingsCountReq = axios.get(Endpoints.baseUrl + '/user/followings/count',{
            headers: {
                authorization: accessToken
            }
        })

        const followersCountReq = axios.get(Endpoints.baseUrl + '/user/followers/count',{
            headers: {
                authorization: accessToken
            }
        })

        const [
            { data: {data: {followers} } },
            { data: {data: {followings} } },
            { data: {data: {count: followingsCount} } },
            { data: {data: {count: followersCount} } }
        ] = await Promise.all([followersReq, followingsReq, followingsCountReq, followersCountReq])

        return {
            props: {me, followers, followings, followingsCount, followersCount}
        }

    } catch (e) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
}
