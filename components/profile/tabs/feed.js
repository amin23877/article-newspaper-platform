import FilterBar from "components/common/filterBar";
import FeedPost from "components/profile/posts/feed";
import Button from "components/common/button";

import styles from 'styles/components/profile/TabsCommon.module.scss'

export default function Feed(props) {
    return (
        <div>
            <FilterBar />
            <div>
                <FeedPost />
                <FeedPost />
                <FeedPost paid/>
                <FeedPost />
                <div className={styles.showMoreContainer}>
                    <Button>
                        موارد بیشتر
                    </Button>
                </div>
            </div>
        </div>
    )
}
