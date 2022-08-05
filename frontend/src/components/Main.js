import pen from '../images/pen.svg';
import plusSign from '../images/plus-sign.svg';
import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../../src/contexts/CurrentUserContext';


function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);


    return (
    <main className="content">
        <div className="profile">
            <div className="profile__picture-container">
                <img className="profile__picture" src={currentUser.avatar} alt="jacque cousteau" />
                <div className="profile__picture-overlay" onClick={props.onEditAvatarClick}>
                    <img src={pen} alt="pen icon" className="profile__picture-icon" />
                </div>
            </div>
            <div className="profile__content">
                <div className="profile__title">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="profile__button-name-change" onClick={props.onEditProfileClick}></button>
                </div>
                <p className="profile__function">{currentUser.about}</p>
            </div>
            <button type="button" className="profile__button-add-place" onClick={props.onAddPlaceClick}><img src={plusSign} alt="plus sign symbol" className="profile__plus-sign" /></button>
        </div>
        <section>
            <ul className="places">
            {props.cards.map((card) => (<Card token={props.token} card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onConfirm={props.onConfirm}/>))}
            </ul>
        </section>
    </main>

    )
}

export default Main;