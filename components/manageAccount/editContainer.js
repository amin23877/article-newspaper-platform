import styles from 'styles/components/manageAccount/EditContainer.module.scss'
import Button from "components/common/button";
import {useForm} from "react-hook-form";

export default function EditContainer ({type,providerType, ...rest}) {

    const { handleSubmit } = useForm();

    const onInfoSubmit = data => {
        console.log(data)
    }
    
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
            <form onSubmit={handleSubmit(onInfoSubmit)} className={styles.generalInfo}>
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