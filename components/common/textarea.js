import styles from "styles/common/Textarea.module.scss";

function Textarea({ register, name, validation, ...rest }) {
    return <textarea {...register(name, validation)} className={styles.root} {...rest} />;
}

export default Textarea;
