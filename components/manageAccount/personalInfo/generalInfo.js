import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import FormContainer from "components/manageAccount/personalInfo/formContainer";
import CustomInput from "components/common/input";

import styles from "styles/components/manageAccount/PersonalInfo.module.scss";
import Text from "components/common/text";
import { actual } from ".";

const ActualUserFields = [
    {
        name: "username",
        label: "نام نام خانوادگی",
        placeholder: "",
    },
    {
        name: "personNationalId",
        label: "کد ملی",
        placeholder: "کد ملی خود را بدون خط تیره وارد نمایید.",
    },
    {
        name: "msisdn",
        label: "شماره همراه",
        placeholder: "",
    },
    {
        name: "email",
        label: "پست الکترونیک",
        placeholder: "پست الکترونیکتان را وارد نمایید.",
    },
];

const LegalUserFields = [
    {
        name: "username",
        label: "نام کاربری",
    },
    {
        name: "companyName",
        placeholder: "نام ثبتی خود را وارد نمایید.",
        label: "نام کامل شرکت",
    },
    {
        name: "companyType",
        placeholder: "نوع شرکت را وارد نمایید",
        label: "نوع شرکت",
    },
    {
        name: "companyRegisterNum",
        placeholder: "شماره ثبت شرکت را وارد نمایی.",
        label: "شماره ثبت",
    },
    {
        name: "companyNationalId",
        placeholder: "شناسه ملی خود را وارد نمایید.",
        label: "شناسه ملی",
    },
    {
        name: "companyEconomicId",
        placeholder: "کد اقتصادی شرکت را وارد نمایید.",
        label: "کد اقتصادی",
    },
    {
        name: "msisdn",
        label: "شماره همراه",
    },
    {
        name: "email",
        placeholder: "پست الکترونیکتان را وارد نمایید.",
        label: "پست الکترونیک",
    },
];

function GeneralInfo({ publisherType, user }) {
    // detect fields based on publisher type
    const [fields, setFields] = useState(
        publisherType === actual ? ActualUserFields : LegalUserFields
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const submitHandler = (data) => {
        console.log(data);
    };

    // update fields when pulisher type changes
    useEffect(() => {
        if (publisherType === actual) setFields(ActualUserFields);
        else setFields(LegalUserFields);
    }, [publisherType]);

    // set defalut values for inputs
    useEffect(() => {
        if (user) {
            setValue("username", user.username);
            setValue("msisdn", user.msisdn);
        }
    }, [setValue, user]);

    return (
        <FormContainer
            title={publisherType === actual ? 'اطلاعات شخصی': 'اطلاعات حقوقی'}
            onSubmit={handleSubmit(submitHandler)}
        >
            {fields.map((field) => (
                <div key={field.name} className={styles.formControl}>
                    <Text component="label" color="black" weight="bold">
                        {field.label} :
                    </Text>

                    <CustomInput
                        register={register}
                        placeholder={field.placeholder}
                        name={field.name}
                        validation={{ required: "پر کردن این فیلد الزامی است" }}
                        error={errors[field.name]}
                    />
                </div>
            ))}
        </FormContainer>
    );
}

export default GeneralInfo;
