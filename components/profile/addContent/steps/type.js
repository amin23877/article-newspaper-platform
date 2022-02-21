
import Image from "next/image";

import styles from 'styles/components/profile/addContent/steps/Type.module.scss'
import Video from "assets/svg/common/video.svg";
import Headphones from "assets/svg/common/headphones.svg";
import Docs from "assets/svg/common/docs.svg";
import Images from "assets/svg/common/image.svg";
import Button from "components/common/button";
import { useState } from "react";

export default function TypeStep({ onTypeSelect, ...rest }) {

    const items = [
        { name: 'newsletter', icon: Docs, type: 'pdf', title: 'روزنامه' },
        { name: 'magazine', icon: Docs, type: 'pdf', title: 'مجلات' },
        { name: 'video', icon: Video, type: 'video', title: 'ویدیو' },
        { name: 'podcast', icon: Headphones, type: 'audio', title: 'پادکست' },
        { name: 'article', icon: Docs, type: 'pdf', title: 'مقاله' },
    ]
    const [selectedType, setSelectedType] = useState(items[0]);

    return (
        <div className={styles.typeStepContainer}>
            <div className={styles.typeSelection}>
                {
                    items.map((item, index) => {
                        return (
                            <div key={index} className={styles.item} onClick={() => setSelectedType(item)}>
                                <Image src={item.icon} />
                                <p style={selectedType.name == item.name ? { color: '#155a61' } : {}}>{item.title}</p>
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
            <div className={styles.buttonContainer}>

                <Button type='upload' classes={styles.button} onClick={()=>onTypeSelect(selectedType)}>
                    <div className={styles.continue}>ادامه</div>
                </Button>
            </div>
        </div>
    )
}
