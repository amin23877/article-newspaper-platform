import FilterBar from "components/common/filterBar";
import PersonalPost from "components/profile/posts/personal";
import Button from "components/common/button";

import styles from 'styles/components/profile/TabsCommon.module.scss'
import { useEffect, useState } from "react";
import axios from 'axios';
import { Endpoints } from "../../../utils/endpoints";
import cookie from 'cookie'
import jMoment from "moment-jalaali";

export default function ForYou({ me, ...props }) {
    jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });
    const [posts, setPosts] = useState()

    useEffect(async () => {
        try {
            const { accessToken } = cookie.parse(document?.cookie)

            let tPosts = await axios.get(Endpoints.baseUrl + '/post/me/posts', {
                headers: {
                    authorization: accessToken
                }
            })
            setPosts(tPosts.data.data.posts)
        } catch (e) {
            console.log(e)
        }
    }, [])
    return (
        <div>
            <FilterBar />
            <div>
                {
                    posts ? posts.map((post) => (
                        <PersonalPost post={post} me={me} />

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
