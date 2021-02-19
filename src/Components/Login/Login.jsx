import { useToast } from '@chakra-ui/react'
import React, { useState, useContext } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { ActionButton } from '../Reusable/Buttons/Buttons'

import '../SignUp/SignUp.css'

const Login = () => {
  const toast = useToast()
  const history = useHistory()
  const { logIn, currentUser } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = async(e) => {
    e.preventDefault()

    const isSuccess = await logIn(email,password)
    if(isSuccess.user){
      history.push('/')
      toast({
        title: "Success",
        description: `Hey, welcome back`,
        status: "success",
        duration: 3000,
        isClosable: true,
      })


    }
  }

  return (
    <section className="signup">
      {currentUser ? (
        <Redirect to='/' />
      ) : (

      <div className="signup__container">
        <form onSubmit={handleSubmit} className="signup__form">

          <div className="signup__form__input">
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} required/>
            <label className="signup__form__label">Email</label>
          </div>
          <div className="signup__form__input">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
            <label className="signup__form__label">Password</label>
          </div>
          <ActionButton buttonText="Submit" buttonSize="lg" buttonVariant="filled" buttonColor="blue" onSubmit={handleSubmit}/>
        </form>
      </div>
      )}
    </section>
  )
}

export default Login
