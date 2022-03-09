import React from 'react';

import styles from 'styles/common/Table.module.scss'

function TableRow({children}) {
    return (
        <tr className={styles.tr}>{children}</tr>
    );
}

export default TableRow;