import FilterBar from "components/common/filterBar";
import PersonalPost from "components/profile/posts/personal";
import Button from "components/common/button";

import styles from 'styles/components/profile/TabsCommon.module.scss'
import { useEffect, useState } from "react";
import axios from 'axios';
import { Endpoints } from "../../../utils/endpoints";
import cookie from 'cookie'
import jMoment from "moment-jalaali";
import PayOptions from "components/payOptions/PayOptions";

export default function ForYou({ me, ...props }) {
    jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });
    const [posts, setPosts] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [payInfo, setPayInfo] = useState()

    useEffect(async () => {
        await loadPost()
    }, [])
    const loadPost = async () => {
        try {
            const { accessToken } = cookie.parse(document?.cookie)

            let tPosts = await axios.get(Endpoints.baseUrl + '/post/feeds', {
                headers: {
                    authorization: accessToken
                }
            })
            setPosts(tPosts.data.data.feeds)
        } catch (e) {
            console.log(e)
        }
    }
    const handleLikePost = async (pid, like = true) => {
        try {
            const { accessToken } = cookie.parse(document?.cookie)

            if (like) {
                await axios.post(Endpoints.baseUrl + '/post/like/' + pid, {}, {
                    headers: {
                        authorization: accessToken
                    }
                })
            } else {
                await axios.delete(Endpoints.baseUrl + '/post/like/' + pid, {
                    headers: {
                        authorization: accessToken
                    }
                })
            }
            loadPost();
        } catch (e) {
            console.log(e)
        }
    }
    const _handlePay = ({ balance,
        paymentType,
        paymentAmount,
        postId,
        username,
        title }) => {
        setPayInfo({
            balance: balance,
            paymentAmount: paymentAmount,
            paymentType: paymentType,
            title: title,
            postId: postId,
            username:username
        })
        setOpenModal(true)

    }
    return (
        <div>
            <FilterBar />
            {payInfo &&
                <PayOptions
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    balance={payInfo.balance}
                    paymentType={payInfo.paymentType}
                    paymentAmount={payInfo.paymentAmount}
                    title={payInfo.title}
                    me={me}
                    postId={payInfo.postId}
                    username={payInfo.username}
                />}
            <div>
                {
                    posts ? posts.map((post, i) => (
                        <PersonalPost _handlePay={_handlePay} post={post} me={me} key={i} handleLikePost={handleLikePost} />

                    ))
                        : <p>loading...</p>
                }

                <div className={styles.showMoreContainer}>
                    <Button>
                        موارد بیشتر
                    </Button>
                </div>
            </div>
        </div>
    )
}
