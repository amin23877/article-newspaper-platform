import Button from "components/common/button";

import styles from 'styles/homepage/Categories.module.scss'

export default function Categories() {
    return (
        <div className={styles.CategoriesContainer}>
            <Button classes={styles.item} variant='outline'>زیبایی</Button>
            <Button classes={styles.item} variant='outline'>زیبایی</Button>
            <Button classes={styles.item} variant='outline'>زیبایی</Button>
        </div>
    )
}
