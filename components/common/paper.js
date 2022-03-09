import React from 'react';

import styles from 'styles/common/Paper.module.scss'

function Paper({children}) {
    return (
        <div className={styles.paper}>{children}</div>
    );
}

export default Paper;