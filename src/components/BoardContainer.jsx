import Card from "./card";
import QuestionCard from "../assets/question.png";
import { useEffect, useState } from "react";

const BoardContainer = ({ setCount }) => {
    const rows = 4;
    function shuffle(arr) {
        let array = arr.slice();
        let currentIndex = array.length;

        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
        return array;
    }

    const urls = [
        "/src/assets/pumpkin.jpg",
        "/src/assets/greenThing.jpg",
        "/src/assets/onion.jpg",
        "/src/assets/redThing.jpg",
        "/src/assets/letus.jpg",
        "/src/assets/purpleThing.jpg",
        "/src/assets/tomato.jpg",
        "/src/assets/darkRedThing.jpg",
    ];
    const [randUrl, setRandUrl] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        setRandUrl(shuffle([...urls, ...urls]));
    }, []);

    const handleClick = (e, id) => {
        // console.log(matchedCards);
        // console.log(matchedCards.some((item) => item.id === id));

        if (clickCount > 2 || matchedCards.some((item) => item.id === id))
            return;

        e.target.src = randUrl[id];

        setFlippedCards((prev) => [...prev, { id, url: randUrl[id] }]);
        setCount((old) => old + 1);
        setClickCount((old) => old + 1);

        let timer = setTimeout(() => {
            e.target.src = QuestionCard;
            setFlippedCards(flippedCards.filter((el) => el[0] != id));
            setClickCount((old) => old - 1);
        }, 1500);

        if (flippedCards.length >= 2) {
            console.log(flippedCards[0]);

            if (flippedCards[0].url == randUrl[id]) {
                clearTimeout(timer);
                console.log("found same");
                e.target.src = randUrl[id];

                setMatchedCards((prev) => [...prev, { id, url: randUrl[id] }]);
                setMatchedCards((prev) => [
                    ...prev,
                    { id: flippedCards[0].id, url: flippedCards[0].url },
                ]);
            }
        }
    };

    return (
        <div className="card-container" style={{ "--board-count": rows }}>
            {randUrl.map((url, i) => (
                <Card
                    key={i}
                    url={QuestionCard}
                    cardId={i}
                    handleClick={(e) => handleClick(e, i)}
                />
            ))}
        </div>
    );
};

export default BoardContainer;
