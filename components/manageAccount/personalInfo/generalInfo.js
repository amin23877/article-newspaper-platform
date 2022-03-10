import React, { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import FormContainer from "components/manageAccount/personalInfo/formContainer";
import { useUpdateUser } from "hooks/manage-account/useUpdateUser";
import { actual } from ".";
import styles from "styles/components/manageAccount/PersonalInfo.module.scss";

function GeneralInfoForm({ title, fields, fieldsName }) {
    const { status, fetcher } = useUpdateUser();

    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: { [fieldsName]: fields } });

    const { fields: fieldsArray, replace } = useFieldArray({ control, name: fieldsName });

    const submitHandler = (data) => {
        /* The data that the react-hook-form returns is an array of fields with new values,
         * but the body that must be sent to the server must be an object.
         * This phrase does this.*/
        const validData = data[fieldsName].reduce((prev, current) => {
            prev[current.name] = current.value;
            return prev;
        }, {});

        fetcher(validData);
    };

    // update input values if fields changes
    useEffect(() => {
        replace(fields);
    }, [fields, replace]);

    // show alert to user when update proccess completed
    useEffect(() => {
        if (status === "success") {
            alert("اطلاعات با موفقیت ویرایش شد");
        } else if (status === "error") {
            alert("ویرایش اطلاعات با مشکل مواجه شد");

            // reset form when if update failed
            reset();
        }
    }, [reset, status]);

    return (
        <FormContainer title={title} onSubmit={handleSubmit(submitHandler)}>
            {fieldsArray.map((field, index) => (
                <p className={styles.formControl} key={field.id}>
                    <label>{field.label}</label>
                    <input
                        className={styles.input}
                        placeholder={field.placeholder}
                        {...register(`${fieldsName}.${index}.value`)}
                    />
                </p>
            ))}
        </FormContainer>
    );
}

/*
 * two belove component only cumpute fields based on user info
 * and pass to 'GeneralInfoForm' component for handle form
 */

function LegalUserGeneralInfoForm({ user }) {
    const LegalUserFields = useMemo(
        () => [
            {
                name: "username",
                label: "نام کاربری",
                value: user.username,
            },
            {
                name: "companyName",
                placeholder: "نام ثبتی خود را وارد نمایید.",
                label: "نام کامل شرکت",
                value: user.companyName,
            },
            {
                name: "companyType",
                placeholder: "نوع شرکت را وارد نمایید",
                label: "نوع شرکت",
                value: user.companyType,
            },
            {
                name: "companyRegisterNum",
                placeholder: "شماره ثبت شرکت را وارد نمایی.",
                label: "شماره ثبت",
                value: user.companyRegisterNum,
            },
            {
                name: "companyNationalId",
                placeholder: "شناسه ملی خود را وارد نمایید.",
                label: "شناسه ملی",
                value: user.companyNationalId,
            },
            {
                name: "companyEconomicId",
                placeholder: "کد اقتصادی شرکت را وارد نمایید.",
                label: "کد اقتصادی",
                value: user.companyEconomicId,
            },
            {
                name: "msisdn",
                label: "شماره همراه",
                value: user.msisdn,
            },
            {
                name: "email",
                placeholder: "پست الکترونیکتان را وارد نمایید.",
                label: "پست الکترونیک",
                value: user.email,
            },
        ],
        [user]
    );

    return (
        <GeneralInfoForm
            title="اطلاعات حقوقی"
            fields={LegalUserFields}
            fieldsName="legalUserInfoForm"
        />
    );
}

function ActualUserGeneralInfoForm({ user }) {
    const ActaulUserFields = useMemo(
        () => [
            {
                name: "username",
                label: "نام نام خانوادگی",
                placeholder: "",
                value: user.username,
            },
            {
                name: "personNationalId",
                label: "کد ملی",
                placeholder: "کد ملی خود را بدون خط تیره وارد نمایید.",
                value: user.personNationalId,
            },
            {
                name: "msisdn",
                label: "شماره همراه",
                placeholder: "",
                value: user.msisdn,
            },
            {
                name: "email",
                label: "پست الکترونیک",
                placeholder: "پست الکترونیکتان را وارد نمایید.",
                value: user.email,
            },
        ],
        [user]
    );

    return (
        <GeneralInfoForm
            title="اطلاعات حقیقی"
            fields={ActaulUserFields}
            fieldsName="actualUserInfoForm"
        />
    );
}

/*
 * this component return approprite form based on publisher type
 */

function GeneralInfo({ publisherType, user }) {
    return publisherType === actual ? (
        <ActualUserGeneralInfoForm user={user} />
    ) : (
        <LegalUserGeneralInfoForm user={user} />
    );
}

export default GeneralInfo;
