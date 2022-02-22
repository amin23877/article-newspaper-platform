import Button from "components/common/button";

import styles from 'styles/homepage/Categories.module.scss'

export default function Categories({tags}) {
    return (
        <div className={styles.CategoriesContainer}>
            {tags.map((tag)=>(
            <Button classes={styles.item} variant='outline'>{tag.title}</Button>

            ))}
        
        </div>
    )
}
