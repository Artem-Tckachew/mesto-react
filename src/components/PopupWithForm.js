import React from 'react';



const PopupWithForm = (props) => {
  return (
    <section className={props.isOpen ? `overlay overlay_${props.name} overlay_active` : `overlay overlay_${props.name}`} onSubmit={props.onSubmit} noValidate>
      <form className="popup popup_form popup_profile" name={props.name}>
        <fieldset className="form"> 
          <legend className="popup__title">{props.title}</legend>
          {props.children}
          <button type="submit" className="popup__button form__submit">{props.text}</button>
        </fieldset>
        <button type="button" className="popup__close popup__close_profile" onClick={props.onClose} />
      </form>
    </section>
  );
}
  
export default PopupWithForm;