import FilterBar from "components/common/filterBar";
import Button from "components/common/button";

import styles from "styles/components/profile/TabsCommon.module.scss";
import ArchivePost from "../posts/archive";
import axios from "axios";
import { Endpoints } from "../../../utils/endpoints";
import cookie from "cookie";
import jMoment from "moment-jalaali";
import { useEffect, useState } from "react";
export default function Archive(props) {
    const [start, setStart] = useState(0);
    const [posts, setPosts] = useState();

    useEffect(async () => {
        try {
            const { accessToken } = cookie.parse(document?.cookie);

            let tPosts = await axios.get(Endpoints.baseUrl + `/post/bookmarks?start=${start}&limit=10`, {
                headers: {
                    authorization: accessToken,
                },
            });
            setPosts(tPosts.data.data.bookmarks);
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <div>
            <FilterBar />
            <div>
                {posts ? (
                    posts.map((post, i) => (
                        <ArchivePost key={i} post={{ ...post.post, updatedAt: post.updatedAt, user: post.user }} />
                    ))
                ) : (
                    <p>loading...</p>
                )}
            </div>
            <div className={styles.showMoreContainer}>
                <Button>موارد بیشتر</Button>
            </div>
        </div>
    );
}
