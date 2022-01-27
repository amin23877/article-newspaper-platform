import FilterBar from "components/common/filterBar";
import FeedPost from "components/profile/posts/feed";
import Button from "components/common/button";

import styles from 'styles/components/profile/TabsCommon.module.scss'
import { useEffect, useState } from "react";

export default function Feed({memberType}) {

    // const [memberType, setMemberType] = useState(props.memberType)
    // useEffect(() => {
    //     setMemberType(props.memberType)
    // }, [props])

    
    return (
        <div>
            <FilterBar />
            <div>
                <FeedPost memberType={memberType}/>
                <FeedPost memberType={memberType}/>
                <FeedPost paid memberType={memberType} paymentType='اشتراک طلایی'/>
                <FeedPost paid memberType={memberType} paymentType={5} hasPaid={false}/> {/** 5ooo toman */}
                <div className={styles.showMoreContainer}>
                    <Button>
                        موارد بیشتر
                    </Button>
                </div>
            </div>
        </div>
    )
}
