import React from 'react'
import {useHistory} from 'react-router-dom'
import './Buttons.css'

export const LinkButton = ({buttonColor, buttonText, buttonSize, buttonVariant, m, link}) => {
  const history = useHistory()

  return (
    <button onClick={() => history.push(`/${link}`) } className={`button ${buttonColor} ${m} ${buttonSize} ${buttonVariant} `}>
      {buttonText}
    </button>
  )
}


export const ActionButton = ({buttonColor, buttonText, buttonSize, buttonVariant}) => {
  return(
    <button className={`button ${buttonColor} ${buttonSize} ${buttonVariant}`}>
      {buttonText}
    </button>
  )
}

