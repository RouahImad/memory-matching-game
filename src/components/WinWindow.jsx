import PropTypes from "prop-types";

const WinWindow = ({ count, timer }) => {
    return (
        <div className="win-container">
            <h2>You Win!</h2>
            <p>
                Won after {count} flip in {timer}
            </p>
            <button onClick={() => window.location.reload()}>
                Do you want to play again?
            </button>
        </div>
    );
};

WinWindow.propTypes = {
    count: PropTypes.number.isRequired,
    timer: PropTypes.string.isRequired,
};

export default WinWindow;
