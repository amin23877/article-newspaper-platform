import { useState } from "react";

const LIMIT_SIZE = 10;

export function useSponsors() {
    const [list, setList] = useState([]);
    const [limit, setLimit] = useState(LIMIT_SIZE);

    const handleLoadMore = () => setLimit((p) => p + LIMIT_SIZE);

    return { list, handleLoadMore };
}
