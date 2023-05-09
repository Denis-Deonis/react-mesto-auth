import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth.hook";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import PopupConfirmation from "./PopupConfirmation";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoToolTip from "./InfoToolTip";

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

  const navigate = useNavigate();
  const { loginUser, registerUser, getToken, error } = useAuth();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailName, setEmailName] = useState(null);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (
      isConfirmationPopupOpen ||
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      selectedCard ||
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
    isInfoToolTipOpen,
  ]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmailName(res.data.email);
          }
        })
        .catch(() => {
          console.error("Error: " + error);
        });
    }
  }, []);

  function closeAllPopups() {
    setSelectedCard(null);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setInfoToolTipOpen(false);
  }

  function closeByOverlay(evt) {
    evt.target === evt.currentTarget && closeAllPopups();
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api
      .editProfileUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api
      .updateProfileAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((user) => (user._id === card._id ? newCard : user))
        );
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false));
  }

  function handleRegisterSubmit(email, password) {
    registerUser(email, password)
      .then(() => {
        setIsSuccess(true);
        setInfoToolTipOpen(true);
        navigate("/sign-in");
      })
      .catch(() => {
        setIsSuccess(false);
        setInfoToolTipOpen(true);
        console.error("Error: " + error);
      })
      .finally(setInfoToolTipOpen(true));
  }

  function handleLoginSubmit(email, password) {
    loginUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmailName(email);
        navigate("/");
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    setEmailName(null);
    setIsMobileMenuOpen(false);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }

  function handleClickOpenMobileMenu() {
    if (isLoggedIn) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header
            email={emailName}
            onSignOut={handleSignOut}
            isMobileMenuOpen={isMobileMenuOpen}
            handleClickOpenMobileMenu={handleClickOpenMobileMenu}
            isLoggedIn={isLoggedIn}
          />

          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <ProtectedRoute
                    component={Main}
                    cards={cards}
                    onCardClick={setSelectedCard}
                    onEditProfile={setIsEditProfilePopupOpen}
                    onAddPlace={setIsAddPlacePopupOpen}
                    onEditAvatar={setIsEditAvatarPopupOpen}
                    onCardLike={handleCardLike}
                    onConfirmationPopup={setIsConfirmationPopupOpen}
                    onDeletedCard={setDeletedCard}
                    isLoading={isLoading}
                    isLoggedIn={isLoggedIn}
                  />
                </>
              }
            />

            <Route
              path="/sign-in"
              element={<Login onLogin={handleLoginSubmit} />}
            />
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegisterSubmit} />}
            />

            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} />}
            />
          </Routes>

          <InfoToolTip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
          />

          {isLoggedIn && <Footer /> }

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
