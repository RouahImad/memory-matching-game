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
        "https://t4.ftcdn.net/jpg/00/57/13/63/240_F_57136319_lcUZ6ETec1DbJMcSXPDdWgB8xFaYDOwp.jpg",
        "https://t4.ftcdn.net/jpg/02/66/68/37/240_F_266683754_wzx9XxeNXKudct2Q3qwQf1PvVaQaKOf6.jpg",
        "https://t3.ftcdn.net/jpg/01/91/55/42/240_F_191554261_Kfn9mPkFP2lRmNuSkLkoe6yMnOdC1GUC.jpg",
        "https://t3.ftcdn.net/jpg/00/91/30/42/240_F_91304200_GWKgCZTgxvN7KCNTExaXB6CfyvxGpT6v.jpg",
        "https://t4.ftcdn.net/jpg/00/53/59/03/240_F_53590332_GktsdggabKrEv4a3URfSalFHofBoFOqL.jpg",
        "https://t3.ftcdn.net/jpg/00/78/37/74/240_F_78377459_YZ2gxe46PJmgtpXjeHC5l6qQOLtIfpe3.jpg",
        "https://t3.ftcdn.net/jpg/00/52/44/64/240_F_52446492_vKWvqM8QhyhYhaz4EHL881Dher7x092m.jpg",
        "https://t3.ftcdn.net/jpg/03/58/94/72/240_F_358947207_bOEQt74sKb6x6ONbNnJZpPDtuymVT6Dv.jpg",
    ];
    const [randUrl, setRandUrl] = useState([]);
    const [clickCount, setClickCount] = useState(1);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    useEffect(() => {
        setRandUrl(shuffle([...urls, ...urls]));
    }, []);

    const handleClick = (e, id) => {
        console.log(flippedCards);
        if (
            matchedCards.some((item) => item.id === id) ||
            matchedCards.some((item) => item.id === id)
        )
            return;

        if (clickCount <= 2) {
            setClickCount((old) => old + 1);
            setCount((old) => old + 1);
            e.target.src = randUrl[id];
            setFlippedCards((prev) => [...prev, { id, url: randUrl[id] }]);

            setTimeout(() => {
                setFlippedCards(flippedCards.filter((el) => el[0] != id));
                e.target.src = QuestionCard;
                setClickCount((old) => old - 1);
            }, 4000);
        }

        if (flippedCards.length >= 2) {
            if (flippedCards[0][1] == randUrl[id]) {
                console.log("found same");
                e.target.src = randUrl[id];
                setMatchedCards(
                    (prev) => [...prev, { id, url: randUrl[id] }],
                    (prev) => [
                        ...prev,
                        { id: flippedCards[0][0], url: flippedCards[0][1] },
                    ]
                );
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
