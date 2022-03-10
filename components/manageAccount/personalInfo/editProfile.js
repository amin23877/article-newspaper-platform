import FormContainer from "./formContainer";
import Text from "components/common/text";
import CustomInput from "components/common/input";
import { useForm } from "react-hook-form";
import Image from 'next/image'

import styles from "styles/components/manageAccount/PersonalInfo.module.scss";

import defaultProfile from 'assets/images/profile/default-profile-img.svg'

function EditProfile() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <FormContainer title="پروفایل">
            <div className={styles.formControlHorizontal}>
                <div>
                    <Text component="h3" size="l" color="black">
                        عکس پروفایل
                    </Text>
                    <Text>حجم تصویر انتخابی کمتر از 400 کیلوبایت باشد</Text>
                </div>

                <div className={styles.selectProfilePicture}>
                    <Image width={80} height={80} alt='user-profile' src={defaultProfile}/>
                </div>

                <input type="file" hidden />
            </div>

            <div className={styles.formControlHorizontal}>
                <div style={{flexShrink: 0}}>
                    <Text component="h3" size="l" color="black">
                        عکس کاور
                    </Text>
                    <Text>حجم تصویر انتخابی کمتر از 400 کیلوبایت باشد</Text>
                </div>

                <div className={styles.selectCover} />

                <input type="file" hidden />
            </div>

            <div className={styles.formControl}>
                <Text component="label" color="black" weight="bold">
                    محتوا :
                </Text>

                <CustomInput
                    register={register}
                    name="biography"
                    validation={{ required: "پر کردن این فیلد الزامی است" }}
                />
            </div>
        </FormContainer>
    );
}

export default EditProfile;
