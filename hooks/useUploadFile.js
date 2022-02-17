import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from "axios";
import { Endpoints } from 'utils/endpoints';
import cookie from 'cookie'

export function useUploadFile() {
    const [uploadFileData, setUploadFileData] = useState()
    // const { accessToken } = cookie.parse(document?.cookie)

    async function upload(file, type, accessToken, limitSize = 5000000) {
        console.log('file is', file)
        console.log('type is', type)
        if (file?.size > limitSize) {
            return ({ status: 'error', message: 'upload limit size error' })
        }
        try {
            const fileData = await getUploadUrl(type, accessToken);
            const info = await uploadFile(fileData.uploadUrl, file, accessToken);
            const done = await uploadDone(fileData.fileId, accessToken);
            return ({ status: 'ok', message: 'success', fileId: fileData.fileId })

        }
        catch (e) {
            console.log('upload error', e)  
            return ({ status: 'error', message: e })
        }
    }
    const getUploadUrl = async (fileType, accessToken) => {
        try {
            const response = await axios.get(`${Endpoints.baseUrl}/file/upload/link/${fileType}`, {
                headers: {
                    authorization: accessToken
                }
            });
            setUploadFileData(response.data.data);
            console.log('response data', response.data.data)
            return (response.data.data);
        } catch (e) {
            console.log(e);
        }
    }
    const uploadFile = async (uploadUrl, file, accessToken) => {
        try {
            var options = {
                headers: {
                    'Content-Type': file.type,
                }
            };
            const response = axios.put(uploadUrl, file, options);
            console.log('response', response);
            return response;
        } catch (e) {
            console.log(e);
        }
    }
    const uploadDone = async (fileId, accessToken) => {
        try {

            const response = await axios.post(`${Endpoints.baseUrl}/file/upload/done/${fileId}`, {}, {
                headers: {
                    authorization: accessToken
                }
            });
            console.log('response', response);
            return response;
        } catch (e) {
            console.log(e);
        }
    }




    return [upload, uploadFileData]
}
