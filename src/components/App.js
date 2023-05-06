import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory} from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import PopupConfirmation from './PopupConfirmation';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoToolTip from './InfoToolTip';



function App() {

  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState({});

  const history = useHistory();
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  useEffect(() => {
    if (
      isConfirmationPopupOpen ||
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      selectedCard||
      isInfoToolTipOpen
    ) {
      function handleEsc(evt) {
        evt.key === "Escape" && closeAllPopups();
      }

      document.addEventListener("keydown", handleEsc);

      return () => {
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [
    isConfirmationPopupOpen,
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    selectedCard,
    isInfoToolTipOpen
  ]);


  function closeAllPopups() {
    setSelectedCard(null);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setInfoToolTipOpen(false);
  }

  function closeByOverlay(evt) { (evt.target === evt.currentTarget) && closeAllPopups(); }


  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api.addNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups()
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => setIsLoading(false))
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true)
    api.editProfileUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true)
    api.updateProfileAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) =>  user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((user) => (user._id === card._id ? newCard : user))
        );
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }

  function handleCardDelete(card) {
    setIsLoading(true)
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id))
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }



  function handleRegisterSubmit(email, password) {
    auth.register(email, password)
      .then(() => {
        setInfoToolTipOpen(true)
        setIsSuccess(true)
        history.push("/sign-in")
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`)
        setInfoToolTipOpen(true)
        setIsSuccess(false)
      })
  }
  
  function handleLoginSubmit(email, password) {
    auth.login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token)
        setIsLoggedIn(true)
        setEmail(email)
        history.push("/")
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }

  function handleSignOut() {
    localStorage.removeItem("jwt")
    setIsLoggedIn(false)
    setIsMobileMenuOpen(false)
    history.push("/sign-in")
    setIsMobileMenuOpen(false)
  }

  function handleClickOpenMobileMenu() {
    if (isLoggedIn) {
      setIsMobileMenuOpen(!isMobileMenuOpen)
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header
            email={email}
            onSignOut={handleSignOut}
            isMobileMenuOpen={isMobileMenuOpen}
            handleClickOpenMobileMenu={handleClickOpenMobileMenu}
            isLoggedIn={isLoggedIn}
          />

        <Switch>
          <ProtectedRoute
              exact
              path="/"
              isLoggedIn={isLoggedIn}
              onEditAvatar={setIsEditAvatarPopupOpen}
              onEditProfile={setIsEditProfilePopupOpen}
              onConfirmationPopup={setIsConfirmationPopupOpen}
              onAddPlace={setIsAddPlacePopupOpen}
              onCardClick={setSelectedCard}
              onCardLike={handleCardLike}
              onDeletedCard={setDeletedCard}
              cards={cards}
              component={Main}
              isLoading={isLoading}
            />
            <Route path="/sign-in">
              <Login onLogin={handleLoginSubmit} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegisterSubmit} />
            </Route>
            <Route>
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>

        </Switch>

          <Main
            cards={cards}
            onCardClick={setSelectedCard}
            onEditProfile={setIsEditProfilePopupOpen}
            onAddPlace={setIsAddPlacePopupOpen}
            onEditAvatar={setIsEditAvatarPopupOpen}
            onCardLike={handleCardLike}
            onConfirmationPopup={setIsConfirmationPopupOpen}
            onDeletedCard={setDeletedCard}
          />

          <Footer />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onCloseOverlay={closeByOverlay}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
            onCloseOverlay={closeByOverlay}
            onLoading={isLoading}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onCloseOverlay={closeByOverlay}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onCloseOverlay={closeByOverlay}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading}
          />

          <PopupConfirmation
            isOpen={isConfirmationPopupOpen}
            onClose={closeAllPopups}
            onCloseOverlay={closeByOverlay}
            onLoading={isLoading}
            onCardDelete={handleCardDelete}
            card={deletedCard}
          />


        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
