import PropTypes from "prop-types";

const PromptContinue = ({ setClickedContinue }) => {
    return (
        <div className="promptContainer">
            <h2>Welcome to the Memory Card Game</h2>
            <p>
                Click on a card to reveal the image. Find the matching card to
                score a point.
            </p>
            <button
                onClick={() => {
                    localStorage.setItem("firstVisit", "false");
                    setClickedContinue(true);
                }}
            >
                Continue
            </button>
        </div>
    );
};

PromptContinue.propTypes = {
    setClickedContinue: PropTypes.func.isRequired,
};

export default PromptContinue;
