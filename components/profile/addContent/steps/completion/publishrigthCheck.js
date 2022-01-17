import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

const PublishCheck = () => {
    return<>
    <Box margin='10px 0  10px 10px'>
           <Typography component='p' fontSize='18px' fontWeight='500' fontFamily='IRANSans' color='#797474' > 
           اشتراک محتوا:
           </Typography>
          
    </Box>
    <Box margin='10px 0  10px 10px'>

             <Typography component='p' fontSize='18px' fontWeight='500' fontFamily='IRANSans' color='#797474' > 
              هزینه اشتراک ماهانه :
              </Typography>
             
    </Box>
    <Box margin='10px 0  10px 10px'>
           <Typography component='span' fontSize='18px' fontWeight='500' fontFamily='IRANSans' color='#797474' > 
                زمان انتشار:  
           </Typography>
          
           
    </Box>
       
        
        

    </>
}

export default PublishCheck