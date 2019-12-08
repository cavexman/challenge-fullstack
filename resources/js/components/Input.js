import React from 'react'

// I considered validating the price field to force a numerical value, but what if a user wanted to type "none", or "Free"?
// spec is unclear on this ;-)
export default function Input(props) {
  return (
      <div className={"field " + props.field_type}>
      <label className="field__label" htmlFor={props.name}>{props.label}</label>
        <input defaultValue={props.text}
          className="field__input"
          name={props.name}
          placeholder={props.placeholder}
          onChange={e => props.update( { [props.field]: e.target.value } ) }
          onKeyPress={e => e.key === 'Enter' && props.onEnter()}
          />
          
      </div>
    )  
}