import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import jMoment from "moment-jalaali";

const PublishCheck = ({ data }) => {
       console.log('datatime',data.publishTime._d.getTime());
       jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

       return <>

              <Box margin='10px 0  10px 10px'>
                     <Typography component='p' fontSize='18px' fontWeight='500' fontFamily='IRANSans' color='#797474' >
                            اشتراک محتوا: {data.sharePolicy == 'free' ? 'رایگان' : data.sharePolicy == 'subscription' ? 'خرید اشتراک' : 'پرداخت'}
                     </Typography>

              </Box>
              <Box margin='10px 0  10px 10px'>

                     <Typography component='p' fontSize='18px' fontWeight='500' fontFamily='IRANSans' color='#797474' >
                            هزینه اشتراک ماهانه : {data.price}
                     </Typography>

              </Box>
              <Box margin='10px 0  10px 10px'>
                     <Typography component='span' fontSize='18px' fontWeight='500' fontFamily='IRANSans' color='#797474' >
                            زمان انتشار: { jMoment
                                .unix(data.publishTime._d.getTime()/1000)
                                .format("jDD jMMMM jYYYY")} ساعت  { jMoment
                                   .unix(data.publishTime._d.getTime()/1000)
                                   .format("HH:mm")} 
                     </Typography>


              </Box>




       </>
}

export default PublishCheck