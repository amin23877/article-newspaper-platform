import styles from 'styles/common/Table.module.scss'

export default function Table({children, headers}) {
    return (
        <table className={styles.table}>
            <thead>
                <tr className={styles.thead}>
                    {headers.map((header, index) => (
                        <th className={styles.cell} key={index}>{header}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
               {children}
            </tbody>
        </table>
    )
}