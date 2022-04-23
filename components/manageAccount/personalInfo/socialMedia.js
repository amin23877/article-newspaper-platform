import { useEffect, useState } from "react";
import Image from "next/image";
import { useUpdateUser } from "hooks/manage-account/useUpdateUser";
import { useForm } from "react-hook-form";
import FormContainer from "./formContainer";
import CustomInput from "components/common/input";
import Text from "components/common/typography/text";

import styles from "styles/components/manageAccount/PersonalInfo.module.scss";
import trash from "assets/images/manage-account/trash.svg";

function SocialMedia({ user }) {
  const [socials, setSocials] = useState(user.socials);

  const { res, status, fetcher } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    fetcher({ socials: { ...socials, [data.socialType]: data.url } });
  };

  const handleDelete = (socialType) => {
    // extract removed url from socilas object and pass filterd object to fetcher for update socials
    let { [socialType]: removedProp, ...filteredObj } = socials;

    fetcher({ socials: filteredObj });
  };

  // show success alert to user and update socials list
  useEffect(() => {
    if (status === "success" && res) {
      alert("اطلاعات با موفقیت ویرایش شد");

      setSocials(res.user.socials);
    }
  }, [status, res]);

  return (
    <FormContainer
      title="ادرس اینترنتی و شبکه های اجتماعی"
      onSubmit={handleSubmit(submitHandler)}
    >
      <select
        {...register("socialType", {
          required: "لطفا نوع شبکه اجتماعی را انتخاب کنید",
        })}
        className={styles.select}
      >
        <option value="">انتخاب کنید</option>
        <option value="instagram">اینستاگرام</option>
        <option value="twitter">توییتر</option>
        <option value="linkedin">لینکدین</option>
      </select>

      <Text size="sm" component="span" color="red">
        {errors.socialType && errors.socialType.message}
      </Text>

      <div className={styles.formControlFullwidth}>
        <Text component="label" color="black" weight="bold">
          افزودن لینک :
        </Text>

        <CustomInput
          type="url"
          register={register}
          name="url"
          validation={{ required: "پر کردن این فیلد الزامی است" }}
          error={errors.url}
        />
      </div>

      <div className={styles.socialLink}>
        {socials &&
          Object.entries(socials).map(([type, url], index) => {
            if (type !== "_id") {
              return (
                <Text
                  key={index}
                  onClick={() => handleDelete(type)}
                  className={styles.link}
                  color="black"
                >
                  <Image
                    className={styles.trash}
                    alt="trash"
                    src={trash}
                    width={16}
                    height={20}
                  />
                  {url}
                </Text>
              );
            }
          })}
      </div>
    </FormContainer>
  );
}

export default SocialMedia;
