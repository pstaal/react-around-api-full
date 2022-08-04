import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

    // Subscription to the context
    const currentUser = React.useContext(CurrentUserContext);

    // After loading the current user from the API
    // their data will be used in managed components.
    React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    }, [currentUser, props.isOpen]); 

    const [name, setName ] = React.useState('');
    const [description, setDescription ] = React.useState('');
    const [isNameValid, setIsNameValid] = React.useState(false);
    const [isDescriptionValid, setIsDescriptionValid] = React.useState(false);
    const [errorMessage, setErrorMessage ] = React.useState({name: '', description: ''});

    function handleNameChange(e) {
        setName(e.target.value);
        setIsNameValid(e.target.validity.valid);
        setErrorMessage((state) => ({
            ...state,
            name: e.target.validationMessage
        }));
    };

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
        setIsDescriptionValid(e.target.validity.valid);
        setErrorMessage((state) => ({
            ...state,
            description: e.target.validationMessage
        }));
    }

    function handleSubmit(e) {
        // Prevent the browser from navigating to the form address
        e.preventDefault();
      
        // Pass the values of the managed components to the external handler
        props.onUpdateUser({
          userName: name,
          userJob: description
        }, props.token);

      } 

    return (
        <PopupWithForm activeButton={isNameValid && isDescriptionValid} name="profile" title="Edit profile" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
                    <input id="name-input" onChange={handleNameChange} minLength="2" value={name || ""} maxLength="40" required placeholder="name" name="userName" className={`popup__input ${isNameValid ? '' : 'popup__input_type_error'}`} type="text" />
                    <span className={`name-input-error popup__input-error ${isNameValid ? '' : 'popup__error_visible'}`}>{errorMessage.name}</span>
                    <input id="function-input" onChange={handleDescriptionChange} minLength="2" value={description || ""} maxLength="200" required placeholder="function" name="userJob" className={`popup__input ${isDescriptionValid ? '' : 'popup__input_type_error'}`} type="text" />
                    <span className={`name-input-error popup__input-error ${isDescriptionValid ? '' : 'popup__error_visible'}`}>{errorMessage.description}</span>
        </PopupWithForm>
    )

}

export default EditProfilePopup;