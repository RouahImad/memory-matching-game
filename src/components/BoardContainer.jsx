import Card from "./Card";
import QuestionCard from "../assets/question.png";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

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

const BoardContainer = ({ setCount, setMatchedCount, setMatchedAll }) => {
    const rows = 4;

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
    const [matchedCards, setMatchedCards] = useState([]);
    const [firstMatch, setFirstMatch] = useState([]);
    const [secondMatch, setSecondMatch] = useState([]);

    useEffect(() => {
        setRandUrl(shuffle([...urls, ...urls]));
    }, []);

    const handleClick = (e, id) => {
        if (
            (firstMatch.length && secondMatch.length) ||
            firstMatch.some((el) => el.id === id) ||
            secondMatch.some((el) => el.id === id) ||
            matchedCards.some((el) => el.id === id)
        )
            return;

        e.target.src = randUrl[id];
        e.target.parentElement.classList.add("flipped");
        setCount((old) => old + 1);

        if (firstMatch.length) {
            setSecondMatch([{ id, src: randUrl[id], el: e.target }]);
        } else {
            setFirstMatch([{ id, src: randUrl[id], el: e.target }]);
        }
    };

    useEffect(() => {
        let check = false;
        if (firstMatch.length && secondMatch.length) {
            if (firstMatch[0].src == secondMatch[0].src) {
                check = true;

                firstMatch[0].el.src = firstMatch[0].src;
                secondMatch[0].el.src = secondMatch[0].src;

                firstMatch[0].el.parentElement.classList.add("matched");
                secondMatch[0].el.parentElement.classList.add("matched");

                setMatchedCards((prev) => [
                    ...prev,
                    firstMatch[0],
                    secondMatch[0],
                ]);

                setMatchedCount((old) => old + 1);

                if (matchedCards.length + 2 === randUrl.length) {
                    setMatchedAll(true);
                }
            }

            let tm = setTimeout(() => {
                if (!check) {
                    firstMatch[0].el.src = QuestionCard;
                    secondMatch[0].el.src = QuestionCard;
                }
                firstMatch[0].el.parentElement.classList.remove("flipped");
                secondMatch[0].el.parentElement.classList.remove("flipped");
                setSecondMatch([]);
                setFirstMatch([]);
            }, 800);
            return () => clearTimeout(tm);
        }
    }, [firstMatch, secondMatch]);

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

BoardContainer.propTypes = {
    setCount: PropTypes.func.isRequired,
    setMatchedCount: PropTypes.func.isRequired,
    setMatchedAll: PropTypes.func.isRequired,
};

export default BoardContainer;
