import EditContainer from 'components/manageAccount/editContainer';
import CustomInput from 'components/common/input';
import Button from "components/common/button";
import { useEffect, useState, useAsyncState} from 'react';
import {useForm} from "react-hook-form";
import styles from 'styles/components/manageAccount/PersonalInfo.module.scss';
import editContainerStyles from 'styles/components/manageAccount/EditContainer.module.scss';

export default function PersonalInfo ({user}) {

    const [providerType, setProviderType] = useState('ناشر حقیقی')
    const Haghighi = 'ناشر حقیقی'
    const Hoghughi = 'ناشر حقوقی'

    const { register: infoFormRegister, handleSubmit, formState: {errors}  } = useForm();

    const [generalFields, setGeneralFields] = useState([])
    const [generalInfo, setGeneralInfo] = useState(
            {
                username: '',
                nationalID: '',
                phone: '',
                email: ''
            }
        )

    useEffect(() => {
        if (user !== undefined) {
            if (providerType === Haghighi) {
                let tempGeneralInfo = [
                    {name: "username", value: user.username, label: 'نام نام خانوادگی', placeholder: ''},
                    {name: "nationalID", value: '', label: 'کد ملی', placeholder: 'کد ملی خود را بدون خط تیره وارد نمایید.'},
                    {name: "phone", value: user.msisdn, label: 'شماره همراه', placeholder: ''},
                    {name: "email", value: user.email, label: 'پست الکترونیک', placeholder: 'پست الکترونیکتان را وارد نمایید.'},
                ]
                setGeneralFields(tempGeneralInfo)
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
        let tempGeneralInfo = {
                username: data.username,
                nationalID: data.nationalID,
                phone: data.phone,
                email: data.email
            }
        await setGeneralInfo(tempGeneralInfo)
    }

    console.log(generalInfo)

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
            >
                <form onSubmit={handleSubmit(onInfoSubmit)} className={editContainerStyles.generalInfo}>
                    {generalFields.map((field) => {
                        return (
                            <div key={field.name} className={editContainerStyles.field}>
                            
                                <div className={editContainerStyles.label}>{`${field.label}:`}</div>
                                <CustomInput register={infoFormRegister} 
                                defaultValue={field.value}
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
        </>
    )
}