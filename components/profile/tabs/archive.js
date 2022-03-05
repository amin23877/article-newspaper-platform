import FilterBar from "components/common/filterBar/filterBar";
import Button from "components/common/button";

import styles from 'styles/components/profile/TabsCommon.module.scss'
import ArchivePost from "../posts/archive";
import axios from 'axios';
import { Endpoints } from "../../../utils/endpoints";
import cookie from 'cookie'
import jMoment from "moment-jalaali";
import { useEffect, useState } from "react";
export default function Archive(
    {
        followings,
        doFollow,
        handleRemoveBookmark,
        posts,
        setPosts,
        getPosts,
        handleDeleteBookamrk,
        handleAddToSearch,
        handleSharePost,
        ...props
    }
) {

    useEffect(async () => {
        getPosts()
    }, [])

    return (
        <div>
            <FilterBar />
            <div>
                {posts ? posts.map((post , i) => (
                    <ArchivePost
                        key={i}
                        followings={followings}
                        doFollow={doFollow}
                        handleDeleteBookamrk={handleDeleteBookamrk}
                        handleAddToSearch={handleAddToSearch}
                        handleSharePost={handleSharePost}
                        post={{ ...post.post, updatedAt: post.updatedAt }}
                    />

                )) : <p>loading...</p>}

            </div>
            <div className={styles.showMoreContainer}>
                <Button>
                    موارد بیشتر
                </Button>
            </div>
        </div>
    )
}
