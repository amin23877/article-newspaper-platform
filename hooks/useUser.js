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
        const {accessToken} = cookie.parse(document.cookie)
        // const accessToken = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBmYTcyYTdjOWQ0YTAwMWMyYTE4NWMiLCJyb2xlIjoidXNlciIsImlhdCI6MTY0NTE5MzA0NCwiZXhwIjoxNjQ2MzkzMDQ0fQ.cPiB7hvIZAkLh9dnW7AXx0a_vij_7t9mJhA2SsDOiQ7cdpNTm8SoqbPsrrmkOcIrcmEPMNbvg3rir2r5yP3z7cGPcjQ0qJd_oiZn6Nl-D-gpbzfrb2nRLxnkMKhF2Sug1X8B-JdSEepyRe-KqP4HYENfq3fAv5IuydsoQgy1WeMDac6Cu6HHdteztaUKgQEfkXOqllILXi9dkSPfYXQRMjphh44ngQg0vHqcFagWcb7bzxElK1UvmpD3WgQU3fqlu0laB1QyO7O9O3kdwDgNAyV7AqiBLAGxjOxWAOC9SqGTTEH5eTLIpxeBr9Yl_-wrvhrZboAt07x73Xia-PQSKw"

        if (!accessToken) {
            setHasInitialized(true)
            return
        }

        try {
            setHasInitialized(true)
            const {data: {data: { me } } } = await getUserProfile(accessToken)
            console.log(me)
            setUser(me)

        } catch (e) {
            console.log(e)
        }
    }

    

    return [ user, getUser, hasInitialized, memberType ]
}
