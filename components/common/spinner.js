import { CircularProgress } from "@mui/material";
import classNames from "classnames";
import styles from "styles/common/Spinner.module.scss";

export function Spinner({ className, ...rest }) {
    return (
        <div className={classNames(styles.loading, className)} {...rest}>
            <CircularProgress color="inherit" />
        </div>
    );
}
