import { useForm } from "react-hook-form";
import FormContainer from "./formContainer";
import Textarea from "components/common/textarea";

function AboutYou() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitHandler = (data) => {
        console.log(data);
    };

    return (
        <FormContainer title="درباره تو" onSubmit={handleSubmit(submitHandler)}>
            <Textarea
                rows="10"
                placeholder="درباره خود و حوزه محتواهایی که تولید میکنید می توانید برای مخاطب خود بنویسید."
            />
        </FormContainer>
    );
}

export default AboutYou;
