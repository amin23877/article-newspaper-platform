import FilterBar from "components/common/filterBar";
import FeedPost from "components/profile/posts/feed";
import Button from "components/common/button";
import { useUser } from "hooks/useUser";

import styles from "styles/components/profile/TabsCommon.module.scss";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Endpoints } from "../../../utils/endpoints";
import cookie from "cookie";
import jMoment from "moment-jalaali";

export default function Feed({ id, ...props }) {
    //const [membership, setMembership] = useState('')
    // const [user, getUser, hasInitialized, memberType] = useUser()
    const memberType = Cookies.get("membership");
    const [posts, setPosts] = useState();

    useEffect(async () => {
        try {
            const { accessToken } = cookie.parse(document?.cookie);
            if (id) {
                let tPosts = await axios.get(Endpoints.baseUrl + "/post/userPosts/" + id, {
                    headers: {
                        authorization: accessToken,
                    },
                });
                setPosts(tPosts.data.data.posts);
            } else {
                let tPosts = await axios.get(Endpoints.baseUrl + "/post/feeds", {
                    headers: {
                        authorization: accessToken,
                    },
                });
                setPosts(tPosts.data.data.feeds);
            }
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <div>
            <FilterBar />
            <div>
                {posts ? (
                    posts.map((post, i) => <FeedPost postProp={post} memberType={memberType} type="text" key={i} />)
                ) : (
                    <p>loading...</p>
                )}
                {/* <FeedPost memberType={memberType} type='text' />
                <FeedPost memberType={memberType} type='video' />
                <FeedPost paid memberType={memberType} paymentType='اشتراک طلایی' />
                <FeedPost paid memberType={memberType} paymentType={5} /> */}
                {/** 5ooo toman */}
                <div className={styles.showMoreContainer}>
                    <Button>موارد بیشتر</Button>
                </div>
            </div>
        </div>
    );
}
