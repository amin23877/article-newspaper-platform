import EditContainer from 'components/manageAccount/editContainer';
import CustomInput from 'components/common/input';
import Button from "components/common/button";
import NoProfilePic from 'assets/svg/common/no-profile.svg';
import NoCoverPic from 'assets/svg/common/no-cover.svg';
import Image from 'next/image';
import { useEffect, useState, useAsyncState} from 'react';
import {useForm} from "react-hook-form";
import styles from 'styles/components/manageAccount/PersonalInfo.module.scss';
import editContainerStyles from 'styles/components/manageAccount/EditContainer.module.scss';
import Cookies from 'js-cookie';

export default function PersonalInfo ({user}) {

    const [providerType, setProviderType] = useState('ناشر حقیقی')
    const Haghighi = 'ناشر حقیقی'
    const Hoghughi = 'ناشر حقوقی'

    const { register: infoFormRegister, handleSubmit: handleGeneralSubmit, formState: {errors}, setValue  } = useForm();
    const { register: profileFormRegister, handleSubmit: handleProfileSubmit, formState: {errors: profileErrors}  } = useForm();
    const { register: aboutYouRegister, handleSubmit: handleAboutYouSubmit, formState: {errors: aboutErrors}  } = useForm();
    const { register: socialRegister, handleSubmit: handleSocialSubmit, formState: {errors: socialErrors}  } = useForm();

    const [generalFields, setGeneralFields] = useState([
                    {name: "username", label: 'نام نام خانوادگی', placeholder: ''},
                    {name: "nationalID", label: 'کد ملی', placeholder: 'کد ملی خود را بدون خط تیره وارد نمایید.'},
                    {name: "msisdn", label: 'شماره همراه', placeholder: ''},
                    {name: "email", label: 'پست الکترونیک', placeholder: 'پست الکترونیکتان را وارد نمایید.'},
                ])

    const [profileFields, setProfileFields] = useState([
                    {name: "profilePic", label: 'عکس پروفایل', placeholder: ''},
                    {name: "coverPic", label: 'عکس کاور', placeholder: 'کد ملی خود را بدون خط تیره وارد نمایید.'},
                    {name: "content", label: 'محتوا', placeholder: 'در حال تولید چه محتوایی هستید. حداکثر 40 کاراکتر'},
                ])

    const [generalInfo, setGeneralInfo] = useState(
            {
                username: '',
                nationalID: '',
                phone: '',
                email: '',
                profilePic: '',
                coverPic: '',
                content: '',
                about: '',
                social: []
            }
        )
    const socials = [
        'اینستاگرام',
        'یوتیوب',
        'آپارات',
        'لینکدین',
        'مدیوم',
        '...'
    ];

    useEffect(() => {
        if (user !== undefined) {
            if (providerType === Haghighi) {
                let tempGeneralInfo = {
                    ...generalInfo,
                    username: user.username,
                    nationalID: '',
                    phone: user.msisdn,
                    email: '',
                    profilePic: user.profilePicture,
                    coverPic: user.coverImage,
                }
                setGeneralInfo(tempGeneralInfo)
                for (let field of generalFields) {
                    setValue(field.name, user[field.name])
                }
            }
            else if (providerType === Hoghughi) {
                let hoghughiGeneralInfo = [
                    {name: 'نام کاربری', value: user.username},
                    {name: 'نام کامل شرکت', value: 'نام ثبتی خود را وارد نمایید.'},
                    {name: 'نوع شرکت', value: user.username || 'نوع شرکت را وارد نمایید'},
                    {name: 'شماره ثبت', value: 'شماره ثبت شرکت را وارد نمایی.'},
                    {name: 'شناسه ملی', value: 'شناسه ملی خود را وارد نمایید.'},
                    {name: 'کد اقتصادی', value: 'کد اقتصادی شرکت را وارد نمایید.'},
                    {name: 'شماره همراه', value: user.msisdn},
                    {name: 'پست الکترونیک', value: user.email || 'پست الکترونیکتان را وارد نمایید.'},
                ]
                setGeneralFields(hoghughiGeneralInfo)
            }
            
        }
    },[user, providerType])

    const changeType = (e) => {
        setProviderType(e.currentTarget.value)
    }

    const onInfoSubmit = async data => {
        await setGeneralInfo({
                ...generalInfo,
                username: data.username,
                nationalID: data.nationalID,
                phone: data.phone,
                email: data.email
        })
    }

    const onPicturesSubmit = async data => {
        await setGeneralInfo({
                ...generalInfo,
                profilePic: URL.createObjectURL(data.profilePic[0]),
                coverPic: URL.createObjectURL(data.coverPic[0]),
                content: data.content
        })
    }

    const onAboutYouSubmit = async data => {
        await setGeneralInfo({
            ...generalInfo,
            about: data.about
        })
    }

    const onSocialSubmit = async data => {
        let tempSocial = {name: data.name, link: data.link}
        console.log(tempSocial)
        await setGeneralInfo({
            ...generalInfo,
            social: [...generalInfo.social, tempSocial]
        })
    }
   
    return (
        <>
            <div className={styles.radioButtons}>
                <div className={styles.realLabel}>
                    ناشر حقیقی
                <label><input type="radio" id="haghighi" name="type" value="ناشر حقیقی"
                        checked={providerType === Haghighi} onChange={(e) => changeType(e)}/>
                
                <span></span>
                </label>
                </div>

                <div className={styles.realLabel}>
                    ناشر حقوقی
                <label><input type="radio" id="hoghughi" name="type" value="ناشر حقوقی"
                checked={providerType === Hoghughi}
                onChange={(e) => changeType(e)}
                />
                <span></span>
                </label>
                </div>
            </div>
            <EditContainer
            providerType={providerType}
            title={providerType ===  'ناشر حقیقی'? 'اطلاعات شخصی': 'اطلاعات حقوقی'}
            >
                <form onSubmit={handleGeneralSubmit(onInfoSubmit)} className={editContainerStyles.generalInfo}>
                    {generalFields.map((field) => {
                        return (
                            <div key={field.name} className={editContainerStyles.field}>
                            
                                <div className={editContainerStyles.label}>{`${field.label}:`}</div>
                                <CustomInput register={infoFormRegister} 
                                placeholder={field.placeholder}
                                name={field.name} 
                                validation={{required: 'پر کردن این فیلد الزامی است'}}
                                error={errors[field.name]}
                                />
                            </div>
                            
                        )
                    })}
                    <Button classes={styles.editButton} variant='filled'
                    type='submit'
                    >
                        ویرایش پروفایل
                    </Button>
                </form> 
            </EditContainer>
            <EditContainer providerType={providerType} title='پروفایل'>
                <div className={styles.profileContainer} >
                    <form onSubmit={handleProfileSubmit(onPicturesSubmit)} className={styles.profileInfo}>
                        <div className={styles.grid}>
                        <div>
                        {profileFields.map((field, index) => {
                            if (index !== 2) {
                                return (
                                    <div key={field.name} className={styles.field}>
                                        <div className={styles.label}>{`${field.label}:`}</div>
                                        {field.name.includes('Pic') ? 
                                        <div className={styles.hint}>حجم تصویر انتخابی کمتر از 400 کیلوبایت باشد.</div>
                                        :null
                                        }
                                        <CustomInput register={profileFormRegister} 
                                        placeholder={field.placeholder}
                                        name={field.name} 
                                        validation={{required: 'پر کردن این فیلد الزامی است'}}
                                        error={profileErrors[field.name]}
                                        type={field.name.includes('Pic') ? 'file' : 'text'}
                                        />
                                    </div>
                                )
                            }
                        })}
                        </div>

                        <div className={styles.pictures}>
                            <div className={styles.profilePic}>
                                <Image src={generalInfo.profilePic ? generalInfo.profilePic : NoProfilePic} alt='profile-pic'
                                width={80} height={80}
                                 />
                            </div>
                            <div>
                                <Image src={generalInfo.coverPic ? generalInfo.coverPic : NoCoverPic} alt='cover-pic'
                                width={530}
                                height={130}
                                 />
                            </div>
                        </div>
                        </div>

                        <div key={profileFields[2].name} className={styles.field}>
                            <div className={styles.label}>{`${profileFields[2].label}:`}</div>
                            {profileFields[2].name.includes('Pic') ? 
                            <div className={styles.hint}>حجم تصویر انتخابی کمتر از 400 کیلوبایت باشد.</div>
                            :null
                            }
                            <CustomInput register={profileFormRegister} 
                            placeholder={profileFields[2].placeholder}
                            name={profileFields[2].name} 
                            validation={{required: 'پر کردن این فیلد الزامی است'}}
                            error={profileErrors[profileFields[2].name]}
                            type={profileFields[2].name.includes('Pic') ? 'file' : 'text'}
                            />
                        </div>
                        <Button classes={styles.editButton} variant='filled'
                        type='submit'
                        >
                            ویرایش پروفایل
                        </Button>
                    </form>
                    
                </div>
                
            </EditContainer>
            <EditContainer providerType={providerType} title='درباره تو'>
                <form onSubmit={handleAboutYouSubmit(onAboutYouSubmit)} className={styles.aboutYouForm}>
                    <div className={editContainerStyles.field}>          
                        <CustomInput register={aboutYouRegister} 
                        placeholder='درباره خود و حوزه محتواهایی که تولید میکنید می توانید برای مخاطب خود بنویسید.'
                        name='about' 
                        validation={{required: 'پر کردن این فیلد الزامی است'}}
                        error={aboutErrors.about}
                        />
                    </div>
                    <Button classes={styles.editButton} variant='filled'
                    type='submit'
                    >
                        ویرایش پروفایل
                    </Button>
                </form>
            </EditContainer>
            <EditContainer providerType={providerType} title='آدرس اینترنتی و شبکه های اجتماعی'>
                <form onSubmit={handleSocialSubmit(onSocialSubmit)} className={styles.aboutYouForm}>
                    <div className={editContainerStyles.field}>          
                        <CustomInput register={socialRegister} 
                        name='name' 
                        validation={{required: 'پر کردن این فیلد الزامی است'}}
                        error={socialErrors.name}
                        type='select'
                        list={socials}
                        classes={styles.selectInput}
                        />
                        
                    </div>
                    <div className={editContainerStyles.field}>          
                        <CustomInput register={socialRegister} 
                        // placeholder='درباره خود و حوزه محتواهایی که تولید میکنید می توانید برای مخاطب خود بنویسید.'
                        name='link' 
                        validation={{required: 'پر کردن این فیلد الزامی است'}}
                        error={socialErrors.link}
                        />
                    </div>
                    <Button classes={styles.editButton} variant='filled'
                    type='submit'
                    >
                        ثبت
                    </Button>
                </form>
            </EditContainer>
        </>
    )
}