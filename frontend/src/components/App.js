import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ProtectedRoute from "./ProtectedRoute"; 
import InfoTooltip from './InfoTooltip';
import Register from './Register';
import Login from './Login';
import React from 'react';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../../src/contexts/CurrentUserContext';
import { Route, Switch, useHistory } from 'react-router-dom';




function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false); 
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({isOpen: false, link: '', title: ''});
    const [currentUser, setCurrentUser] = React.useState('');
    const [cards, setCards] = React.useState([]);
    const [selectedCardId, setSelectedCardId] = React.useState(null);
    const [loggedIn, setLoggedIn ] = React.useState(false);
    const [tooltipInfo, setTooltipInfo] = React.useState({text: '', isSuccess: false});
    const [token, setToken ] = React.useState(localStorage.getItem('jwt'));

    const history = useHistory();

    const tokenCheck = React.useCallback(function () {
        if (token) {
            api.initialize(token).then((startDataArray) => {
                if (startDataArray) {
                  setLoggedIn(true);
                  history.push("/");
                  setCurrentUser(startDataArray[0].data);
                  setCards(startDataArray[1].data);
                }
              }).catch((err) => {
                  console.log(err)
              });
      
        }
    },[history, token]);

    React.useEffect(() => {

        tokenCheck();

    },[loggedIn, tokenCheck, token]);

   
  
    function handleCardDelete(CardId, token) {
        api.deleteCard(CardId, token).then((res) => {
            setCards(cards.filter(card => card._id !== CardId));
            setSelectedCardId(null);
            closeAllPopups();
        }).catch((err) => {
            console.log(err); // log the error to the console
        });
    }

    function handleAddPlaceSubmit(cardObject, token){
        api.addCart(cardObject, token).then((newCard) => {
            setCards([newCard.data, ...cards]); 
            closeAllPopups();
        }).catch((err) => {
            console.log(err); // log the error to the console
        });

    }

    function handleCardLike(card, token) {
        // Check one more time if this card was already liked
        const isLiked = card.likes.some(user => user._id === currentUser._id);
        
        // Send a request to the API and getting the updated card data
        api.toggleLike(card._id, isLiked, token).then((newCard) => {
            setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard.data : currentCard));
        }).catch((err) => {
            console.log(err); // log the error to the console
        });
    };


    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick({isOpen, link, title}) {
        setSelectedCard({isOpen, link, title});
    }

    function handleConfirmation(cardId) {
        setIsConfirmDeletePopupOpen(true);
        setSelectedCardId(cardId);
    }
 
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsConfirmDeletePopupOpen(false);
        setIsTooltipOpen(false);
        setSelectedCard({isOpen: false, link: '', title: ''});
    }

    function handleUpdateUser(user, token) {
        api.setNewUser(user, token).then((res) => {
            setCurrentUser(res.data);
            closeAllPopups();
        }).catch((err) => {
            console.log(err); // log the error to the console
        });
    }

    function handleUpdateAvatar(avatarObject, token) {
        api.changePicture(avatarObject, token).then((res) => {
            setCurrentUser(res.data); 
            closeAllPopups();
        }).catch((err) => {
            console.log(err); // log the error to the console
        });
    }

    function handleRegister(password, email) {
        auth.register(password, email)
        .then((res) => {
            setTooltipInfo({text: 'Success! You have now been registered', isSuccess: true});
            history.push("/signin");
          }).catch((err) => {
            setTooltipInfo({text: 'Oops, something went wrong. Please try again', isSuccess: false});
          }).finally(() => {
            setIsTooltipOpen(true);
          })
    }

    function handleLogin(password, email)  {
        auth.authorize(password,email)
        .then((res) => {
            setLoggedIn(true);
            history.push("/");
            setToken(res.token);
            tokenCheck();
        }).catch((err) => {
            setTooltipInfo({text: 'Oops, something went wrong. Please try again', isSuccess: false});
            setIsTooltipOpen(true);
        });
    }


  return (
  <div className="page">
    <CurrentUserContext.Provider value={currentUser}>
        <Header email={currentUser.email} logoutFunction={() => { setLoggedIn(false)
            setToken(null); setCurrentUser('');
        }}/>
        <Switch>
            <Route path="/signup">
                <Register handleRegister={handleRegister}/>
            </Route>
            <Route path="/signin">
                <Login  handleLogin={handleLogin}/>
            </Route>
            <ProtectedRoute path="/" loggedIn={loggedIn}>
                <Main token={token} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onConfirm={handleConfirmation} onCardClick={handleCardClick} onEditProfileClick={handleEditProfileClick} onAddPlaceClick={handleAddPlaceClick} onEditAvatarClick={handleEditAvatarClick}/>
            </ProtectedRoute>
        </Switch>
        { loggedIn && <Footer />}
        <EditProfilePopup token={token} onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup token={token} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} onAddPlaceSubmit={handleAddPlaceSubmit}/>
        <EditAvatarPopup token={token} onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <ConfirmDeletePopup token={token} isOpen={isConfirmDeletePopupOpen} cardId={selectedCardId} onClose={closeAllPopups} onDelete={handleCardDelete}/>
        <InfoTooltip isOpen={isTooltipOpen} onClose={closeAllPopups} text={tooltipInfo.text} isSuccess={tooltipInfo.isSuccess} />
    </CurrentUserContext.Provider>
  </div>

  );
}

export default App;
