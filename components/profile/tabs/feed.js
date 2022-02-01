import FilterBar from "components/common/filterBar";
import FeedPost from "components/profile/posts/feed";
import Button from "components/common/button";
import {useUser} from "hooks/useUser";

import styles from 'styles/components/profile/TabsCommon.module.scss'
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function Feed(props) {

    //const [membership, setMembership] = useState('')
    // const [user, getUser, hasInitialized, memberType] = useUser()
    const memberType = Cookies.get('membership')

    // useEffect(() => {
    //     setMembership(props.memberType)
    // }, [props.memberType])

    // useEffect(() => {
        
    //     if (!hasInitialized) {
    //         getUser()
    //     }
    //     return
    // },[hasInitialized, getUser])

    return (
        <div>
            <FilterBar />
            <div>
                <FeedPost memberType={memberType} type='text'/>
                <FeedPost memberType={memberType} type='video'/>
                <FeedPost paid memberType={memberType} paymentType='اشتراک طلایی'/>
                <FeedPost paid memberType={memberType} paymentType={5}/> {/** 5ooo toman */}
                <div className={styles.showMoreContainer}>
                    <Button>
                        موارد بیشتر
                    </Button>
                </div>
            </div>
        </div>
    )
}
