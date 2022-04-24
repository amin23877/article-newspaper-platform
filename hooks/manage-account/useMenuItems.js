import { useCallback, useEffect, useState } from "react";
import PersonalInfo from "components/manageAccount/personalInfo";
import OrderList from "components/manageAccount/orderList/orderList";
import IncomeLog from "components/manageAccount/incomeLog";
import AnalyzeContent from "components/manageAccount/analyzeContent";
import Sponsors from "components/manageAccount/sponsors";
import Followers from "components/manageAccount/followers";
import Followings from "components/manageAccount/followings";
import SavedPosts from "components/manageAccount/savedPosts";
import Messages from "components/manageAccount/messages";
import cookie from "cookie";
import axios from "axios";
import { Endpoints } from "utils/endpoints";

export function useMenuItems(user) {
  const [menu, setMenu] = useState([]);

  const [messages, setMessages] = useState();

  const getMessages = async (deleted = false) => {
    try {
      const { accessToken } = cookie.parse(document?.cookie);
      let msgs = await axios.get(
        Endpoints.baseUrl +
          `/user/supportMessages?start=0&limit=1000&checked=${deleted}`,
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      setMessages(msgs.data.data.messages);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = useCallback(async (title = "support", text) => {
    try {
      const { accessToken } = cookie.parse(document?.cookie);
      let msgs = await axios.post(
        Endpoints.baseUrl + `/user/supportMessage`,
        {
          title: title,
          text: text,
        },
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      getMessages();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleSearchMessage = async (e) => {
    console.log(e.which);
    if (e.which == 13) {
      try {
        const { accessToken } = cookie.parse(document?.cookie);
        let msgs = await axios.get(
          Endpoints.baseUrl +
            `/user/supportMessages?start=0&limit=1000&searchText=${e.target.value}`,
          {
            headers: {
              authorization: accessToken,
            },
          }
        );
        setMessages(msgs.data.data.messages);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    setMenu([
      {
        name: "اطلاعات شخصی",
        isPublic: true,
        element: <PersonalInfo user={user} />,
      },
      {
        name: "لیست سفارش ها",
        isPublic: true,
        element: <OrderList />,
      },
      {
        name: "گزارش مالی",
        isPublic: false,
        element: <IncomeLog banksData={user.bankAccounts} />,
      },
      {
        name: "آنالیز محتوا",
        isPublic: true,
        element: <AnalyzeContent />,
      },
      {
        name: "حامی ها",
        isPublic: false,
        element: <Sponsors />,
      },
      {
        name: "دنبال کننده ها",
        isPublic: true,
        element: <Followers />,
      },
      {
        name: "دنبال شونده ها",
        isPublic: true,
        element: <Followings />,
      },
      {
        name: "جستجوهای ذخیره شده",
        isPublic: true,
        element: <SavedPosts />,
      },
      {
        name: "پیام ها",
        isPublic: true,
        element: (
          <Messages
            getMessages={getMessages}
            messages={messages}
            sendMessage={sendMessage}
            handleSearch={handleSearchMessage}
            me={user}
          />
        ),
      },
    ]);
  }, [messages, sendMessage, user]);

  return menu;
}
