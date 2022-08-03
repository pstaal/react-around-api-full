
function ImagePopup(props) {

    return (
        <div className={`popup popup-picture ${props.card.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup-picture__container">
                <button type="button" className="popup__close" onClick={props.onClose}></button>
                <img className="popup-picture__image" src={props.card.link} alt={props.card.title}/>
                <p className="popup-picture__title">{props.card.title}</p>
            </div>
        </div>
    )
}

export default ImagePopup;