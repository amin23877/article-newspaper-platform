import { useForm } from "react-hook-form";
import FormContainer from "./formContainer";
import CustomInput from "components/common/input";
import Text from "components/common/text";

import styles from "styles/components/manageAccount/PersonalInfo.module.scss";

function SocialMedia() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitHandler = (data) => {
        console.log(data);
    };

    return (
        <FormContainer
            title="ادرس اینترنتی و شبکه های اجتماعی"
            onSubmit={handleSubmit(submitHandler)}
        >
            <select className={styles.select}>
                <option selected value="">
                    انتخاب کنید
                </option>
                <option value="instagram">اینستاگرام</option>
                <option value="youtube">یوتیوب</option>
                <option value="aparat">آپارات</option>
                <option value="linkedin">لینکدین</option>
                <option value="medium">مدیوم</option>
            </select>

            <div className={styles.formControlFullwidth}>
                <Text component="label" color="black" weight="bold">
                    افزودن لینک :
                </Text>

                <CustomInput
                    register={register}
                    name="add-url"
                    validation={{ required: "پر کردن این فیلد الزامی است" }}
                />
            </div>

            <div className={styles.socialLink}>
                
            </div>
        </FormContainer>
    );
}

export default SocialMedia;
