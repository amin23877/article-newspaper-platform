import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAsyncState } from "hooks/useAsyncState";
import axios from "axios";

import styles from "styles/pages/Login.module.scss";
import Card from "components/common/card";
import CustomInput from "components/common/input";
import Button from "components/common/button";
import Wrapper from "components/login/wrapper";

import ChevronRightLight from "assets/svg/common/chevron-right-light.svg";
import success from "assets/svg/common/success.svg";
import { phoneNumberRegex } from "utils/validations";
import { Endpoints } from "utils/endpoints";
import { useCountdown } from "hooks/useCountdown";

import cookie from "cookie";
import Cookies from "js-cookie";
import { useUser } from "hooks/useUser";
import Text from "components/common/typography/text";

export default function Login() {
  const {
    register: phoneFormRegister,
    handleSubmit: handlePhoneSubmit,
    formState: { errors: isPhoneValid },
  } = useForm({ mode: "onChange" });

  const {
    register: otpFormRegister,
    handleSubmit: handleOtpSubmit,
    formState: { errors: isOtpValid },
  } = useForm({ mode: "onChange" });

  const {
    register: infoFormRegister,
    handleSubmit: handleInfoSubmit,
    formState: { errors: isInfoValid },
    setValue: infoSetValue,
  } = useForm();

  const [user, getUser, hasInitialized] = useUser();

  const router = useRouter();

  const [userData, setUserData] = useAsyncState({
    phone: "",
    otp: "",
    username: "",
    publisher: undefined,
  });

  const [step, setStep] = useState("phone");
  const [seconds, formattedTime, setIsActive, reset] = useCountdown({
    initSeconds: 120,
  });

  const onPhoneSubmit = async (data) => {
    setUserData({ ...userData, phone: data.phone }, async (ud) => {
      try {
        await axios.post(Endpoints.baseUrl + "/auth/login", {
          msisdn: ud.phone,
        });
        setIsActive(true);
        reset();
        setStep("otp");
      } catch (e) {
        if (e.response.data.status == "codeAlreadySent") {
          setIsActive(true);
          // reset()
          setStep("otp");
        }
        console.log(e.response);
      }
    });
  };

  const onOtpSubmit = (data) => {
    setUserData({ ...userData, otp: data.otp }, async (ud) => {
      try {
        const {
          data: {
            data: { refreshToken, isNewUser },
          },
        } = await axios.post(Endpoints.baseUrl + "/auth/verify", {
          msisdn: ud.phone,
          code: ud.otp,
        });

        Cookies.set("refreshToken", `${refreshToken}`);

        const {
          data: {
            data: { accessToken },
          },
        } = await axios.post(Endpoints.baseUrl + "/auth/generateAccessToken", {
          refreshToken,
        });

        Cookies.set("accessToken", `Bearer ${accessToken}`);

        infoSetValue("username", "");

        setUserData({ ...userData, phone: "", otp: "" });

        if (isNewUser) {
          setStep("info");
        } else {
          await getUser();
          router.push("/profile");
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  const onInfoSubmit = ({ username, publisher }) => {
    setUserData({ ...userData, username, publisher }, async (ud) => {
      console.log("ud", ud);
      try {
        const res = await axios.put(
          Endpoints.baseUrl + "/user",
          {
            // isContentProvider: Boolean(ud.publisher),
            isContentProvider: ud.publisher,
            username: ud.username,
          },
          {
            headers: {
              authorization: Cookies.get("accessToken"),
            },
          }
        );
      } catch (e) {}
    });
    setStep("success");

    setTimeout(() => {
      router.push("/profile");
    }, 1000);
  };

  async function onResendOtp() {
    if (seconds > 0) return;
    await onOtpRequest(userData.phone);
    reset();
  }

  async function onOtpRequest(phone) {
    try {
      return await axios.post(Endpoints.baseUrl + "/auth/login", {
        msisdn: phone,
      });
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  console.log("isOtpValid", isOtpValid);
  return (
    <Wrapper>
      {(() => {
        switch (step) {
          case "phone":
            return (
              <div className={styles.content}>
                <div className={styles.logoContainer}>Digi Nashr Logo</div>
                <Card>
                  <div className={styles.inputsContainer}>
                    <div className={styles.titleContainer}>ورود/ثبت نام</div>
                    <form onSubmit={handlePhoneSubmit(onPhoneSubmit)}>
                      <CustomInput
                        error={isPhoneValid.phone}
                        register={phoneFormRegister}
                        name="phone"
                        validation={{
                          required: true,
                          pattern: phoneNumberRegex,
                        }}
                        label="شماره موبایل خود را وارد کنید"
                        classes={styles.phoneInput}
                      />
                      {isPhoneValid.phone && (
                        <p className={styles.errorText}>
                          شماره وارد شده صحیح نیست
                        </p>
                      )}
                      <div className={styles.inputContainer}>
                        <Button
                          name="submit"
                          type="submit"
                          value="submit"
                          classes={styles.button}
                        >
                          ورود به دیجی نشر
                        </Button>
                      </div>
                    </form>

                    <Text color="white" className={styles.hintContainer}>
                      با ورود یا ثبت نام در دیجی نشر، شما قوانین و شرایط استفاده
                      از سرویس دیجی نشر را می پذیرید.
                    </Text>
                  </div>
                </Card>
              </div>
            );
          case "otp":
            return (
              <div className={`${styles.content} ${styles.otpContainer}`}>
                <Card>
                  <div
                    className={styles.stepBack}
                    onClick={() => {
                      setStep("phone");
                    }}
                  >
                    <span className={styles.iconContainer}>
                      <Image src={ChevronRightLight} alt="" />
                    </span>
                    <span>بازگشت به مرحله قبل</span>
                  </div>
                  <div className={styles.inputsContainer}>
                    <div className={styles.titleContainer}>
                      کد تایید را وارد نمایید
                    </div>
                    <form onSubmit={handleOtpSubmit(onOtpSubmit)}>
                      <CustomInput
                        error={isOtpValid.otp}
                        register={otpFormRegister}
                        validation={{
                          required: true,
                          maxLength: 5,
                          minLength: 5,
                        }}
                        name="otp"
                        label={`کد ارسال شده به ${userData.phone} را وارد کنید`}
                        classes={styles.phoneInput}
                      />
                      {isOtpValid.otp && (
                        <p className={styles.errorText}>
                          کد وارد شده صحیح نیست
                        </p>
                      )}

                      <div className={styles.timeout}>{formattedTime}</div>
                      {seconds == 0 && (
                        <div
                          className={styles.sendAgain}
                          onClick={() => {
                            onResendOtp();
                          }}
                        >
                          ارسال مجدد کد تایید
                        </div>
                      )}
                      <div className={styles.inputContainer}>
                        <Button
                          type="submit"
                          classes={`${styles.button} ${styles.otpButton}`}
                        >
                          ادامه
                        </Button>
                      </div>
                    </form>
                  </div>
                </Card>
              </div>
            );
          case "info":
            return (
              <div className={`${styles.content} ${styles.otpContainer}`}>
                <Card>
                  <div
                    className={styles.stepBack}
                    onClick={() => {
                      setStep("phone");
                    }}
                  >
                    <span className={styles.iconContainer}>
                      <Image src={ChevronRightLight} />
                    </span>
                    <span>بازگشت به مرحله قبل</span>
                  </div>
                  <div className={styles.inputsContainer}>
                    <div className={styles.titleContainer}>
                      اطلاعات خود را کامل کنید
                    </div>
                    <form onSubmit={handleInfoSubmit(onInfoSubmit)}>
                      <CustomInput
                        register={infoFormRegister}
                        name="username"
                        validation={{ required: true }}
                        label="نام و نام خانوادگی :"
                      />
                      <div className={styles.radioLabel}>
                        {" "}
                        تولید کننده محتوا هستم
                      </div>
                      <div className={styles.radioContainer}>
                        <CustomInput
                          register={infoFormRegister}
                          id="publisherTrue"
                          value="true"
                          type="radio"
                          name="publisher"
                          classes={styles.radioInput}
                        />
                        <label
                          htmlFor="publisherTrue"
                          className={styles.radioInputLabel}
                        >
                          بله
                        </label>
                        <CustomInput
                          register={infoFormRegister}
                          id="publisherFalse"
                          value="false"
                          type="radio"
                          name="publisher"
                          classes={styles.radioInput}
                        />
                        <label
                          htmlFor="publisherFalse"
                          className={styles.radioInputLabel}
                        >
                          خیر
                        </label>
                      </div>
                      <div
                        style={{ marginTop: "20px" }}
                        className={styles.inputContainer}
                      >
                        <Button
                          type="submit"
                          classes={`${styles.button} ${styles.otpButton}`}
                        >
                          تایید
                        </Button>
                      </div>
                    </form>
                  </div>
                </Card>
              </div>
            );
          case "success":
            return (
              <div className={styles.content}>
                <div className={styles.logoContainer}>Digi Nashr Logo</div>
                <div className={styles.successIconContainer}>
                  <Image src={success} />
                </div>
                <div className={styles.successTextContainer}>
                  اطلاعات شما با موفقیت ثبت شد.
                </div>
              </div>
            );
        }
      })()}
    </Wrapper>
  );
}

export async function getServerSideProps(context) {
  const { accessToken } = cookie.parse(context.req.headers.cookie ?? "");

  if (accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { footer: false },
  };
}

// Login.getLayout = function getLayout(login) {
//     return (
//         <Layout footer={false}>
//             {login}
//         </Layout>
//     )
// }
