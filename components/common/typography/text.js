import React from "react";
import classNames from "classnames";

import styles from "styles/common/Text.module.scss";

function Text({
  color = "gray",
  size = "m",
  weight = "normal",
  align = "right",
  component: Component = "p",
  children,
  className,
  ...rest
}) {
  const classes = classNames(
    styles.reset,
    styles[color],
    styles[size],
    styles[weight],
    styles["align-" + align],
    className
  );
  return (
    <Component {...rest} className={classes}>
      {children}
    </Component>
  );
}

export default Text;
