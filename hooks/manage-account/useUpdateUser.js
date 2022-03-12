import { api } from "axios/api";
import { useCallback, useState } from "react";
import { Endpoints } from "utils/endpoints";

export function useUpdateUser() {
    const [status, setStatus] = useState("idle");
    const [res, setRes] = useState(null);

    const fetcher = useCallback((data) => {
        setStatus("loading");
        api.put(Endpoints.updateUser, data)
            .then((res) => {
                setRes(res.data.data);
                setStatus("success");
            })
            .catch(() => {
                setStatus("error");
            });
    }, []);

    return { res, status, fetcher };
}
