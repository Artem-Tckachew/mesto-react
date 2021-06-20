import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onUpdateUser, onClose,  isSending}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  React.useEffect(() => {
    currentUser.name !== undefined && setName(currentUser.name);
    currentUser.about !== undefined && setAbout(currentUser.about);
  }, [currentUser, isOpen]); 
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleDescriptionChange = (evt) => {
    setAbout(evt.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about
    });
  } 
  return (

<PopupWithForm onSubmit={handleSubmit}  isOpen={isOpen} onClose={onClose} text={isSending ? "Сохранение..." : "Сохранить"} name="name" title="Редактировать профиль">
    <input  value={name} onChange={handleNameChange} type="text" className="form__input form__input_name popup__input" id="input-name" name="profileTitle" placeholder="Имя" minLength={2} maxLength={40} required />
          <span className="input-name-error" />
          <input value={about} onChange={handleDescriptionChange} type="text" className="form__input form__input_job popup__input" id="input-job" name="profileSubTitle" placeholder="Профессия" minLength={2} maxLength={200} required />
          <span className="input-job-error" />
    </PopupWithForm>
  )}

  export default EditProfilePopup;