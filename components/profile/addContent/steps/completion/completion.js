import styles from "styles/components/profile/addContent/steps/Completion.module.scss";
import ImagePlaceholder from "assets/svg/common/image-upoad-placeholder.svg";
import Image from "next/image";
import SimpleBackdrop from "../../backDrop";
import PublishCheck from "./publishrigthCheck";
import DetailCheck from "./detailCheck";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import edit from "assets/svg/popup/edit.svg";
import { useEffect } from "react";
import Text from "components/common/typography/text";

export default function Completion({
  onEditPublish,
  onEditDetail,
  data,
  handleAddPost,
  openDialog,
  setOpenDialog,
}) {
  useEffect(() => {
    if (data.file) {
      const src = URL.createObjectURL(data.file);
      const preview = document.getElementById("image-placeholder");
      preview.srcset = "";
      preview.src = src;
    }
  }, []);

  return (
    <div className={styles.completionContainer}>
      <div className={styles.cardContainer}>
        <div className={styles.placeholderContainer}>
          <div className={styles.image}>
            <Image id="image-placeholder" src={ImagePlaceholder} alt="" />
          </div>
          <div className={styles.text}>پیش نمایش محتوا</div>
        </div>
      </div>
      <div className={styles.cardOrder}>
        <div className={styles.contentDetail}>
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            margin="5px"
          >
            <Text style={{ margin: 0 }} size="l" weight="bold" color="black">
              جزئیات
            </Text>
            <Button onClick={() => onEditDetail()}>
              <Image src={edit} alt="" />
              <Text style={{ margin: 0 }}>ویرایش</Text>
            </Button>
          </Box>
          <DetailCheck data={data} />
        </div>
        <div className={styles.contentPublishRight}>
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            margin="5px"
          >
            <Text style={{ margin: 0 }} size="l" weight="bold" color="black">
              حق نشر
            </Text>
            <Button onClick={() => onEditPublish()}>
              <Image src={edit} alt="" />
              <Text style={{ margin: 0 }}>ویرایش</Text>
            </Button>
          </Box>
          <PublishCheck data={data} />
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <SimpleBackdrop
          handleAddPost={handleAddPost}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          classes={styles.button}
        />
      </div>
    </div>
  );
}
