import styles from 'styles/components/manageAccount/EditContainer.module.scss'
import Button from "components/common/button";

export default function EditContainer ({type,providerType, onSubmit, ...rest}) {
    return (
        <div 
        className={styles.container}
         >
            <div className={styles.personalTitle}>
                {providerType ===  'ناشر حقیقی'? 
                'اطلاعات شخصی'
                : 
                'اطلاعات حقوقی'
                }
            </div>
            <form onSubmit={onSubmit} className={styles.generalInfo}>
                {rest.children}
                <Button classes={styles.editButton} variant='filled'
                type='submit'
                >
                    {type}
                </Button>
            </form>
        </div>
    )
}