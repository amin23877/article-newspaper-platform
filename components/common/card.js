
import styles from 'styles/common/Card.module.scss'

export default function Card(props) {
    return (
        <div className={styles.card}>
            {props.children}
        </div>
    )
}
