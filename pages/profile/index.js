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
import { getUserProfile } from "shared/users";
import axios from "axios";
import { Endpoints } from "../../utils/endpoints";
import Cookies from 'js-cookie';
import { useState } from 'react';
import transform from 'utils/transform';

export default function Index({ me, followers, followingsProp, followingsCountProp, followersCount }) {
    const [activeTab, setActiveTab] = useState('feed')
    const [followings, setFollowings] = useState(followingsProp)
    const [followingsCount, setFollowingsCount] = useState(followingsCountProp)
    const [bookmarks, setBookmarks] = useState()
    console.log('followingsProp', followingsProp)
    const doFollow = async (state, id) => {
        try {
            const { accessToken } = cookie.parse(document?.cookie)

            let follow = await axios({
                method: state ? 'POST' : 'DELETE',
                url: Endpoints.baseUrl + `/user/follow/${id}`,
                headers: { authorization: accessToken },
            });

            const followingsReq = await axios.get(Endpoints.baseUrl + '/user/followings?start=0&limit=4&sortBy=_id&sortOrder=-1', {
                headers: {
                    authorization: accessToken
                }
            })

            const followingsCountReq = await axios.get(Endpoints.baseUrl + '/user/followings/count', {
                headers: {
                    authorization: accessToken
                }
            })
            setFollowings(followingsReq.data.data.followings)
            setFollowingsCount(followingsCountReq.data.data.count)

        } catch (e) {
            console.log(e)
        }
    }
    const getBookmarks = async (start = 0) => {
        try {
            const { accessToken } = cookie.parse(document?.cookie)
            let tPosts = await axios.get(Endpoints.baseUrl + `/post/bookmarks?start=${start}&limit=10`, {
                headers: {
                    authorization: accessToken
                }
            })
            setBookmarks(tPosts.data.data.bookmarks)
        } catch (e) {
            console.log(e)
        }
    }

    const handleDeleteBookamrk = async (id) => {
        try {
            const { accessToken } = cookie.parse(document?.cookie)
            let tPosts = await axios.delete(Endpoints.baseUrl + `/post/bookmark/${id}`, {
                headers: {
                    authorization: accessToken
                }
            })
            getBookmarks()
        } catch (e) {
            console.log(e)
        }
    }
    const handleAddToSearch = async (id) => {
        try {
            const { accessToken } = cookie.parse(document?.cookie)
            let tPosts = await axios.delete(Endpoints.baseUrl + `/post/searchlist/${id}`, {
                headers: {
                    authorization: accessToken
                }
            })
            alert('پست به لیست جستجو های شما افزوده شد')
        } catch (e) {
            console.log(e)
        }
    }
    const handleSharePost = (id)=>{
        transform.copyToClipboard(`https://diginashr.ir/post/${id}?type=text`)
        alert('لینک پست در کلیپ بورد ذخیره شد')

    }
    return (
        <div className={styles.profileContainer}>
            <div className={styles.headerContainer}>
                <div className={`${styles.buttonContainer} container`}>
                    <Button classes={styles.addContentButton}>
                        <Link href='/profile/addContent'>
                            <a>
                                <span>افزودن محتوا</span>
                                <span>
                                    <Image src={FolderPlus} />
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
                            <Image src={MockAvatar} />
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
                                <Image src={Instagram} alt="" />
                            </a>
                            <a href='https://google.com'>
                                <Image src={Twitter} alt="" />
                            </a>
                            <a href='https://google.com'>
                                <Image src={Facebook} alt="" />
                            </a>
                            <a href='https://google.com'>
                                <Image src={Linkedin} alt="" />
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
                                        // content: Feed,
                                    },
                                    {
                                        name: 'forYou',
                                        text: 'برای تو',
                                        // content: ForYou,
                                    },
                                    {
                                        name: 'archive',
                                        text: 'آرشیو',
                                        // content: Archive,
                                    }
                                ]
                            }
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                        <div className={styles.contents}>
                            {
                                activeTab == 'feed' && <Feed />
                            }
                            {
                                activeTab == 'forYou' && <ForYou me={me} />
                            }
                            {
                                activeTab == 'archive' && <Archive
                                    followings={followings}
                                    doFollow={doFollow}
                                    getPosts={getBookmarks}
                                    posts={bookmarks}
                                    setPosts={setBookmarks}
                                    handleDeleteBookamrk={handleDeleteBookamrk}
                                    handleAddToSearch={handleAddToSearch}
                                    handleSharePost={handleSharePost}
                                />
                            }

                        </div>

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
        const { data: { data: { me } } } = await getUserProfile(accessToken)

        if (!me) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }

        const followersReq = axios.get(Endpoints.baseUrl + '/user/followers?start=0&limit=4&sortBy=_id&sortOrder=-1', {
            headers: {
                authorization: accessToken
            }
        })


        const followingsReq = axios.get(Endpoints.baseUrl + '/user/followings?start=0&limit=4&sortBy=_id&sortOrder=-1', {
            headers: {
                authorization: accessToken
            }
        })

        const followingsCountReq = axios.get(Endpoints.baseUrl + '/user/followings/count', {
            headers: {
                authorization: accessToken
            }
        })

        const followersCountReq = axios.get(Endpoints.baseUrl + '/user/followers/count', {
            headers: {
                authorization: accessToken
            }
        })

        const [
            { data: { data: { followers } } },
            { data: { data: { followings } } },
            { data: { data: { count: followingsCount } } },
            { data: { data: { count: followersCount } } }
        ] = await Promise.all([followersReq, followingsReq, followingsCountReq, followersCountReq])

        return {
            props: { me, followers, followingsProp: followings, followingsCountProp: followingsCount, followersCount }
        }

    }
    catch (e) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
}
