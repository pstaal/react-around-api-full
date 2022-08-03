import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
    const [title, setTitle ] = React.useState('');
    const [link, setLink ] = React.useState('');
    const [isTitleValid, setIsTitleValid] = React.useState(false);
    const [isLinkValid, setIsLinkValid] = React.useState(false);
    const [errorMessage, setErrorMessage ] = React.useState({title: '', link: ''});

    function handleLinkChange(e) {
        setLink(e.target.value);
        setIsLinkValid(e.target.validity.valid);
        setErrorMessage((state) => ({
            ...state,
            link: e.target.validationMessage
        }));
    }

    function handleTitleChange(e) {
        setTitle(e.target.value);
        setIsTitleValid(e.target.validity.valid);
        setErrorMessage((state) => ({
            ...state,
            title: e.target.validationMessage
        }));
    }
    

    function handleSubmit(e) {
        // Prevent the browser from navigating to the form address
        e.preventDefault();
      
        // Pass the values of the managed components to the external handler
        props.onAddPlaceSubmit({ title, link });

      } 

     return (
         <PopupWithForm activeButton={isTitleValid && isLinkValid} name="place" title="New place" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
                    <input value={title} onChange={handleTitleChange} id="title-input" minLength="1" maxLength="30" required placeholder="Title" name="title" className={`popup__input ${isTitleValid ? '' : 'popup__input_type_error'}`}  type="text" />
                    <span className={`title-input-error popup__input-error ${isTitleValid ? '' : 'popup__error_visible'}`}>{errorMessage.title}</span>
                    <input value={link} onChange={handleLinkChange} id="link-input" required placeholder="Image URL" name="link" className={`popup__input ${isLinkValid ? '' : 'popup__input_type_error'}`}  type="url" />
                    <span className={`link-input-error popup__input-error ${isLinkValid ? '' : 'popup__error_visible'}`}>{errorMessage.link}</span>
         </PopupWithForm>
     )

}

export default AddPlacePopup;