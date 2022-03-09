import React from 'react';
import Image from 'next/image'

import styles from 'styles/common/Table.module.scss'

function TableCell({children, icon}) {
    return (
        <td className={styles.cell}>
            <div className={styles.cellContent}>
                {icon && <Image width={40} height={40} src={icon} alt='image'/>}
                {children}
            </div>
        </td>
    );
}

export default TableCell;