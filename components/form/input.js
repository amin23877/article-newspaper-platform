import styles from "styles/common/Input.module.scss";

export default function Input({
  register,
  validation,
  name,
  type,
  label,
  classes,
  labelClasses,
  ...rest
}) {
  return (
    <>
      {label && (
        <label className={`${styles.label} ${labelClasses}`}>{label}</label>
      )}

      <input
        type={type}
        className={`${styles.input} ${classes}`}
        {...register(name, validation)}
        {...rest}
      />
    </>
  );
}
