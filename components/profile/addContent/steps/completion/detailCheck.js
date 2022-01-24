import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

const DetailCheck  = () => {
    return<>
    <Box margin='10px 0  10px 10px'>
           <Typography component='p' fontSize='18px' fontWeight='500' fontFamily='IRANSans' color='#797474' > 
           عنوان:
           </Typography>
          
    </Box>
    <Box margin='10px 0  10px 10px'>

             <Typography component='p' fontSize='18px' fontWeight='500' fontFamily='IRANSans' color='#797474' > 
             توضیحات:
              </Typography>
             
    </Box>
    <Box margin='10px 0  10px 10px'>
           <Typography component='span' fontSize='18px' fontWeight='500' fontFamily='IRANSans' color='#797474' > 
              فهرست پخش:
           </Typography>
          
           
    </Box>
    <Box margin='10px 0  10px 10px'>
           <Typography component='span' fontSize='18px' fontWeight='500' fontFamily='IRANSans' color='#797474' >  
               موضوع:
           </Typography>
           {} 
    </Box>   
    </>
}

export default DetailCheck