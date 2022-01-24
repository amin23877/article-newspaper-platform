
import Image from "next/image";

import styles from 'styles/components/profile/addContent/steps/Type.module.scss'
import Video from "assets/svg/common/video.svg";
import Headphones from "assets/svg/common/headphones.svg";
import Docs from "assets/svg/common/docs.svg";
import Images from "assets/svg/common/image.svg";

export default function TypeStep ({ onTypeSelect, ...rest }) {

    const items = [
        {name: 'video', icon: Video},
        {name: 'newsletter', icon: Docs},
        {name: 'podcast', icon: Headphones},
        {name: 'images', icon: Images},
    ]

    return (
        <div className={styles.typeStepContainer}>
            <div className={styles.typeSelection}>
                {
                    items.map((item, index) => {
                        return (
                            <div key={index} className={styles.item} onClick={() => onTypeSelect(item.name)}>
                                <Image src={item.icon}/>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.title}>
                نوع محتوای خودرا انتخاب کنید.
            </div>
            <div className={styles.rules}>
                با بارگزاری محتوای خود در دیجی نشر، موافقتتان را با شرایط و قوانین ودستورالعمل های دیجی نشر اعلام می‌کنید. لطفا مطمئن شوید که حقوق نشر و حریم خصوصی را نقض نمی‌کنید. <br />بیشتر بدانید
            </div>
        </div>
    )
}