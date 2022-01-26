import FilterBar from "components/common/filterBar";
import FeedPost from "components/profile/posts/feed";
import Button from "components/common/button";

import styles from 'styles/components/profile/TabsCommon.module.scss'

export default function Feed({memberType}) {
    return (
        <div>
            <FilterBar />
            <div>
                <FeedPost memberType={memberType}/>
                <FeedPost memberType={memberType}/>
                <FeedPost paid memberType={memberType} paymentType={'اشتراک طلایی'}/>
                <FeedPost memberType={memberType}/>
                <div className={styles.showMoreContainer}>
                    <Button>
                        موارد بیشتر
                    </Button>
                </div>
            </div>
        </div>
    )
}
