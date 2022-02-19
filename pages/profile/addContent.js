
import { useState, useEffect } from 'react'
import Image from "next/image";
import styles from 'styles/pages/AddContent.module.scss'
import MockAvatar from "assets/images/mock-avatar.png";
import Stepper from "components/signup/stepper";
import ChevronRightLight from "assets/svg/common/chevron-right-light.svg";
import Type from 'components/profile/addContent/steps/type'
import Completion from 'components/profile/addContent/steps/completion/completion'
import Details from 'components/profile/addContent/steps/details'
import PublishRight from 'components/profile/addContent/steps/publishRight'
import Upload from 'components/profile/addContent/steps/upload'
import { useAsyncState } from "hooks/useAsyncState";
import axios from "axios";
import { Endpoints } from "utils/endpoints";
import Cookies from "js-cookie";
import cookie from "cookie";
import { getUserProfile } from 'shared/users';
import { useUploadFile } from 'hooks/useUploadFile';


export default function AddContent({ me, accessToken, ...props }) {
    const [upload, uploadFileData] = useUploadFile();
    const [uploadLoading, setUploadLoading] = useState(false)

    const steps = [
        { id: 0, name: 'type', text: 'انتخاب نوع محتوا' },
        { id: 1, name: 'upload', text: 'بارگزاری محتوا' },
        { id: 2, name: 'details', text: 'جزئیات' },
        { id: 3, name: 'publishRight', text: 'حق نشر' },
        { id: 4, name: 'completion', text: 'تکمیل اطلاعات' },
    ]

    const [step, setStep] = useState(steps[0])

    const [data, setData] = useAsyncState(
        {
            contentType: undefined,
            file: undefined
        }
    )

    console.log('data', data)

    function selectUploadType(contentType) {
        setData({
            ...data,
            contentType
        })
        setStep(steps[1])
    }

    // function selectPublishRight(contentType){
    //     setData({
    //         ...data,
    //         contentType
    //     })
    //     setStep(steps[4])
    // }

    async function uploadFile(file, type = data.contentType.type, place = 'file') {
        setUploadLoading(true);
        console.log('ok!', file)
        let x = await upload(file, type, accessToken);
        console.log('done!', x)
        if (place == 'file') {
            setData({
                ...data,
                fileId: x.fileId,
                file: file
            })
        } else if (place == 'cover') {
            setData({
                ...data,
                coverFileId: x.fileId,
                cover: file
            })
        }
        setUploadLoading(false);

    }

    console.log('data', data)
    function onDetailSubmit(title, description, subjects) {
        setData({
            ...data,
            title: title,
            description: description,
            subjects: subjects
        })
        setStep(steps[3])
    }

    // function onDetailSubmit() {
    //     setStep(steps[3])
    // }
    // function onPublishRight() {
    //     setStep(steps[4])
    // }

    // function onCompletionSubmit() {
    //     setStep(steps[4])
    // }

    function stepForward() {
        setStep(steps.find(p => p.id === step.id + 1))
    }

    // function stepForward1() {
    //     setStep(steps.find(p => p.id === step.id + 1))
    // }


    function stepBack() {
        setStep(steps.find(p => p.id === step.id - 1))
    }
    function editDetail() {
        setStep(steps.find(p => p.id === step.id - 2))
    }

    // const PublishRightHandler = () => {
    //     props.sharePolicy
    // }
    const onSubmitPublishRights = (sharePolicy, price, timing, publishTime) => {
        setData({
            ...data,
            sharePolicy: sharePolicy,
            price: price,
            timing: timing,
            publishTime: publishTime
        })
        setStep(steps[4])

    }

    return (
        <div className={styles.addContentContainer}>
            <div className={styles.headerContainer} />
            <div className={styles.profileContainer}>
                <div className={styles.content}>
                    <div className={styles.avatar}>
                        <Image src={MockAvatar} alt='' />
                    </div>
                    <div className={styles.name}>
                        {me.username}
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className={styles.narrowColumn}>
                    {
                        step.id > 0 ?
                            (
                                <div className={styles.stepBack}>
                                    <div className={styles.backIcon}>
                                        <Image src={ChevronRightLight} alt='' />
                                    </div>
                                    <div className={styles.text} onClick={stepBack}>بازگشت به مرحله قبل</div>
                                </div>
                            ) : ''
                    }
                    <div className={styles.stepsContainer}>
                        <div className={styles.stepperContainer}>
                            {/* It's just a stepper, it doesn't render any component inside of it  */}
                            <Stepper steps={steps} activeStep={step.id} />
                        </div>
                        <div className={styles.stepContainer}>
                            {/* <input type="file" onChange={(e) => { setFileTst(e.target.files[0]) }} />
                            <button onClick={handleTest}>test</button> */}
                            {
                                (() => {
                                    switch (step.id) {
                                        case 0:
                                            return <Type onTypeSelect={selectUploadType} />
                                        case 1:
                                            return <Upload loading={uploadLoading} onUpload={uploadFile} onStepForward={stepForward} data={data} />
                                        case 2:
                                            return <Details data={data} loading={uploadLoading} onDetailSubmit={onDetailSubmit} loading={uploadLoading} onUpload={(file) => uploadFile(file, 'image', 'cover')} />
                                        case 3:
                                            return <PublishRight onSumbit={onSubmitPublishRights} />
                                        case 4:
                                            return <Completion data={data} onEditPublish={stepBack} onEditDetail={editDetail} />
                                    }
                                })()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    const { accessToken } = cookie.parse(context.req.headers.cookie ?? '')

    if (!accessToken) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    try {
        const { data: { data: { me } } } = await getUserProfile(accessToken)

        if (!me) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }





        return {
            props: { me, accessToken }
        }

    }
    catch (e) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
}
