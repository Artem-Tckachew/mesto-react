import React from 'react';
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({isOpen, onUpdateAvatar, onClose, isSending }) {
 const avatarRef = React.useRef();
 function handleSubmit(e) {
  e.preventDefault();

  onUpdateAvatar({
    avatar: avatarRef.current.value
  });
} 
  return (

    <PopupWithForm isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} name="avatar" title="Обновить аватар" text={isSending ? "Сохранение..." : "Сохранить" }>
    <input type="url" ref={avatarRef} className="form__input form__input_avatar popup__input" id="input-avatar" name="profileAvatar" placeholder="Ссылка на аватар" required />
    <span className="input-avatar-error" />
</PopupWithForm>
  )}

  export default EditAvatarPopup;