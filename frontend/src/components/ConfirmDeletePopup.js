function ConfirmDeletePopup(props) {
    

    function handleDelete() {
        props.onDelete(props.cardId);
    }


    return (
    <div className={`popup popup-confirm ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
            <button type="button" className="popup__close" onClick={props.onClose}></button>
            <h3 className="popup__title popup__title-confirm">Are you sure?</h3>
            <button type="submit" className="popup__button popup__button-confirm" onClick={handleDelete}>Yes</button>    
        </div>
    </div>
    )
}

export default ConfirmDeletePopup;