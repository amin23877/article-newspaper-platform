import axios from "axios";
import Cookies from "js-cookie";
import { Endpoints } from "utils/endpoints";

export const api = axios.create({
    baseURL: Endpoints.baseUrl,
    headers: {
        Authorization: Cookies.get("accessToken") || "",
    },
});
