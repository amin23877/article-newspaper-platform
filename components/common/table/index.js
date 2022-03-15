import styles from "styles/common/Table.module.scss";
import Button from "components/common/button";
import React from "react";
import { Spinner } from "../spinner";

export default function Table({
    children,
    headers,
    data,
    maxRowsCount,
    onLoadMore,
    emptyComponent,
}) {
    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.thead}>
                        {headers.map((header, index) => (
                            <th className={styles.cell} key={index}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data && children(data)} {/* render table if data exist */}
                </tbody>
            </table>

            {/* show loading spinner if there is no data */}
            {!data && <Spinner />}

            {data?.length === 0 && emptyComponent}

            {maxRowsCount && maxRowsCount > data?.length && (
                <div style={{ marginTop: 16, display: "grid", placeItems: "center" }}>
                    <Button onClick={onLoadMore}>موارد بیشتر</Button>
                </div>
            )}
        </>
    );
}
