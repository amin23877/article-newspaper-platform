import FilterBar from "components/common/filterBar";
import FeedPost from "components/profile/posts/feed";
import Button from "components/common/button";
import {useUser} from "hooks/useUser";

import styles from 'styles/components/profile/TabsCommon.module.scss'
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function Feed(props) {

    const [membership, setMembership] = useState('')
    const [user, getUser, hasInitialized, memberType] = useUser()

    useEffect(() => {
        setMembership(props.memberType)
    }, [props.memberType])

    console.log(membership)
    return (
        <div>
            <FilterBar />
            <div>
                <FeedPost memberType={membership}/>
                <FeedPost memberType={membership}/>
                <FeedPost paid memberType={membership} paymentType='اشتراک طلایی'/>
                <FeedPost paid memberType={membership} paymentType={5}/> {/** 5ooo toman */}
                <div className={styles.showMoreContainer}>
                    <Button>
                        موارد بیشتر
                    </Button>
                </div>
            </div>
        </div>
    )
}
