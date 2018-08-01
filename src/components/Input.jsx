import React from 'react';

export default (props) => {
  return <div className={props.activeAutoComplte ? props.position == 'up'? "search-form search-form-up" : "search-form search-form-down" : "search-form"}>
            {
              props.position == 'up' && props.activeAutoComplte ?
                null
                : <span className={props.active ? "search-form__placeholder search-form__placeholder-active" : "search-form__placeholder"}>Выберите страну</span>
            }

            <input
              className="search-form__input"
              type='text'
              value={props.value}
              onChange={(e)=> props.inputChange(e)}
              onFocus={(e)=> props.inputFocus(e)}
              onBlur={()=> props.inputBlur()}/>
         </div>;
}
