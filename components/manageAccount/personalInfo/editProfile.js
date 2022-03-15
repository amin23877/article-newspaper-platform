import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUser } from "hooks/manage-account/useUpdateUser";
import FormContainer from "./formContainer";
import Text from "components/common/text";
import Image from "next/image";

import styles from "styles/components/manageAccount/PersonalInfo.module.scss";
import defaultProfile from "assets/images/profile/default-profile-img.svg";

/*
 * this function get a FileList and pass first selected image (FileList[0])
 * as DataUrl to callback.
 */
function readFile(filelist, cb) {
    let reader = new FileReader();

    if (!filelist || !filelist[0]) return;

    reader.readAsDataURL(filelist[0]);

    reader.onload = function () {
        cb(reader.result);
    };

    reader.onerror = function () {
        console.log(reader.error);
    };
}

function EditProfile({ user }) {
    const { status, fetcher } = useUpdateUser();

    const [profilePreview, setProfilePreview] = useState(user.profilePicture || defaultProfile);
    const [coverPreview, setCoverPreview] = useState(user.coverImage);

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const watchProfile = watch("profilePicture");
    const watchCover = watch("coverImage");

    const submitHandler = (data) => {
        const body = new FormData();
        body.append("profilePicture", data.profilePicture[0] || null);
        body.append("coverImage", data.coverImage[0] || null);

        fetcher(body);
    };

    /* update previews when user select new image */
    useEffect(() => {
        readFile(watchProfile, (result) => {
            setProfilePreview(result);
        });
    }, [watchProfile]);

    useEffect(() => {
        readFile(watchCover, (result) => {
            setCoverPreview(result);
        });
    }, [watchCover]);

    /* show alert to user if update profile is successful */
    useEffect(() => {
        if (status === "success") alert("عکس پروفایل با موفقیت اپدیت شد");
    }, [status]);

    return (
        <FormContainer title="پروفایل" onSubmit={handleSubmit(submitHandler)}>
            <div className={styles.formControlHorizontal}>
                <div>
                    <Text component="h3" size="l" color="black">
                        عکس پروفایل
                    </Text>
                    <Text>حجم تصویر انتخابی کمتر از 400 کیلوبایت باشد</Text>
                </div>

                <label className={styles.selectProfilePicture}>
                    <Image
                        objectFit="cover"
                        width={80}
                        height={80}
                        alt="user-profile"
                        src={profilePreview}
                    />

                    <input {...register("profilePicture")} type="file" hidden />
                </label>
            </div>

            <div className={styles.formControlHorizontal}>
                <div style={{ flexShrink: 0 }}>
                    <Text component="h3" size="l" color="black">
                        عکس کاور
                    </Text>
                    <Text>حجم تصویر انتخابی کمتر از 400 کیلوبایت باشد</Text>
                </div>

                <label className={styles.selectCover}>
                    {coverPreview && (
                        <Image
                            className={styles.cover}
                            objectFit="cover"
                            alt="user-profile"
                            layout="fill"
                            src={coverPreview}
                        />
                    )}

                    <input {...register("coverImage")} type="file" hidden />
                </label>
            </div>
        </FormContainer>
    );
}

export default EditProfile;
