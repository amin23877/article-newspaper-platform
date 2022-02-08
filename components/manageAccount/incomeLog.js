import styles from 'styles/components/manageAccount/IncomeLog.module.scss'

export default function IncomeLog () {

    const statusList = [
        {
            title: 'درآمد از اشتراک ها',
            value: 8543133
        },
        {
            title: 'درآمد از پرداخت',
            value: 508431
        },
        {
            title: 'کل درآمد ها',
            value: 251956355
        }
    ]

    return (
        <div className={styles.statusContainer}>
            {statusList.map((status) => {
                return (
                    <div className={styles.status} key={status.title}>
                        <div>{status.title}</div>
                        <div className={styles.value}>{`${status.value} تومان`}</div>
                    </div>
                )
            })}
        </div>
    )
}