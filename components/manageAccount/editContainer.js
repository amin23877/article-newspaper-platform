import styles from 'styles/components/manageAccount/EditContainer.module.scss'

export default function EditContainer ({providerType}) {
    return (
        <div className={styles.container}>{providerType}</div>
    )
}