import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import jMoment from "moment-jalaali";
import Text from "components/common/typography/text";

const PublishCheck = ({ data }) => {
  console.log("datatime", data?.publishTime?._d?.getTime());
  jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

  return (
    <>
      <Box margin="10px 0  10px 10px">
        <Text>
          اشتراک محتوا:{" "}
          {data.sharePolicy === "free"
            ? "رایگان"
            : data.sharePolicy === "subscription"
            ? "خرید اشتراک"
            : "پرداخت"}
        </Text>
      </Box>
      <Box margin="10px 0  10px 10px">
        <Text>هزینه اشتراک ماهانه : {data.price}</Text>
      </Box>
      <Box margin="10px 0  10px 10px">
        <Text>
          زمان انتشار:{" "}
          {data.publishTime?._d
            ? jMoment
                .unix(data.publishTime?._d?.getTime() / 1000)
                .format("jDD jMMMM jYYYY")
            : "هم اکنون "}
          <span> - </span>
          ساعت:
          {data?.publishTime?._d
            ? jMoment
                .unix(data?.publishTime?._d?.getTime() / 1000)
                .format("HH:mm")
            : " هم اکنون "}
        </Text>
      </Box>
    </>
  );
};

export default PublishCheck;
