import { useEffect, useState } from "react";
import "./App.css";
import BoardContainer from "./components/BoardContainer";
import PromptContinue from "./components/PromptContinue";
import WinWindow from "./components/WinWindow";

function App() {
    const [count, setCount] = useState(0);
    const [timer, setTimer] = useState(0);
    const [matchedCount, setMatchedCount] = useState(0);
    const [clickedContinue, setClickedContinue] = useState(false);
    const [matchedAll, setMatchedAll] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
        if (matchedAll) {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [matchedAll]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${
            seconds < 10 ? "0" : ""
        }${seconds}`;
    };

    return (
        <div>
            {clickedContinue ? (
                <>
                    {matchedAll && (
                        <WinWindow count={count} timer={formatTime(timer)} />
                    )}
                    <div>
                        <BoardContainer
                            setCount={setCount}
                            setMatchedCount={setMatchedCount}
                            setMatchedAll={setMatchedAll}
                        />
                        <div className="infos">
                            <span className="counter">flips {count}</span>
                            <span className="matched">
                                matched {matchedCount}
                            </span>
                            <span className="timer">{formatTime(timer)}</span>
                        </div>
                    </div>
                </>
            ) : (
                <PromptContinue setClickedContinue={setClickedContinue} />
            )}
        </div>
    );
}

export default App;
