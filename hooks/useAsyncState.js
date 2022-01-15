
import {useState, useEffect, useRef, useCallback} from 'react'


export function useAsyncState(initialState) {
    const [state, setState] = useState(initialState);
    const cbRef = useRef(null);

    const setStateCallback = useCallback((state, cb) => {
        cbRef.current = cb;
        setState(state);
    }, []);

    useEffect(() => {
        if (cbRef.current) {
            cbRef.current(state);
            cbRef.current = null; // reset callback after execution
        }
    }, [state]);

    return [state, setStateCallback];
}
