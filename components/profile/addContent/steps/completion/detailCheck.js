import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Text from "components/common/typography/text";

const DetailCheck = ({ data }) => {
  return (
    <>
      <Box margin="10px 0  10px 10px">
        <Text>عنوان: {data.contentType.title}</Text>
      </Box>
      <Box margin="10px 0  10px 10px">
        <Text>توضیحات: {data.description}</Text>
      </Box>
      <Box margin="10px 0  10px 10px">
        <Text>فهرست پخش:{data.contentType.title}</Text>
      </Box>
      <Box margin="10px 0  10px 10px">
        <Text>موضوع: {data.title}</Text>
        {}
      </Box>
    </>
  );
};

export default DetailCheck;
