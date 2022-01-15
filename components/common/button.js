
import styles from 'styles/common/Button.module.scss'
import classNames from "classnames"

export default function Button({children, formState, variant = 'filled', classes, disabled, ...rest}) {
    return (
        <button className={
            classNames(styles.button, styles[variant], classes, disabled ? styles.disabled : '')
        }
                {...rest}
        >
            {children}
        </button>
    )
}
