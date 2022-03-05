import React from 'react';
import classNames from "classnames";

import styles from 'styles/common/Text.module.scss'

function Text({color = 'gray', size = 'm', weight = 'normal', component: Component = 'p', children, className}) {
    const classes = classNames({
        [styles[color]]: color,
        [styles[size]]: size,
        [styles[weight]]: weight,
        [className] : className
    })

    return (
        <Component className={classes}>{children}</Component>
    );
}

export default Text;