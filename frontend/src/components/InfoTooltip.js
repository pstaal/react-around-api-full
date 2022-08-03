import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip(props) {

    return (
    <div className={`popup popup-infotooltip ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
            <button type="button" className="popup__close" onClick={props.onClose}></button>
            <img className="popup-tooltip__image" src={props.isSuccess ? success : fail} alt="infotooltip"/>
            <h1 className="popup-tooltip__title">{props.text}</h1>
        </div>
    </div>
    )
}

export default InfoTooltip;