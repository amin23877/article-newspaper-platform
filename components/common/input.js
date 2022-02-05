import styles from 'styles/common/Input.module.scss'

export default function Input({ register, name, validation, type = 'text', label, placeholder, classes, labelClasses, ...rest }) {

    return (
        <div className={styles.inputContainer}>
            {label ? <label className={`${styles.label} ${labelClasses}`}>{label}</label> : ''}
            <input
                {...register(name, validation)}
                className={`${styles.input} ${classes} ${type === 'file' ? styles.fileInput : ''}`}
                type={type}
                placeholder={placeholder}
                {...rest}
            />
            <span className={styles.error}>{rest.error !== undefined ? rest.error.message : null}</span>
        </div>
    )
}
