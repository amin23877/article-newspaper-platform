import React from "react";

import styles from "styles/common/Paper.module.scss";

function Paper({ children,className, ...rest }) {
    return (
        <div className={`${styles.paper} ${className}`} {...rest}>
            {children}
        </div>
    );
}

export default Paper;
