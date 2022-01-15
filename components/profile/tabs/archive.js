import FilterBar from "components/common/filterBar";
import Button from "components/common/button";

import styles from 'styles/components/profile/TabsCommon.module.scss'
import ArchivePost from "../posts/archive";

export default function Archive(props) {
    return (
        <div>
            <FilterBar />
            <div>
                <ArchivePost />
                <ArchivePost />
                <ArchivePost />
                <ArchivePost />
                <ArchivePost />
                <ArchivePost />
            </div>
            <div className={styles.showMoreContainer}>
                <Button>
                    موارد بیشتر
                </Button>
            </div>
        </div>
    )
}
