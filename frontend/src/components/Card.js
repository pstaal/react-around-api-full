import trashCan from "../images/Trash.svg";
import { CurrentUserContext } from '../../src/contexts/CurrentUserContext';
import React from 'react';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    function handleClick() {
        props.onCardClick({isOpen: true, title: props.card.name, link: props.card.link});
      }  
    
      function handleLikeClick() {
        props.onCardLike(props.card);
      }

        // Checking if the current user is the owner of the current card
        const isOwn = props.card.owner._id === currentUser._id;

        // Creating a variable which you'll then set in `className` for the delete button
        const cardDeleteButtonClassName = (
        `places__card-delete-icon ${isOwn ? 'places__card-delete-icon_visible' : 'places__card-delete-icon_hidden'}`
        ); 

        // Check if the card was liked by the current user
        const isLiked = props.card.likes.some(user => user._id === currentUser._id);

        // Create a variable which you then set in `className` for the like button
        const cardLikeButtonClassName = `places__card-button ${isLiked && 'places__card-button-liked'}`; 

    return (
        <li className="places__card">
            <img src={trashCan} alt="trashcan icon" className={cardDeleteButtonClassName} onClick={() => props.onConfirm(props.card._id)}/>
            <img className="places__card-image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            <div className="places__card-content">
                <h2 className="places__card-title">{props.card.name}</h2>
                <div className="places__like">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="places__likes-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
        )
}

export default Card;