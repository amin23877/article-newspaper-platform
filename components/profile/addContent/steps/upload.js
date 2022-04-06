
import { useEffect, useState } from 'react'

import styles from 'styles/components/profile/addContent/steps/Upload.module.scss'
import ImagePlaceholder from "assets/svg/common/image-upoad-placeholder.svg";
import Image from "next/image";
import Button from "components/common/button";

export default function UploadType({ onUpload, data, onStepForward, loading }) {

    const validTypes = {
        video: ['mov', 'gif', 'mp4', 'm4a', 'mpeg', 'ogg'],
        podcast: ['mp3', 'mp4', 'm4a', 'wav'],
        newsletter: ['pdf'],
        magazine: ['pdf'],
        article: ['pdf'],
        images: ['jpg', 'png', 'jpeg']
    }

    const [dropZone, setDropZone] = useState(false)
    const [fileSelected, setFileSelected] = useState(false)

    function handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        setDropZone(true)
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDropZone(true)
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDropZone(false)
    }

    function handleDrop(event) {
        event.preventDefault();
        let file = event.dataTransfer.files[0];
        const src = URL.createObjectURL(file);
        const preview = document.getElementById("image-placeholder");
        preview.srcset = '';
        preview.src = src;
        setFileSelected(true)
        onUpload(file)

    }

    function upload(event) {
        if (event.target.files.length > 0) {
            const src = URL.createObjectURL(event.target.files[0]);
            const preview = document.getElementById("image-placeholder");
            preview.srcset = '';
            preview.src = src;
            setFileSelected(true)
        }


        onUpload(event.target.files[0])
    }

    useEffect(() => {
        if (data.file && data.contentType.type == 'image') {
            const src = URL.createObjectURL(data.file);
            const preview = document.getElementById("image-placeholder");
            preview.srcset = '';
            preview.src = src;
            setFileSelected(true)
        }
    }, [data])
    return (
        <div>
            {/* <div>
            <div className={styles.subject}>
                بارگذاری محتوا
            </div>
            </div> */}
            <div>
                <div className={styles.uploadStepContainer}>

                    <div className={styles.title}>
                        محتوای خودرا بارگزاری کنید.
                    </div>
                    <div
                        className={`${styles.uploadBox} ${dropZone ? styles.dragOver : ''}`}
                        onDragEnter={(event) => handleDragEnter(event)}
                        onDragOver={(event) => handleDragOver(event)}
                        onDragLeave={(event) => handleDragLeave(event)}
                        onDrop={(event) => handleDrop(event)}
                    >
                        <div className={styles.placeholderContainer}>
                            <div className={styles.image}>
                                {!fileSelected && <Image src={ImagePlaceholder} alt='' />}


                                <iframe className={styles.iframe} id="image-placeholder"></iframe>

                            </div>
                            <div className={styles.text}>
                                پیش نمایش محتوا
                            </div>
                        </div>
                        <div className={styles.description}>
                            فایل انتخابی باید دارای {validTypes[data.contentType.name].length > 1 ? 'یکی از فرمت های' : 'فرمت'}:
                            {
                                validTypes[data.contentType.name].map((item, index) => {
                                    return (`${index !== 0 ? ',' : ''} ${item}`)
                                })
                            } باشد حداکثر حجم 200 مگابایت است.
                        </div>
                        <div className={styles.details}>
                            <div className={styles.title}>
                                پیوند ها:
                            </div>
                            <div className={styles.description}>
                                {data.file ? data.file.size : 'لینک محتوا'}
                            </div>
                        </div>
                        <div className={styles.details}>
                            <div className={styles.title}>
                                نام فایل:
                            </div>
                            <div className={styles.description}>
                                {data.file ? data.file.name : 'نام فایل بارگزاری شده'}
                            </div>
                        </div>
                    </div>
                    <div className={styles.usageText}>
                        برای بارگزاری محتوای خود آنها را در داخل جعبه بکشید یا از منو زیر فایل خود را انتخاب کنید.
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button disabled={loading} type='upload' classes={styles.button}>
                            <label htmlFor="upload">{loading ? 'لطفا صبر کنید...' : 'انتخاب فایل ها'}</label>
                            {!loading && <input id='upload' type="file" onChange={(e) => upload(e)} />}
                        </Button>
                        {(data.file && !loading) ?
                            (
                                <Button type='upload' classes={styles.button} onClick={() => onStepForward()}>
                                    <div className={styles.continue}>تایید و ادامه</div>
                                </Button>
                            ) : ''
                        }
                    </div>
                    <div className={styles.rules}>
                        با بارگزاری محتوای خود در دیجی نشر، موافقتتان را با شرایط و قوانین ودستورالعمل های دیجی نشر اعلام می‌کنید. لطفا مطمئن شوید که حقوق نشر و حریم خصوصی را نقض نمی‌کنید. <br />بیشتر بدانید
                    </div>
                </div>
            </div>

        </div>

    )
}
