import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" name="avatar"  style={{ backgroundImage: `url(${currentUser.avatar})` }} >
          <div className="profile__avatar profile__avatar_hover" onClick={onEditAvatar} />
        </div>
        <div className="profile__intro">
          <h2 className="profile__title" name="name">{currentUser.name}</h2>
          <p className="profile__subtitle" name="about">{currentUser.about}</p>
          <button type="button" className="profile__edit" onClick={onEditProfile} />
        </div>
        <button type="button" className="profile__add" onClick={onAddPlace} />
      </section>
      <section className="elements">
      {cards.map(card => (<Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />))}
        </section>
    </main>
  );
}

export default Main;