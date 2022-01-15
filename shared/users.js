import axios from "axios";
import {Endpoints} from "utils/endpoints";


export function getUserProfile(accessToken) {
    return axios.get(Endpoints.baseUrl + '/user/me',{
        headers: {
            authorization: accessToken
        }
    })
}

