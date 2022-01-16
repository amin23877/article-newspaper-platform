import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '../../common/button';
import styles from '../../../styles/components/profile/addContent/steps/Completion.module.scss'
import Box from "@mui/material/Box"
import Image from 'next/image';
import Typography from "@mui/material/Typography"
//import success  from "../../../assets/svg/common/success"
export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button onClick={handleToggle}  classes={styles.button}>تایید نهایی</Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
          <Box
            width="660px"
            height="392px"  background= '#FFFFFF'
            border='1px solid rgba($primary-color, 0.9)'
            boxSizing='border-box'
            boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
            borderRadius= '30px 30px 30px 0px'
            display="flex"
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
            bgcolor='#FFFFFF'>
            <Box>
               {/* <Image src={success}  alt="" /> */}
            </Box>
            <Box>
                <Typography fontSize='24px' color='#155A61'>محتوای شما با موفقیت بارگذاری شد </Typography>
            </Box>

          </Box>
        {/* <CircularProgress color="inherit" /> */}
      </Backdrop>
    </div>
  );
}