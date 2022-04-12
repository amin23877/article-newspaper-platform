import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const DetailCheck = ({ data }) => {
  return (
    <>
      <Box margin="10px 0  10px 10px">
        <Typography
          component="p"
          fontSize="18px"
          fontWeight="500"
          fontFamily="IRANSans"
          color="#797474"
        >
          عنوان: {data.contentType.title}
        </Typography>
      </Box>
      <Box margin="10px 0  10px 10px">
        <Typography
          component="p"
          fontSize="18px"
          fontWeight="500"
          fontFamily="IRANSans"
          color="#797474"
        >
          توضیحات: {data.description}
        </Typography>
      </Box>
      <Box margin="10px 0  10px 10px">
        <Typography
          component="span"
          fontSize="18px"
          fontWeight="500"
          fontFamily="IRANSans"
          color="#797474"
        >
          فهرست پخش:{data.contentType.title}
        </Typography>
      </Box>
      <Box margin="10px 0  10px 10px">
        <Typography
          component="span"
          fontSize="18px"
          fontWeight="500"
          fontFamily="IRANSans"
          color="#797474"
        >
          موضوع: {data.title}
        </Typography>
        {}
      </Box>
    </>
  );
};

export default DetailCheck;
