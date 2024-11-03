const Card = ({ url, dataId, handleClick }) => {
    return (
        <div className="card">
            <img
                src={url}
                draggable="false"
                alt="card"
                onClick={(e) => handleClick(e, dataId)}
            />
        </div>
    );
};

export default Card;
