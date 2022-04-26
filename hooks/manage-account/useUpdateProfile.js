/* eslint-disable react-hooks/exhaustive-deps */
import { useUploadFile } from "../useUploadFile";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useUpdateUser } from "hooks/manage-account/useUpdateUser";
import { useDispatch } from "react-redux";
import { setUserInfoSection } from "redux/users";

const accessToken = Cookies.get("accessToken");

export function useUpdateProfile() {
  const [status, setStatus] = useState("idle");
  const [upload] = useUploadFile();
  const {
    res: newUserInfo,
    fetcher: updateUser,
    status: updateStatus,
  } = useUpdateUser();
  const dispatch = useDispatch();

  const update = useCallback(async (data) => {
    setStatus("loading");

    try {
      // upload files on server
      let prof, cover;
      prof = cover = {};
      if (data.profile) prof = await upload(data.profile, "image", accessToken);
      if (data.cover) cover = await upload(data.cover, "image", accessToken);

      // update user info with uploaded files
      let newData = {
        ...(prof && { profilePicture: prof.fileId }),
        ...(cover && { coverImage: cover.fileId }),
      };

      updateUser(newData);

      setStatus("success");
    } catch (e) {
      console.log(e);
      setStatus("error");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update user state
  useEffect(() => {
    if (updateStatus === "success") {
      dispatch(
        setUserInfoSection("profilePicture", newUserInfo.user.profilePicture)
      );

      dispatch(setUserInfoSection("coverImage", newUserInfo.user.coverImage));
    }
  }, [dispatch, newUserInfo, updateStatus]);

  return { update, status };
}
