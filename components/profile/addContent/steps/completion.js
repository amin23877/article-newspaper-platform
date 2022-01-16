import Button from "components/common/button";
import styles from 'styles/components/profile/addContent/steps/Completion.module.scss'
import WrapperCard from "components/profile/addContent/wrapper-card";
import ImagePlaceholder from "assets/svg/common/image-upoad-placeholder.svg";
import Image from "next/image";
import SimpleBackdrop from "../backDrop"

export  function Completion() {


    return (
         <div className={styles.completionContainer}>
             <div className={styles.cardContainer}  >
                <div className={styles.placeholderContainer}>
                    <div className={styles.image}>
                        <Image id="image-placeholder" src={ImagePlaceholder}/>
                    </div>
                    <div className={styles.text}>
                        پیش نمایش محتوا
                    </div>
                 </div>
             </div>
             <div className={styles.cardOrder}>
                  <div className={styles.contentDetail}></div>
                  <div className={styles.contentPublishRight}></div>
             </div>
               <div className={styles.buttonsContainer} >
                  {/* <Button variant='filled' classes={styles.button} >
                       تایید نهایی
                  </Button> */}
                  <SimpleBackdrop classes={styles.button}></SimpleBackdrop>
               </div>
         </div>
        
    )
}

