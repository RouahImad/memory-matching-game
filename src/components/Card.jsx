import PropTypes from "prop-types";
const Card = ({ url, dataId, handleClick }) => {
    return (
        <div className="card">
            <img
                src={url}
                draggable="false"
                alt={`Card ${dataId}`}
                loading="lazy"
                onClick={(e) => handleClick(e, dataId)}
            />
        </div>
    );
};

Card.propTypes = {
    url: PropTypes.string.isRequired,
    dataId: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default Card;
