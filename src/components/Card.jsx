import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.owner._id === currentUser._id;

  const isLiked = props.likes.some((user) => user._id === currentUser._id);

  const cardLikeButtonClassName = `${
    isLiked ? "element__like-button_active " : ""
  }`;

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handelLikeButton() {
    props.onCardLike(props.card);
  }

  const handleDeleteClick = () => {
    props.onDeletedCard(props.card);
    props.onConfirmationPopup(true);
  };

  return (
    <li className="element">
      {isOwn && <button className="element__trash" onClick={handleDeleteClick}/>}
      <img
        className="element__image"
        onClick={handleCardClick}
        src={props.link}
        alt={props.name}
      />
      <div className="element__group">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__container-like">
          <button
            className={`element__like-button ${cardLikeButtonClassName} `}
            type="button"
            aria-label="Лайк"
            onClick={handelLikeButton}
          ></button>
          <p className="element__count-like">{props.likes.length}</p>
        </div>
      </div>
    </li>
  );
} 