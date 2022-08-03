import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {

    const [isInputValid, setIsInputValid] = React.useState(false);
    const [errorMessage, setErrorMessage ] = React.useState('');

    const avatarRef = React.useRef();

    function handleChange(e) {
        setIsInputValid(e.target.validity.valid);
        setErrorMessage(e.target.validationMessage);
    }

    function handleSubmit(e) {
        // Prevent the browser from navigating to the form address
        e.preventDefault();
      
        // Pass the values of the managed components to the external handler
        props.onUpdateAvatar({
          avatar: avatarRef.current.value
        });

      } 

    return (
        <PopupWithForm activeButton={isInputValid} name="profile-picture" title="Change profile picture" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
                    <input onChange={handleChange} ref={avatarRef} id="profile-input" required placeholder="New profile image URL" name="avatar" className={`popup__input ${isInputValid ? '' : 'popup__input_type_error'}`} type="url" />
                    <span className={`profile-input-error popup__input-error ${isInputValid ? '' : 'popup__error_visible'}`}>{errorMessage}</span>
        </PopupWithForm>
    )

}

export default EditAvatarPopup;