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
import { updateUser } from 'hooks/useUser';

export default function PersonalInfo ({user}) {

    const [providerType, setProviderType] = useState('ناشر حقیقی')
    const Haghighi = 'ناشر حقیقی'
    const Hoghughi = 'ناشر حقوقی'

    const { register: infoFormRegister, handleSubmit: handleGeneralSubmit, formState: {errors}, setValue  } = useForm();
    const { register: profileFormRegister, handleSubmit: handleProfileSubmit, formState: {errors: profileErrors}  } = useForm();
    const { register: aboutYouRegister, handleSubmit: handleAboutYouSubmit, formState: {errors: aboutErrors} , setValue: setAbout } = useForm();
    const { register: socialRegister, handleSubmit: handleSocialSubmit, formState: {errors: socialErrors}  } = useForm();

    const [generalFields, setGeneralFields] = useState([
                    {name: "username", label: 'نام نام خانوادگی', placeholder: ''},
                    {name: "personNationalId", label: 'کد ملی', placeholder: 'کد ملی خود را بدون خط تیره وارد نمایید.'},
                    {name: "msisdn", label: 'شماره همراه', placeholder: ''},
                    {name: "email", label: 'پست الکترونیک', placeholder: 'پست الکترونیکتان را وارد نمایید.'},
                ])

    const [profileFields, setProfileFields] = useState([
                    {name: "profilePic", label: 'عکس پروفایل', placeholder: ''},
                    {name: "coverPic", label: 'عکس کاور', placeholder: 'کد ملی خود را بدون خط تیره وارد نمایید.'},
                    {name: "content", label: 'محتوا', placeholder: 'در حال تولید چه محتوایی هستید. حداکثر 40 کاراکتر'},
                ])

    const [admins, setAdmins] = useState([
        {username: '', phone: ''},
        {username: '', phone: ''},
        {username: '', phone: ''},
    ])

    const [adminIndex, setAdminIndex] = useState(0)

    let currentAdmin = {username: '', phone: ''}

    const [generalInfo, setGeneralInfo] = useState()
    const [initialInfo, setInitialInfo] = useState()

    const socials = [
        'instagram',
        'youtube',
        'aparat',
        'linkedin',
        'medium',
        '...'
    ];

    useEffect(() => {
        if (user !== undefined) {  
            console.log(user)
            setInitialInfo(JSON.parse(JSON.stringify(user)))

            if (providerType === 'ناشر حقیقی') {
                // let tempGeneralInfo = {
                //     ...generalInfo,
                //     username: user.username,
                //     personNationalId: '123345556',
                //     msisdn: user.msisdn,
                //     email: '',
                //     profilePic: user.profilePicture,
                //     coverPic: user.coverImage,
                // }
                
                setGeneralInfo(user)
                for (let field of generalFields) {
                    
                    setValue(field.name, user[field.name])
                }
                setAbout('about', user.aboutMe)
            }
            else {
                let tempGeneralInfo = {
                    ...generalInfo,
                    username: user.username,
                    companyName: '',
                    companyType: '',
                    number: '',
                    nationalCode: '',
                    financialCode: '',
                    msisdn: user.msisdn,
                    email: '',
                    admins: [],
                    profilePic: user.profilePicture,
                    coverPic: user.coverImage,
                }
                setGeneralInfo(tempGeneralInfo)
                // initialInfo = tempGeneralInfo
                for (let field of generalFields) {
                    setValue(field.name, user[field.name])
                }
            }
        }
    },[user, providerType])

    const changeType = (e) => {
        setProviderType(e.currentTarget.value)
        if (e.currentTarget.value === 'ناشر حقوقی') {
            setGeneralFields([
                    {name: "username", label: 'نام کاربری'},
                    {name: "companyName", placeholder: 'نام ثبتی خود را وارد نمایید.', label: 'نام کامل شرکت'},
                    {name: "companyType", placeholder: 'نوع شرکت را وارد نمایید', label: 'نوع شرکت'},
                    {name: "number", placeholder: 'شماره ثبت شرکت را وارد نمایی.', label: 'شماره ثبت'},
                    {name: "nationalCode", placeholder: 'شناسه ملی خود را وارد نمایید.', label: 'شناسه ملی'},
                    {name: "financialCode", placeholder: 'کد اقتصادی شرکت را وارد نمایید.', label: 'کد اقتصادی'},
                    {name: "msisdn", label: 'شماره همراه'},
                    {name: "email", placeholder: 'پست الکترونیکتان را وارد نمایید.', label: 'پست الکترونیک'},
                ])
        }
        else if (e.currentTarget.value === 'ناشر حقیقی') {
            setGeneralFields([
                    {name: "username", label: 'نام نام خانوادگی', placeholder: ''},
                    {name: "personNationalId", label: 'کد ملی', placeholder: 'کد ملی خود را بدون خط تیره وارد نمایید.'},
                    {name: "msisdn", label: 'شماره همراه', placeholder: ''},
                    {name: "email", label: 'پست الکترونیک', placeholder: 'پست الکترونیکتان را وارد نمایید.'},
                ])
        }
    }

    const getModifiedValues = (values, initialValues) => {
        let modifiedValues = {};

        if (values) {
            Object.entries(values).forEach((entry) => {
                let key = entry[0];
                let value = entry[1];

                if (value !== initialValues[key]) {
                    modifiedValues[key] = value;
                }
            });
        }

        return Object.keys(modifiedValues).length === 0 ? null : modifiedValues;
    };

    const onInfoSubmit = async data => {
        await setGeneralInfo({
                ...generalInfo,
                username: data.username,
                personNationalId: data.personNationalId,
                msisdn: data.msisdn,
                email: data.email
        })
    }

    const onChangeAdmin = (e, attr) => {
        currentAdmin[attr] = e.target.value
    }

    const onAddAdmin = async () => {
        let tempAdmins = admins
        tempAdmins[adminIndex] = currentAdmin
        setAdminIndex(adminIndex + 1)
        await setAdmins(tempAdmins)
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
        let tempSocial = user.socials
        tempSocial[data.name] = data.link
        await setGeneralInfo({
            ...generalInfo,
            socials: tempSocial
        })

        //const changedInfo = getModifiedValues(initialInfo, generalInfo)
        //console.log(changedInfo)
        // console.log('initial:', initialInfo)
        console.log('final:', generalInfo)
        const status = await updateUser(generalInfo)
        if (status === 'ok') {
            alert('اطاعات با موفقیت ویرایش شد.')
        }
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
            {providerType === 'ناشر حقوقی' ? 
            <EditContainer providerType={providerType} title='ادمین'>
                <div className={styles.addAdminText}>در صورتی که میخواهید به چند نفر دسترسی دهید شماره تلفن و مشخصات افراد را وارد نمایید.</div>
                {admins.map((admin, index) => {
                    return (
                        
                        <div key={index} className={styles.admin}>
                            <div className={`${styles.user} ${styles.field}`}>
                                <div className={styles.label}>نام کاربری:</div>
                                <CustomInput register={infoFormRegister} 
                                onChange={(e) => onChangeAdmin(e, 'username')}
                                placeholder='سمت یا عنوان'
                                name='adminUser'
                                //value={admins[index].username}
                                // error={errors[field.name]}
                                />
                            </div>
                            <div className={`${styles.phone} ${styles.field}`}>
                                <div className={styles.label}>شماره جهت ورود به حساب کاربری:</div>
                                <CustomInput register={infoFormRegister} 
                                onChange={(e) => onChangeAdmin(e, 'msisdn')}
                                placeholder='شماره ادمین جدید را وارد نمایید.'
                                name='adminUser'
                                //value={admins[index].phone}
                                // error={errors[field.name]}
                                />
                            </div>
                            <div className={styles.access}>
                                <Button variant='outline' classes={styles.adminButton}>
                                    دسترسی
                                </Button>
                            </div>
                        </div>
                
                    )
                })}
                <Button variant='outline' classes={[styles.adminButton, styles.add]}>
                    افزودن
                </Button>
                <Button classes={styles.editButton} variant='filled'
                onClick={() => onAddAdmin()}
                type='submit'
                >
                    ویرایش پروفایل
                </Button>
            </EditContainer>
            :null
            }
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
                                <Image src={NoProfilePic} alt='profile-pic'
                                width={80} height={80}
                                 />
                            </div>
                            <div>
                                <Image src={NoCoverPic} alt='cover-pic'
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