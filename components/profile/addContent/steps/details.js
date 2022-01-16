
import styles from 'styles/components/profile/addContent/steps/Details.module.scss'
import Button from "components/common/button";
import WrapperCard from "components/profile/addContent/wrapper-card";
import {useState, useEffect} from 'react'
import Image from "next/image";
import ImagePlaceholder from "assets/svg/common/image-upoad-placeholder.svg";

export default function Details({onDetailSubmit}) {

    const subjectsArr = [
        {value: 'iran', text: 'ایران'},
        {value: 'finance', text: 'اقتصاد'},
        {value: 'covid', text: 'covid 19'},
        {value: 'art', text: 'هنر'},
        {value: 'music', text: 'موسیقی'},
    ]

    const [title, setTitle] = useState('')
    const [titleCount, setTitleCount] = useState(0)

    const [description, setDescription] = useState('')
    const [descriptionCount, setDescriptionCount] = useState(0)

    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        setTitleCount(title.length)
    }, [title])

    useEffect(() => {
        setDescriptionCount(description.length)
    }, [description])

    function onSubjectSelect(val) {
        if (!subjects.some(p => p === val)) {
            setSubjects([...subjects, val])
        }
    }

    function upload(event) {
        if(event.target.files.length > 0){
            const src = URL.createObjectURL(event.target.files[0]);
            const preview = document.getElementById("image-placeholder");
            preview.srcset = '';
            preview.src = src;
        }
    }

    return (
        <div className={styles.detailsContainer}>
            <WrapperCard className={styles.wrapper} title="عنوان">
                <div className={styles.content}>
                    <div className={styles.inputContainer}>
                        <input value={title} onChange={(e) => {setTitle(e.target.value)}} type='text' placeholder='عنوانی اضافه کنید که محتوایان را توصیف کند.'/>
                    </div>
                    <div className={styles.counter}>
                        {titleCount}/100
                    </div>
                </div>
            </WrapperCard>
            <WrapperCard className={styles.wrapper} title="توضیحات">
                <div className={styles.content}>
                    <div className={styles.inputContainer}>
                        <textarea value={description} onChange={(e) => {setDescription(e.target.value)}} type='text' placeholder='درباره ی محتوایتان به بینندگان توضیح دهید.'/>
                    </div>
                    <div className={styles.counter}>
                        {descriptionCount}/5000
                    </div>
                </div>
            </WrapperCard>
            <WrapperCard className={styles.wrapper} title="موضوع" description='محتوایتان را به یک یا چند موضوع اضافه کنید. به‌کمک موضوع، بینندگان می‌توانند محتوایتان را سریع‌تر کاوش کنند.بیشتر بدانید'>
                <div className={styles.content}>
                    <div className={styles.selectContainer}>
                        <select name="" id="" onChange={(e) => {onSubjectSelect(e.target.value)}}>
                            {
                                subjectsArr.map((item, index) => {
                                    return (
                                        <option key={index} value={item.value}>{item.text}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className={styles.subjectsContainer}>
                        {
                            subjects.map((item, index) => {
                                return (
                                    <div key={index} className={styles.subject}>{subjectsArr.find(p => p.value === item).text}</div>
                                )
                            })
                        }
                    </div>
                </div>
            </WrapperCard>
            <WrapperCard className={styles.wrapper} title="کاور محتوا" description='تصویری را انتخاب یا بارگذاری کنید که محتوای ویدیوتان را نشان می‌دهد. تصویر کوچکِ مناسب متمایز می‌شود و توجه بینندگان را جلب می‌کند. بیشتر بدانید'>
                <div className={styles.content}>
                    <div className={styles.uploadContent}>
                        <label htmlFor='image-uploader' className={styles.placeholderContainer}>
                            <div className={styles.image}>
                                <Image id="image-placeholder" src={ImagePlaceholder}/>
                            </div>
                            <div className={styles.text}>
                                افزودن تصویر
                            </div>
                        </label>
                        <input id='image-uploader' type="file" style={{display: 'none'}} onChange={(e) => upload(e)}/>
                    </div>
                </div>
            </WrapperCard>
            <div className={styles.buttonContainer}>
                <Button variant='filled' classes={styles.button} onClick={() => onDetailSubmit()}>
                    تایید
                </Button>
            </div>
        </div>
    )
}
