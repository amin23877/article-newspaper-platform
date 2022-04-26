import { useState } from "react";
import Image from "next/image";
import styles from "styles/pages/AddContent.module.scss";
import Stepper from "components/signup/stepper";
import ChevronRightLight from "assets/svg/common/chevron-right-light.svg";
import Type from "components/profile/addContent/steps/type";
import Completion from "components/profile/addContent/steps/completion/completion";
import Details from "components/profile/addContent/steps/details/details";
import PublishRight from "components/profile/addContent/steps/publishRight";
import Upload from "components/profile/addContent/steps/upload";
import { useAsyncState } from "hooks/useAsyncState";
import axios from "axios";
import { Endpoints } from "utils/endpoints";
import cookie from "cookie";
import { getUserProfile } from "shared/users";
import { useUploadFile } from "hooks/useUploadFile";
import { useAddPost } from "hooks/profile/useAddPost";
import Text from "components/common/typography/text";
import { useSelector } from "react-redux";

const steps = [
  { id: 0, name: "type", text: "انتخاب نوع محتوا" },
  { id: 1, name: "upload", text: "بارگزاری محتوا" },
  { id: 2, name: "details", text: "جزئیات" },
  { id: 3, name: "publishRight", text: "حق نشر" },
  { id: 4, name: "completion", text: "تکمیل اطلاعات" },
];

export default function AddContent({ me, accessToken, tags }) {
  const addPost = useAddPost();

  const [upload, uploadFileData] = useUploadFile();

  const [uploadLoading, setUploadLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [step, setStep] = useState(steps[0]);

  const profilePic = useSelector(
    (state) => state.users.userInfo.profilePicture
  );

  const coverImg = useSelector((state) => state.users.userInfo.coverImage);

  const [data, setData] = useAsyncState({
    contentType: undefined,
    file: undefined,
    title: "",
    description: "",
    subjects: [],
    descriptionCount: 0,
    titleCount: 0,
    timing: false,
    publishTime: null,
    sharePolicy: "free",
    price: "0",
  });

  console.log("data", data);

  function selectUploadType(contentType) {
    setData({
      ...data,
      contentType,
    });
    setStep(steps[1]);
  }

  async function uploadFile(
    file,
    type = data.contentType.type,
    place = "file"
  ) {
    setUploadLoading(true);
    console.log("ok!", file);
    let x = await upload(file, type, accessToken);
    console.log("done!", x);
    if (place === "file") {
      setData({
        ...data,
        fileId: x.fileId,
        file: file,
      });
    } else if (place === "cover") {
      setData({
        ...data,
        coverFileId: x.fileId,
        cover: file,
      });
    }
    setUploadLoading(false);
  }

  function onDetailSubmit() {
    // setData({
    //     ...data,
    //     title: title,
    //     description: description,
    //     subjects: subjects
    // })
    setStep(steps[3]);
  }

  function stepForward() {
    setStep(steps.find((p) => p.id === step.id + 1));
  }

  function stepBack() {
    setStep(steps.find((p) => p.id === step.id - 1));
  }

  function editDetail() {
    setStep(steps.find((p) => p.id === step.id - 2));
  }

  const onSubmitPublishRights = () => {
    setStep(steps[4]);
  };

  const handleAddPost = () => {
    addPost(data)
      .then(() => {
        setOpenDialog(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={styles.addContentContainer}>
      <div className={styles.headerContainer}>
        <Image alt="" layout="fill" objectFit="cover" src={coverImg.url} />
      </div>

      <div className={styles.profileContainer}>
        <div className={styles.content}>
          <div className={styles.avatar}>
            <Image
              layout="fill"
              objectFit="cover"
              src={profilePic.url}
              alt=""
            />
          </div>

          <div className={styles.name}>{me.username}</div>
        </div>
      </div>

      <div className="container">
        <div className={styles.narrowColumn}>
          {step.id > 0 ? (
            <div className={styles.stepBack}>
              <div className={styles.backIcon}>
                <Image src={ChevronRightLight} alt="" />
              </div>

              <Text weight="bold" className={styles.text} onClick={stepBack}>
                بازگشت به مرحله قبل
              </Text>
            </div>
          ) : (
            ""
          )}

          <div className={styles.stepsContainer}>
            <div className={styles.stepperContainer}>
              {/* It's just a stepper, it doesn't render any component inside it  */}
              <Stepper steps={steps} activeStep={step.id} />
            </div>

            <div className={styles.stepContainer}>
              {(() => {
                switch (step.id) {
                  case 0:
                    return <Type onTypeSelect={selectUploadType} />;
                  case 1:
                    return (
                      <Upload
                        loading={uploadLoading}
                        onUpload={uploadFile}
                        onStepForward={stepForward}
                        data={data}
                      />
                    );
                  case 2:
                    return (
                      <Details
                        tags={tags}
                        data={data}
                        setData={setData}
                        loading={uploadLoading}
                        onDetailSubmit={onDetailSubmit}
                        onUpload={(file) => uploadFile(file, "image", "cover")}
                      />
                    );
                  case 3:
                    return (
                      <PublishRight
                        data={data}
                        setData={setData}
                        onSumbit={onSubmitPublishRights}
                      />
                    );
                  case 4:
                    return (
                      <Completion
                        data={data}
                        onEditPublish={stepBack}
                        handleAddPost={handleAddPost}
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                        onEditDetail={editDetail}
                      />
                    );
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { accessToken } = cookie.parse(context.req.headers.cookie ?? "");

  if (!accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const {
      data: {
        data: { me },
      },
    } = await getUserProfile(accessToken);

    if (!me) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    const tags = await axios.get(Endpoints.baseUrl + "/post/tags", {
      headers: {
        authorization: accessToken,
      },
    });

    return {
      props: { me, accessToken, tags: tags.data.data.tags },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
