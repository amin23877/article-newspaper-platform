//import Button from "components/common/button";
import styles from 'styles/components/profile/addContent/steps/Completion.module.scss'
import WrapperCard from "components/profile/addContent/wrapper-card";
import ImagePlaceholder from "assets/svg/common/image-upoad-placeholder.svg";
import Image from "next/image";
import SimpleBackdrop from "../../backDrop"
import PublishCheck from "./publishrigthCheck";
import DetailCheck from "./detailCheck";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from '@mui/material/Button';
import edit from 'assets/svg/popup/edit.svg'
import { useEffect } from 'react';

export default function Completion({ onEditPublish, onEditDetail, data }) {

    useEffect(() => {
        if (data.file && data.contentType.type=='image') {
            const src = URL.createObjectURL(data.file);
            const preview = document.getElementById("image-placeholder");
            preview.srcset = '';
            preview.src = src;
        }
    }, [data])
    return (
        <div className={styles.completionContainer}>
            <div className={styles.cardContainer}  >
                <div className={styles.placeholderContainer}>
                    <div className={styles.image}>
                        <Image id="image-placeholder" src={ImagePlaceholder} alt="" />
                    </div>
                    <div className={styles.text}>
                        پیش نمایش محتوا
                    </div>
                </div>
            </div>
            <div className={styles.cardOrder}>
                <div className={styles.contentDetail}>
                    <Box width='100%' display='flex' justifyContent='space-between' margin='5px'>
                        <Typography fontSize='18px' fontWeight='500' fontFamily='IRANSans' color='#000000'>جزئیات</Typography>
                        <Button onClick={() => onEditDetail()}>
                            <Image src={edit} alt='' />
                            <Typography component='p' fontSize='14px' fontWeight='400' fontFamily='IRANSans' color='#797474'>ویرایش</Typography>
                        </Button>
                    </Box>
                    <DetailCheck data={data}/>
                </div>
                <div className={styles.contentPublishRight}>
                    <Box width='100%' display='flex' justifyContent='space-between' margin='5px'>
                        <Typography fontSize='18px' fontWeight='500' fontFamily='IRANSans' color='#000000'>حق نشر</Typography>
                        <Button onClick={() => onEditPublish()}>
                            <Image src={edit} alt='' />
                            <Typography component='p' fontSize='14px' fontWeight='400' fontFamily='IRANSans' color='#797474'>ویرایش</Typography>
                        </Button>
                    </Box>
                    <PublishCheck data={data}/>
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <SimpleBackdrop classes={styles.button}></SimpleBackdrop>
            </div>
        </div>

    )
}

