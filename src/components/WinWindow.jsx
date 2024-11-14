import PropTypes from "prop-types";

const WinWindow = ({ count, timer }) => {
    return (
        <div className="win-container">
            <h2>You Win!</h2>
            <div className="message">
                <p>(☞ﾟヮﾟ)☞ after {count} flips...</p>
                <p>(☞ﾟヮﾟ)☞ in {timer}s 🚀.</p>
            </div>
            <div className="tryAgain">
                Do you want to
                <button onClick={() => window.location.reload()}>
                    play again?
                </button>
            </div>
        </div>
    );
};

WinWindow.propTypes = {
    count: PropTypes.number.isRequired,
    timer: PropTypes.string.isRequired,
};

export default WinWindow;
