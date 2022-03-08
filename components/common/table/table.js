import styles from 'styles/common/Table.module.scss'
import Button from "components/common/button";
import React from "react";

export default function Table({children, headers, maxRowsCount, size = 10, onLoadMore, emptyComponent}) {
    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.thead}>
                        {headers.map((header, index) => (
                            <th className={styles.cell} key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>

                {children}
            </table>

            {children.length === 0 && emptyComponent}

            {maxRowsCount && maxRowsCount > size && (
                <div style={{marginTop: 16, display: 'grid', placeItems: 'center'}}>
                    <Button onClick={onLoadMore}>
                        موارد بیشتر
                    </Button>
                </div>
            )}
        </>
    )
}