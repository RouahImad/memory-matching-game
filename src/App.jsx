import { useEffect, useState } from "react";
import "./App.css";
import BoardContainer from "./components/BoardContainer";

function App() {
    const [count, setCount] = useState(0);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${
            seconds < 10 ? "0" : ""
        }${seconds}`;
    };

    return (
        <div>
            <BoardContainer setCount={setCount} />
            <div className="infos">
                <span className="counter">flipped {count} times</span>
                <span className="timer">{formatTime(timer)}</span>
            </div>
        </div>
    );
}

export default App;
