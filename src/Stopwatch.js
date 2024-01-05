import React, {useState, useEffect} from "react";
import "./stopwatch.css";

const Stopwatch = (props) => {
    // state to store time
    const [time, setTime] = useState(100 * props.minutes * 60);

    // state to check stopwatch running or not
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId;
        if (props.enabled) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            if (time > 0) {
                intervalId = setInterval(() => {
                    setTime(time - 1)
                }, 9);
            } else {
                props.timeOutHandler()
            }
        }
        return () => clearInterval(intervalId);
    }, [props.enabled, time]);


    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);

    // Method to start and stop timer
    const startAndStop = () => {
        setIsRunning(!isRunning);
    };

    // Method to reset timer back to 0
    const reset = () => {
        setTime(100 * props.minutes * 60);
    };
    return (
        <div className="stopwatch-container">
            <p className="stopwatch-time">
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
            </p>
        </div>
    );
};

export default Stopwatch;