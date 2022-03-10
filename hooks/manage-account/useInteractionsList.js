import {useEffect, useState} from "react";
import {api} from "axios/api";
import {Endpoints} from "utils/endpoints";

const LIMIT_SIZE = 10

// this hooks get list of followings or followers of user
export function useInteractionsList(type) {
    const [list, setList] = useState(null);
    const [limit, setLimit] = useState(LIMIT_SIZE)
    const [count, setCount] = useState(null);

    // detect endpoints by type
    let listEndpoint, countListEndpoint;
    if (type === 'followings') {
        listEndpoint = Endpoints.getFollowings;
        countListEndpoint = Endpoints.getFollowingsCount;
    }
    
    if (type === 'followers') {
        listEndpoint = Endpoints.getFollowers;
        countListEndpoint = Endpoints.getFollowings;
    }

    const handleLoadMore = () => setLimit(p => p + LIMIT_SIZE);

    useEffect(() => {
        if(!listEndpoint) return; // do nothing if there is no endpoint
        
        api.get(listEndpoint, {
            params: {
                start: 0,
                limit,
                sortBy: '_id',
                sortOrder: -1
            }
        }).then(({data: {data}}) => {
            setList(data[type]);
        });
    }, [limit, listEndpoint, type])

    useEffect(() => {
        if(!countListEndpoint) return;
        
        api.get(countListEndpoint).then(({data: {data}}) => setCount(data.count))
    }, [countListEndpoint])

    return {list, count, handleLoadMore};
}