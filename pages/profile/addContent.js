
import { useState, useEffect } from 'react'
import Image from "next/image";

import styles from 'styles/pages/AddContent.module.scss'
import MockAvatar from "assets/images/mock-avatar.png";
import Stepper from "components/signup/stepper";
import ChevronRightLight from "assets/svg/common/chevron-right-light.svg";

import Type from 'components/profile/addContent/steps/type'
import Completion from 'components/profile/addContent/steps/completion'
import Details from 'components/profile/addContent/steps/details'
import PublishRight from 'components/profile/addContent/steps/publishRight'
import Upload from 'components/profile/addContent/steps/upload'
import {useAsyncState} from "hooks/useAsyncState";
import axios from "axios";
import {Endpoints} from "utils/endpoints";
import Cookies from "js-cookie";


export default function AddContent(props) {

    const steps = [
        {id: 0, name: 'type', text: 'انتخاب نوع محتوا'},
        {id: 1, name: 'upload', text: 'بارگزاری محتوا'},
        {id: 2, name: 'details', text: 'جزئیات'},
        {id: 3, name: 'publishRight', text: 'حق نشر'},
        {id: 4, name: 'completion', text: 'تکمیل اطلاعات'},
    ]

    const [step, setStep] = useState(steps[0])

    const [data, setData] = useAsyncState(
        {
            contentType: undefined,
            file: undefined
        }
    )

    function selectUploadType(contentType) {
        setData({
            ...data,
            contentType
        })
        setStep(steps[1])
    }

    function uploadFile(file) {
        setData({
            ...data,
            file
        }, async (newVal) => {
            try {
                const {data: {data: {fileId, uploadUrl}}} = await axios.get(Endpoints.baseUrl + `/file/upload/link/pdf`, {
                    headers: {
                        'Authorization': Cookies.get('accessToken')
                    }
                })
                // console.log()

                const bodyFormData = new FormData();
                bodyFormData.append('file', newVal)
                const res = await axios({
                    method: "put",
                    url: uploadUrl,
                    data: bodyFormData,
                    headers: { "Content-Type": "multipart/form-data", 'Authorization': Cookies.get('accessToken') },
                })
            } catch (e) {
                console.log(e)
            }
        })
        // setStep(steps[1])
    }

    function onDetailSubmit() {
        setStep(steps[3])
    }

    function stepForward() {
        setStep(steps.find(p => p.id === step.id + 1))
    }


    function stepBack() {
        setStep(steps.find(p => p.id === step.id - 1))
    }

    return (
        <div className={styles.addContentContainer}>
            <div className={styles.headerContainer} />
            <div className={styles.profileContainer}>
                <div className={styles.content}>
                    <div className={styles.avatar}>
                        <Image src={MockAvatar}/>
                    </div>
                    <div className={styles.name}>
                        نام کاربری شما
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
                                        <Image src={ChevronRightLight}/>
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
                            {
                                (() => {
                                    switch (step.name) {
                                        case "type":
                                            return <Type onTypeSelect={selectUploadType} />
                                        case "upload":
                                            return <Upload onUpload={uploadFile} onStepForward={stepForward} data={data} />
                                        case "details":
                                            return <Details onDetailSubmit={onDetailSubmit} />
                                        case "publishRight":
                                            return <PublishRight />
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
