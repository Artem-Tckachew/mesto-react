import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import {React, useState, useEffect} from 'react'
import { initialModalState } from '../utils/constants'
import api from '../utils/api'
import { currentUser } from '../contexts/CurrentUserContext'

function App() {

  const [modalsState, setModalsState] = useState(initialModalState);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUsers, setCurrentUsers] = useState('');
  const [cards, setCards] = useState([]);
  const [isUserSending, setIsUserSending] = useState(false);
  const [isAvatarSending, setIsAvatarSending] = useState(false);
  const [isCardSending, setIsCardSending] = useState(false);
  const [cardForDelete, setCardForDelete] = useState(null);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUsers._id);
    api.changeLike(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((error) => console.log(`Ошибка загрузки лайков с сервера: ${error}`));
} 

function handleAddPlaceSubmit(card) {
  setIsCardSending(true)
  api.addCard(card)
  .then((newCard) => {
    setCards([newCard, ...cards]);
    closeAllPopups(); 
  })
  .catch((error) => console.log(`Ошибка добавления карточки с сервера: ${error}`))
  .finally(() =>  setIsCardSending(false));
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
        setCurrentUsers(res);
      })
      .catch((error) => console.log(`Ошибка загрузки данных пользователя с сервера: ${error}`));
  }, []);

  function closeAllPopups() {
    setModalsState(initialModalState)
  }

function handleUpdateUser(item){
  setIsUserSending(true);
  api.setUserData(item)
    .then(res => {
      setCurrentUsers(res);
      closeAllPopups()
    })
    .catch((error) => console.log(`Ошибка загрузки данных пользователя с сервера: ${error}`))
    .finally(() => setIsUserSending(false));
}

function handleUpdateAvatar(item){
  setIsAvatarSending(true)
  api.setUserAvatar(item)
  .then(res => {
    setCurrentUsers(res);
    closeAllPopups()
  })
  .catch((error) => console.log(`Ошибка загрузки данных пользователя с сервера: ${error}`))
  .finally(() => setIsAvatarSending(false));
}

  return (
     <currentUser.Provider value={currentUsers}>
  <div className="page">
    <Header />
    <Main onEditProfile={() => setModalsState({isEditProfilePopupOpen: true})}
    onAddPlace={() => setModalsState({isAddPlacePopupOpen: true})}
    onEditAvatar={() => setModalsState({isEditAvatarPopupOpen: true})} 
    onCardClick={handleCardClick} onCardLike={handleCardLike} cards={cards} onCardDelete={handleCardDeleteRequest}/>
    <Footer />
    
    <EditAvatarPopup isOpen={modalsState.isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isSending={isAvatarSending} /> 

    <PopupWithForm name="submit" title="Вы уверены?" text="Да" onSubmit={handleCardDelete} isOpen={isDeleteCardPopupOpen} >
    </PopupWithForm>
   
    <EditProfilePopup isOpen={modalsState.isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isSending={isUserSending}/> 

    <AddPlacePopup isOpen={modalsState.isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isSending={isCardSending}/>

    <ImagePopup card={selectedCard} onClose={() => setSelectedCard(null)} />
    
  </div>
</currentUser.Provider>
  );
}

export default App;
