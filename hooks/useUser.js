import {useState} from 'react'
import axios from "axios";
import {Endpoints} from "utils/endpoints";

import cookie from 'cookie'
import {getUserProfile} from "../shared/users";

export function useUser() {
    const [user, setUser] = useState(undefined)
    const [hasInitialized, setHasInitialized] = useState(false)

    async function getUser() {

        const {accessToken} = cookie.parse(document.cookie)

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

    return [ user, getUser, hasInitialized ]
}
