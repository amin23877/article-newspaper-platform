import { useForm } from "react-hook-form";
import FormContainer from "./formContainer";
import Text from "components/common/text";
import Textarea from "components/common/textarea";
import { useUpdateUser } from "hooks/manage-account/useUpdateUser";
import { useEffect } from "react";

function AboutYou({ user }) {
    const { status, fetcher } = useUpdateUser();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: { aboutMe: user.aboutMe } });

    const submitHandler = (data) => {
        fetcher(data);
    };

    useEffect(() => {
        if (status === "success") alert("اطلاعات با موفقیت ویرایش شد");
    }, [status]);

    return (
        <FormContainer title="درباره تو" onSubmit={handleSubmit(submitHandler)}>
            <Textarea
                register={register}
                name="aboutMe"
                rows="10"
                validation={{ required: "پر کردن این فیلد الزامی است" }}
                placeholder="درباره خود و حوزه محتواهایی که تولید میکنید می توانید برای مخاطب خود بنویسید."
            />

            {errors.aboutMe && (
                <Text style={{ margin: 0 }} color="red" size="sm">
                    {errors.aboutMe.message}
                </Text>
            )}
        </FormContainer>
    );
}

export default AboutYou;
