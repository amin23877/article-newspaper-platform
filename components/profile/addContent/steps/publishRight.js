import styles from "styles/components/profile/addContent/steps/PublishRight.module.scss";
import Button from "components/common/button";
import WrapperCard from "components/profile/addContent/wrapper-card";
import CurrencyInput from "react-currency-input-field";
import { DatePicker } from "jalali-react-datepicker";
import Text from "components/common/typography/text";

export default function PublishRight({ onSumbit, data, setData }) {
  const selectDate = ({ value }) => {
    console.log("start ", value);
    setData({ ...data, publishTime: value });
  };

  return (
    <div className={styles.publishRightContainer}>
      <WrapperCard
        className={styles.wrapper}
        title="اشتراک محتوا"
        description="محتوایتان را به یکی از روش های زیر به اشتراک بگذارید. بیشتر بدانید"
      >
        <div className={styles.content}>
          <div className={styles.buttonsContainer}>
            <Button
              classes={styles.button}
              onClick={() => setData({ ...data, sharePolicy: "free" })}
              variant={data.sharePolicy === "free" ? "filled" : "outline"}
            >
              رایگان
            </Button>
            <Button
              classes={styles.button}
              onClick={() => setData({ ...data, sharePolicy: "subscription" })}
              variant={
                data.sharePolicy === "subscription" ? "filled" : "outline"
              }
            >
              خرید اشتراک
            </Button>
            <Button
              classes={styles.button}
              onClick={() => setData({ ...data, sharePolicy: "payment" })}
              variant={data.sharePolicy === "payment" ? "filled" : "outline"}
            >
              پرداخت
            </Button>
          </div>
        </div>
      </WrapperCard>

      {data.sharePolicy === "payment" && (
        <WrapperCard
          className={styles.wrapper}
          title="پرداخت"
          description="هزینه دسترسی به محتوایتان را تعیین کنید.بیشتر بدانید"
        >
          <div className={styles.content}>
            <div className={styles.inputContainer}>
              <CurrencyInput
                className={styles.currencyInput}
                id="price"
                name="price"
                placeholder="قیمت خود را وارد کنید"
                defaultValue={0}
                decimalsLimit={2}
                value={data.price}
                onValueChange={(value, name) =>
                  setData({ ...data, price: value })
                }
              />
              <span className={styles.label}>تومان</span>
            </div>
          </div>
        </WrapperCard>
      )}

      <Text
        size="l"
        align="center"
        weight="bold"
        className={styles.description}
      >
        پس از بارگزاری محتوا باید راهبر سایت آن را تایید کرده سپس محتوا بعد از
        24 ساعت در صفحه شخصیتان قابل مشاهده می‌باشد. شما میتوانید زمان انتشار
        محتوایتان را تعیین نمایید.
      </Text>

      <div className={styles.dateSelectionContainer}>
        <div className={styles.header}>
          <Text size="l" color="black" weight="bold">
            زمان نمایش محتوا را تعیین می کنم.
          </Text>
          <div className={styles.selectContainer}>
            <div className={styles.inputWrapper}>
              <input
                checked={data.timing}
                onChange={(e) => setData({ ...data, timing: true })}
                name="time"
                id="yes"
                type="radio"
              />
              <label htmlFor="yes">بله</label>
            </div>
            <div className={styles.inputWrapper}>
              <input
                checked={!data.timing}
                onChange={(e) => setData({ ...data, timing: true })}
                name="time"
                id="no"
                type="radio"
              />
              <label htmlFor="no">نه</label>
            </div>
          </div>
        </div>
        {data.timing && (
          <>
            <Text>تاریخ نمایش محتوایتان را تعیین نمایید.</Text>

            <DatePicker
              onClickSubmitButton={selectDate}
              disabled={data.sharePolicy !== "payment" ? "disabled" : ""}
              className={styles.datePicker}
              open={true}
            />
          </>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <Button classes={styles.button} onClick={() => onSumbit()}>
          تایید
        </Button>
      </div>
    </div>
  );
}
