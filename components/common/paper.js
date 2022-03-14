import React from "react";

import styles from "styles/common/Paper.module.scss";

function Paper({ children, ...rest }) {
    return (
        <div className={styles.paper} {...rest}>
            {children}
        </div>
    );
}

export default Paper;
