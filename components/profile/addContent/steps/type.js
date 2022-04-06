
import Image from "next/image";

import styles from 'styles/components/profile/addContent/steps/Type.module.scss'
import Video from "assets/svg/common/video.svg";
import Headphones from "assets/svg/common/headphones.svg";
import Docs from "assets/svg/common/docs.svg";
import NewspaperIcon from "assets/svg/common/newspaper.svg";
import MagazineIcon from "assets/svg/common/magazine.svg";

import VideoGray from "assets/svg/common/video-gray.svg";
import HeadphonesGray from "assets/svg/common/podcast-gray.svg";
import DocsGray from "assets/svg/common/docs-gray.svg";
import NewspaperGray from "assets/svg/common/newspaper-gray.svg";
import MagazineGray from "assets/svg/common/magazine-gray.svg";

import Images from "assets/svg/common/image.svg";
import Button from "components/common/button";
import { useState } from "react";

export default function TypeStep({ onTypeSelect, ...rest }) {
    const items = [
        { name: 'newsletter', icon: NewspaperIcon, disableIcon: NewspaperGray, type: 'pdf', title: 'روزنامه' },
        { name: 'magazine', icon: MagazineIcon, disableIcon: MagazineGray, type: 'pdf', title: 'مجلات' },
        { name: 'video', icon: Video, disableIcon: VideoGray, type: 'video', title: 'ویدیو' },
        { name: 'podcast', icon: Headphones, disableIcon: HeadphonesGray, type: 'audio', title: 'پادکست' },
        { name: 'article', icon: Docs, disableIcon: DocsGray, type: 'pdf', title: 'مقاله' },
    ]

    const [selectedType, setSelectedType] = useState(items[0]);


    return (
        <div className={styles.typeStepContainer}>
            <div className={styles.typeSelection}>
                {
                    items.map((item, index) => {
                        return (
                            <div key={index} className={styles.item} onClick={() => setSelectedType(item)}>
                                <Image width='46px' height='39px' src={selectedType.name == item.name ? item.icon : item.disableIcon} />
                                <p style={selectedType.name == item.name ? { color: '#155a61' } : {}}>{item.title}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.title}>
                نوع محتوای خودرا انتخاب کنید.
            </div>
            
            <div className={styles.buttonContainer}>

                <Button type='upload' classes={styles.button} onClick={() => onTypeSelect(selectedType)}>
                    <div className={styles.continue}>ادامه</div>
                </Button>
            </div>

            <div className={styles.rules}>
                با بارگزاری محتوای خود در دیجی نشر، موافقتتان را با شرایط و قوانین ودستورالعمل های دیجی نشر اعلام می‌کنید. لطفا مطمئن شوید که حقوق نشر و حریم خصوصی را نقض نمی‌کنید. <br />بیشتر بدانید
            </div>
        </div>
    )
}
