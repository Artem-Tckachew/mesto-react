import PopupWithForm from './PopupWithForm'
import { React, useState } from 'react'

function AddPlacePopup({isOpen, onAddPlace, onClose, isSending}) {
    const [name, setName] = useState('');
  const [link, setLink] = useState('');

    const handleNameChange = (evt) => {
        setName(evt.target.value);
      };
    
      const handleUrlChange = (evt) => {
        setLink(evt.target.value);
      };

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link
        });
      }
     return (
   
        <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} text={isSending ? "Сохранение..." : "Создать"} name="addcard" title="Новое Место">
        <input value={name} onChange={handleNameChange} type="text" className="form__input form__input_title popup__input" id="input-mesto" name="name" placeholder="Название" minLength={2} maxLength={30} required />
              <span className="input-mesto-error" />
              <input type="url" value={link} onChange={handleUrlChange} className="form__input form__input_link popup__input" id="input-url" name="link" placeholder="Ссылка на картинку" required />
              <span className="input-url-error" />
        </PopupWithForm>
     )}
   
     export default AddPlacePopup;