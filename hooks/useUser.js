import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import axios from "axios";
import {Endpoints} from "utils/endpoints";

import cookie from 'cookie'
import {getUserProfile} from "../shared/users";

export function useUser() {
    const [user, setUser] = useState(undefined)
    const [hasInitialized, setHasInitialized] = useState(false)
    const [memberType, setMemberType] = useState('')

    const accessToken = Cookies.get('accessToken')
    // useEffect(() => {
    //     if (!hasInitialized)
    //         //getUser()
    //         if (Cookies.get('membership') !== undefined) {
    //             // console.log(Cookies.get('membership'))
    //             setMemberType(Cookies.get('membership'))
    //         }
    //     return
    // }, [memberType, hasInitialized])

    async function getUser() {

        if (Cookies.get('membership') !== undefined) {
            // console.log(Cookies.get('membership'))
            setMemberType(Cookies.get('membership'))
        }

        if (!accessToken) {
            setHasInitialized(true)
            return
        }

        try {
            setHasInitialized(true)
            const {data: {data: { me } } } = await getUserProfile(accessToken)
            setUser(me)

        } catch (e) {
            console.log(e)
        }
    }

    

    return [ user, getUser, hasInitialized, memberType ]
}

export async function updateUser(data) {
        const accessToken = Cookies.get('accessToken')
        try {

            const { data: {status} } = await axios.put(`${Endpoints.baseUrl}/user`, {data}, {
                headers: {
                    authorization: accessToken
                }
            });
            console.log('response', status);
            return status;
        } catch (e) {
            console.log(e);
        }
    }
