import styles from 'styles/common/Input.module.scss'
import Image from 'next/image';
import DownArrow from 'assets/svg/common/chevron-down.svg';
import ErrorInput from 'assets/svg/common/errorInput.svg';

export default function Input({ register, name, validation, type = 'text', label, placeholder, classes, labelClasses, ...rest }) {
    console.log('val', rest);
    return (
        <div className={styles.inputContainer}>
            {label ? <label className={`${styles.label} ${labelClasses}`}>{label}</label> : ''}
            {(type === 'select') ?
                <select {...register(name, validation)}
                    className={`${styles.input} ${classes}`}
                >
                    <option value="f" selected disabled hidden>انتخاب کنید</option>
                    {rest.list.map((item) => {
                        return (
                            <option key={item} value={item}>{item}</option>
                        )
                    })}
                </select>
                :
                <input
                    {...register(name, validation)}
                    className={`${styles.input} ${classes} ${type === 'file' ? styles.fileInput : ''} ${rest.error ? styles.error : ''}`}
                    type={type}
                    placeholder={placeholder}
                    {...rest}
                />
            }

            {type === 'select' ?
                <div className={styles.selectArrow}>
                    <Image src={DownArrow} alt='' />
                </div>
                :
                null
            }

            {rest.error &&
                <div className={styles.errorIcon}>
                    <Image src={ErrorInput} alt='' />
                </div>}
            {/* <span className={styles.error}>{rest.error !== undefined ? rest.error.message : null}</span> */}
        </div>
    )
}
