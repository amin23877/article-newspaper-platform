import styles from 'styles/common/Textarea.module.scss';

function Textarea(props) {
    return ( <textarea className={styles.root} {...props}/> );
}

export default Textarea;