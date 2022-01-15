import {useState, useEffect} from 'react'

export const useCountdown = ({ initSeconds }) => {
    // initialize timeLeft with the seconds prop
    const [seconds, setSeconds] = useState(initSeconds);

    const [isActive, setIsActive] = useState(false);

    const [formattedTime, setFormattedTime] = useState("")

    useEffect(() => {
        let interval = null;

        setFormattedTime(formatTime(seconds))

        if (!seconds) return;

        if (isActive) {

            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1)
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    function formatTime(time) {

        const insetZero = (s) => {
            if (s > 9) return s
            return `0${s}`
        }

        return `${Math.floor(time / 60)}:${insetZero(time % 60)}`
    }

    function reset() {
        setSeconds(initSeconds)
    }

    return [seconds, formattedTime, setIsActive, reset]
};
