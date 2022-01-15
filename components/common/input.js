import styles from 'styles/common/Input.module.scss'

export default function Input({ register, name, validation, type = 'text', label, placeholder, classes, labelClasses, ...rest }) {
    return (
        <>
            {label ? <label className={`${styles.label} ${labelClasses}`}>{label}</label> : ''}
            <input
                {...register(name, validation)}
                className={`${styles.input} ${classes}`}
                type={type}
                placeholder={placeholder}
                {...rest}
            />
        </>
    )
}
