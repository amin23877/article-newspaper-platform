import styles from "styles/components/profile/addContent/steps/Details.module.scss";
import Button from "components/common/button";
import WrapperCard from "components/profile/addContent/wrapper-card";
import { useEffect } from "react";
import Image from "next/image";
import ImagePlaceholder from "assets/svg/common/image-upoad-placeholder.svg";
import trash from "assets/images/manage-account/trash.svg";
import { SelectSubject } from "components/profile/addContent/steps/details/selectSubject";

export default function Details({
  onDetailSubmit,
  onUpload,
  loading,
  data,
  setData,
  tags,
}) {
  console.log("data", data);
  useEffect(() => {
    if (data.cover) {
      const src = URL.createObjectURL(data.cover);
      const preview = document.getElementById("image-placeholder");
      preview.srcset = "";
      preview.src = src;
    }
  }, []);

  useEffect(() => {
    setData({
      ...data,
      titleCount: data.title.length,
    });
  }, [data.title]);

  useEffect(() => {
    setData({
      ...data,
      descriptionCount: data.description.length,
    });
  }, [data.description]);

  function onSubjectSelect(val) {
    if (!data.subjects.some((p) => p === val)) {
      setData({
        ...data,
        subjects: [...data.subjects, val],
      });
    }
  }

  function onSubjectUnselect(subject) {
    setData({
      ...data,
      subjects: data.subjects.filter((item) => item._id !== subject._id),
    });
  }

  function upload(event) {
    if (event.target.files.length > 0) {
      const src = URL.createObjectURL(event.target.files[0]);
      const preview = document.getElementById("image-placeholder");
      preview.srcset = "";
      preview.src = src;
    }
    onUpload(event.target.files[0]);
  }

  return (
    <div className={styles.detailsContainer}>
      <WrapperCard className={styles.wrapper} title="عنوان">
        <div className={styles.content}>
          <div className={styles.inputContainer}>
            <input
              value={data.title}
              onChange={(e) => {
                setData({ ...data, title: e.target.value });
              }}
              type="text"
              placeholder="عنوانی اضافه کنید که محتوایان را توصیف کند."
            />
          </div>
          <div className={styles.counter}>{data.titleCount}/100</div>
        </div>
      </WrapperCard>

      <WrapperCard className={styles.wrapper} title="توضیحات">
        <div className={styles.content}>
          <div className={styles.inputContainer}>
            <textarea
              value={data.description}
              onChange={(e) => {
                setData({ ...data, description: e.target.value });
              }}
              type="text"
              placeholder="درباره ی محتوایتان به بینندگان توضیح دهید."
            />
          </div>
          <div className={styles.counter}>{data.descriptionCount}/5000</div>
        </div>
      </WrapperCard>

      <WrapperCard
        className={styles.wrapper}
        title="موضوع"
        description="محتوایتان را به یک یا چند موضوع اضافه کنید. به‌کمک موضوع، بینندگان می‌توانند محتوایتان را سریع‌تر کاوش کنند.بیشتر بدانید"
      >
        <div className={styles.content}>
          <div className={styles.selectContainer}>
            <SelectSubject initialSubjects={tags} onSelect={onSubjectSelect} />
          </div>

          {/* selected tags */}
          <div className={styles.subjectsContainer}>
            {data.subjects?.map((item, index) => {
              return (
                <div
                  onClick={() => onSubjectUnselect(item)}
                  key={index}
                  className={styles.subject}
                >
                  <span className={styles.trash}>
                    <Image src={trash} width={13} height={20} alt="trash" />
                  </span>
                  {item.title}
                </div>
              );
            })}
          </div>
        </div>
      </WrapperCard>

      <WrapperCard
        className={styles.wrapper}
        title="کاور محتوا"
        description="تصویری را انتخاب یا بارگذاری کنید که محتوای ویدیوتان را نشان می‌دهد. تصویر کوچکِ مناسب متمایز می‌شود و توجه بینندگان را جلب می‌کند. بیشتر بدانید"
      >
        <div className={styles.content}>
          <div className={styles.uploadContent}>
            <label
              htmlFor="image-uploader"
              className={styles.placeholderContainer}
            >
              <div className={styles.image}>
                <Image id="image-placeholder" src={ImagePlaceholder} />
              </div>

              <div className={styles.text}>افزودن تصویر</div>
            </label>

            <input
              id="image-uploader"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => upload(e)}
            />
          </div>
        </div>
      </WrapperCard>

      <div className={styles.buttonContainer}>
        <Button
          disabled={loading}
          variant="filled"
          classes={styles.button}
          onClick={() => onDetailSubmit()}
        >
          {loading ? "لطفا صبر کنید..." : "تایید"}
        </Button>
      </div>
    </div>
  );
}
