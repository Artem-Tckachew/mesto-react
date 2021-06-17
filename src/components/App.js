import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import {React, useState, useEffect} from 'react'
import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardForDelete, setCardForDelete] = useState(null);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLike(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((error) => console.log(`Ошибка загрузки лайков с сервера: ${error}`));
} 

function handleAddPlaceSubmit(card) {
  setIsLoading(true)
  api.addCard(card)
  .then((newCard) => {
    setCards([newCard, ...cards]);
    closeAllPopups(); 
  })
  .catch((error) => console.log(`Ошибка добавления карточки с сервера: ${error}`))
  .finally(() =>  setIsLoading(false));
} 

function handleCardDelete(evt) {
  evt.preventDefault();
  api.deleteCard(cardForDelete._id)
  .then(() => {
      setCards(cards.filter((c) => (c._id !== cardForDelete._id)));
      setIsDeleteCardPopupOpen(false);
  })
  .catch((error) => console.log(`Ошибка удаления карточки с сервера: ${error}`));;
} 
  useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res)
      })
      .catch((error) => console.log(`Ошибка загрузки карточек с сервера: ${error}`));
  }, []);

  function handleCardDeleteRequest(card) {
    setCardForDelete(card);
    setIsDeleteCardPopupOpen(true);
  }

  useEffect(() => {
    api.getUserData()
      .then(res => {
        setCurrentUser(res);
      })
      .catch((error) => console.log(`Ошибка загрузки данных пользователя с сервера: ${error}`));
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

function handleUpdateUser(item){
  setIsLoading(true);
  api.setUserData(item)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups()
    })
    .catch((error) => console.log(`Ошибка загрузки данных пользователя с сервера: ${error}`))
    .finally(() => setIsLoading(false));
}

function handleUpdateAvatar(item){
  setIsLoading(true)
  api.setUserAvatar(item)
  .then(res => {
    setCurrentUser(res);
    closeAllPopups()
  })
  .catch((error) => console.log(`Ошибка загрузки данных пользователя с сервера: ${error}`))
  .finally(() => setIsLoading(false));
}

  return (
     <CurrentUserContext.Provider value={currentUser}>
  <div className="page">
    <Header />
    <Main onEditProfile={setIsEditProfilePopupOpen}
    onAddPlace={setIsAddPlacePopupOpen}
    onEditAvatar={setIsEditAvatarPopupOpen} 
    onCardClick={handleCardClick} onCardLike={handleCardLike} cards={cards} onCardDelete={handleCardDeleteRequest}/>
    <Footer />
    
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isSending={isLoading} /> 

    <PopupWithForm name="submit" title="Вы уверены?" text="Да" onSubmit={handleCardDelete} isOpen={isDeleteCardPopupOpen} >
    </PopupWithForm>
   
    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isSending={isLoading}/> 

    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isSending={isLoading}/>

    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    
  </div>
</CurrentUserContext.Provider>
  );
}

export default App;
