import FilterBar from "components/common/filterBar";
import PersonalPost from "components/profile/posts/personal";
import Button from "components/common/button";

import styles from 'styles/components/profile/TabsCommon.module.scss'

export default function ForYou(props) {
    return (
        <div>
            <FilterBar />
            <div>
                <PersonalPost />
                <PersonalPost />
                <PersonalPost />
                <PersonalPost />
                <div className={styles.showMoreContainer}>
                    <Button>
                        موارد بیشتر
                    </Button>
                </div>
            </div>
        </div>
    )
}
