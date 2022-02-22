import EditContainer from 'components/manageAccount/editContainer';
import CustomInput from 'components/common/input';
import Button from "components/common/button";
import NoProfilePic from 'assets/svg/common/no-profile.svg';
import NoCoverPic from 'assets/svg/common/no-cover.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useAsyncState} from 'react';
import {useForm} from "react-hook-form";
import styles from 'styles/components/manageAccount/PersonalInfo.module.scss';
import editContainerStyles from 'styles/components/manageAccount/EditContainer.module.scss';
import { updateUser } from 'hooks/useUser';
import { useUploadFile } from 'hooks/useUploadFile';
import Cookies from 'js-cookie';

export default function PersonalInfo ({user}) {
    const router = useRouter()

    const [upload, uploadFileData] = useUploadFile();
    const [providerType, setProviderType] = useState('ناشر حقیقی')
    const Haghighi = 'ناشر حقیقی'
    const Hoghughi = 'ناشر حقوقی'

    const [profilePic , setProfilePic] = useState()
    const [coverPic, setCoverPic] = useState()

    const { register: infoFormRegister, handleSubmit: handleGeneralSubmit, formState: {errors}, setValue  } = useForm();
    const { register: profileFormRegister, handleSubmit: handleProfileSubmit, formState: {errors: profileErrors}, setValue: setAboutContent  } = useForm();
    const { register: aboutYouRegister, handleSubmit: handleAboutYouSubmit, formState: {errors: aboutErrors} , setValue: setAbout } = useForm();
    const { register: socialRegister, handleSubmit: handleSocialSubmit, formState: {errors: socialErrors}, setValue: setSocials, getValues: getSocials  } = useForm();

    const [generalFields, setGeneralFields] = useState([
                    {name: "username", label: 'نام نام خانوادگی', placeholder: ''},
                    {name: "personNationalId", label: 'کد ملی', placeholder: 'کد ملی خود را بدون خط تیره وارد نمایید.'},
                    {name: "msisdn", label: 'شماره همراه', placeholder: ''},
                    {name: "email", label: 'پست الکترونیک', placeholder: 'پست الکترونیکتان را وارد نمایید.'},
                ])

    const [profileFields, setProfileFields] = useState([
                    {name: "profilePic", label: 'عکس پروفایل', placeholder: ''},
                    {name: "coverPic", label: 'عکس کاور', placeholder: 'کد ملی خود را بدون خط تیره وارد نمایید.'},
                    {name: "aboutUserContent", label: 'محتوا', placeholder: 'در حال تولید چه محتوایی هستید. حداکثر 40 کاراکتر'},
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
        'facebook',
        'instagram',
        'linkedin',
        'twitter',
        '...'
    ];

    useEffect(() => {
        if (user !== undefined) {  
            console.log(user)
            setInitialInfo(JSON.parse(JSON.stringify(user)))
            if (user.accountType === 'personal') {
                setGeneralInfo(user)
                for (let field of generalFields) {  
                    setValue(field.name, user[field.name])
                }
                if (user.profilePicture !== null) {
                    setProfilePic(user.profilePicture.url) 
                }
                if (user.coverImage !== null) {
                    setCoverPic(user.coverImage.url)
                }
                setAboutContent('aboutUserContent', user.aboutUserContent)
                setAbout('about', user.aboutMe)
                setSocials('socials', user.socials)
            }
            else {
                setProviderType(Hoghughi)
                setGeneralInfo(user)
                // initialInfo = tempGeneralInfo
                for (let field of generalFields) {
                    setValue(field.name, user[field.name])
                }
            }
        }
        console.log(generalInfo)
    },[user, providerType])

    const changeType = async (e) => {
        await setProviderType(e.target.value)
        await setGeneralInfo({
            ...generalInfo,
            accountType: (e.target.value === Haghighi) ? 'personal' : 'company'
        })
        if (e.target.value === 'ناشر حقوقی') {
            setGeneralFields([
                    {name: "username", label: 'نام کاربری'},
                    {name: "companyName", placeholder: 'نام ثبتی خود را وارد نمایید.', label: 'نام کامل شرکت'},
                    {name: "companyType", placeholder: 'نوع شرکت را وارد نمایید', label: 'نوع شرکت'},
                    {name: "companyRegisterNum", placeholder: 'شماره ثبت شرکت را وارد نمایی.', label: 'شماره ثبت'},
                    {name: "companyNationalId", placeholder: 'شناسه ملی خود را وارد نمایید.', label: 'شناسه ملی'},
                    {name: "companyEconomicId", placeholder: 'کد اقتصادی شرکت را وارد نمایید.', label: 'کد اقتصادی'},
                    {name: "msisdn", label: 'شماره همراه'},
                    {name: "email", placeholder: 'پست الکترونیکتان را وارد نمایید.', label: 'پست الکترونیک'},
                ])
        }
        else if (e.target.value === 'ناشر حقیقی') {
            setGeneralFields([
                    {name: "username", label: 'نام نام خانوادگی', placeholder: ''},
                    {name: "personNationalId", label: 'کد ملی', placeholder: 'کد ملی خود را بدون خط تیره وارد نمایید.'},
                    {name: "msisdn", label: 'شماره همراه', placeholder: ''},
                    {name: "email", label: 'پست الکترونیک', placeholder: 'پست الکترونیکتان را وارد نمایید.'},
                ])
        }
    }

    function changedValues(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        let changedValues = {}
        console.log('key1', keys1)
        console.log('key2:', keys2)
        for (let key of keys1) {
            // if (typeof(object1[key]) !== 'object') {
                if (object1[key] !== object2[key]) {
                    changedValues[key] = object2[key]
                }
            // }
        }
        return changedValues;
    }

    const onInfoSubmit = async data => {
        if (providerType === Hoghughi) {
            await setGeneralInfo({
                ...generalInfo,
                username: data.username,
                companyName: data.companyName,
                companyType: data.companyType,
                companyRegisterNum: data.companyRegisterNum,
                companyNationalId: data.companyNationalId,
                companyEconomicId: data.companyEconomicId,
                msisdn: data.msisdn,
                email: data.email
            })
        }
        else {
            await setGeneralInfo({
                ...generalInfo,
                username: data.username,
                personNationalId: data.personNationalId,
                msisdn: data.msisdn,
                email: data.email
            })
        }
        
        
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

    const onProfileChange = async (e) => {
        if (e.target.name === 'profilePic') { 
            await setProfilePic(URL.createObjectURL(e.target.files[0]))
        }
        if (e.target.name === 'coverPic') {
            await setCoverPic(URL.createObjectURL(e.target.files[0]))
        }
    }

    const onPicturesSubmit = async data => {
        const accessToken = Cookies.get('accessToken')
        console.log(accessToken)
        let profile = await upload(data.profilePic[0], 'image', accessToken);
        let cover = await upload(data.coverPic[0], 'image', accessToken);
        await setGeneralInfo({
            ...generalInfo,
            profilePicture: profile.fileId,
            coverImage: cover.fileId,
            aboutUserContent: data.aboutUserContent
        })
    }

    const onAboutYouSubmit = async data => {
        await setGeneralInfo({
            ...generalInfo,
            aboutMe: data.about
        })
    }

    const onSocialSubmit = async data => {
        let tempSocial = user.socials
        tempSocial[data.name] = data.link
        await setGeneralInfo({
            ...generalInfo,
            socials: tempSocial
        })

        const changedInfo = changedValues(initialInfo, generalInfo)
        console.log(changedInfo)
        console.log('initial', initialInfo)
        console.log('final', generalInfo)
        const status = await updateUser(changedInfo)
        if (status === 'ok') {
            //alert('اطاعات با موفقیت ویرایش شد.')
            //router.reload()
        }
    }

    const showSocials = () => {
        let socials = []
        for (const social in getSocials('socials')) {
            
            if (social !== '_id' && getSocials('socials')[social]) {
                let tempSocial  = {}
                tempSocial.name = social
                tempSocial.address = getSocials('socials')[social]
                socials.push(tempSocial)
            }
        }
        return socials
    }
   
    return (
        <>
            <div className={styles.radioButtons} id="#">
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
                                        onChange={onProfileChange}
                                        // validation={{required: 'پر کردن این فیلد الزامی است'}}
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
                                <Image src={profilePic !== undefined ? profilePic : NoProfilePic} alt='profile-pic'
                                width={80} height={80}
                                 />
                            </div>
                            <div>
                                <img src={coverPic !== undefined ? coverPic : NoCoverPic} alt='cover-pic'
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
                            // validation={{required: 'پر کردن این فیلد الزامی است'}}
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
                        // validation={{required: 'پر کردن این فیلد الزامی است'}}
                        error={socialErrors.link}
                        />
                    </div>
                    <div style={{marginTop: 20, marginRight: 5}}>
                        {showSocials().map((social, index) => {
                            return (
                                <div key={index}>
                                    
                                    <span>{social.address}</span>
                                    <span>{` : ${social.name}`}</span>
                                </div>
                            )
                        })}
                    </div>
                    {/* <Link href='/manage-account/#' passHref> */}
                    <Button classes={styles.editButton} variant='filled'
                    type='submit'
                    >
                        ثبت
                    </Button>
                    {/* </Link> */}
                </form>
            </EditContainer>
        </>
    )
}