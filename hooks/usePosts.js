import { api } from "axios/api";
import { useEffect, useState } from "react";
import { Endpoints } from "utils/endpoints";

export function usePosts(params = {}) {
    const [posts, setPosts] = useState(null);
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        setStatus("loading");
        api.get(Endpoints.getUserPosts, { params })
            .then((res) => {
                setPosts(res.data.data.posts);
                setStatus("success");
            })
            .catch(() => {
                setStatus("error");
            });
    }, []);

    return { posts, status };
}
