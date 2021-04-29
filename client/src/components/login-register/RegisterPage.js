import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './userForms.scss'
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import { loginPopUp, signupPopup, getErrorsToastify } from '../../helpers/popUps'
// import { useHistory } from 'react-router-dom'

import ParticlesBg from '../particles/ParticlesBg'



const Register = () => {

  const history = useHistory()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  console.log('🔴 ERRORS ', errors)

  

  const handleChange = (event) => {
    console.log('LOGGING')
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    let wasSignupSuccess = null
    try {
      const dataToSend = formData
      console.log('🤖 ~ formData', formData)
      const response =  await axios.post('api/auth/register/', dataToSend)
      console.log('🟢 ~ file: register.js ~ line 44 ~ response', response)
      //history.push('/login') //!change back to /
      wasSignupSuccess = true
      signupPopup(true,'Sign up success')
      
    } catch (err) {
      setErrors(err.response.data)
      console.log('🔴 ~ file: register.js ~ line 44 ~ response',err)
      console.log('🔴  ERROR MESSAGE',err.response.data) 
      getErrorsToastify(err)
      // const errorMessage = err.response.data.email[0]
      // setWasLoginSuccess(false)
      wasSignupSuccess = false
      // signupPopup(false,errorMessage)
      signupPopup(false,'Sign up failed')
    }
    if (wasSignupSuccess){

      const loginData = {
        username: formData.username,
        password: formData.password,
      }
      try {
        const response = await axios.post('/api/auth/login/', loginData)
        console.log('🐝 ~ file: Login.js ~ line 26 ~ response', response.data.message)
        // setWasLoginSuccess(true)
        loginPopUp(true)
        window.localStorage.setItem('token',response.data.token)
        history.push('/create')
      } catch (err) {
        loginPopUp(false)
        console.log('🐝 ~ file: Login.js ~ line 24 ~ err', err)
      }



      
    }



  }




  
  return (
    <div className='loop-wrapper'>
      <form className="signup-form box column is-half" onSubmit={handleSubmit}>
        <div className="field">
          <p className="control ">
            <input className="input is-medium" 
              name="username" 
              placeholder="Username" 
              value={formData.username}
              // value={errors.username}
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="field">
          <p className="control ">
            <input className="input is-medium" 
              name="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
            />

          </p>
        </div>
        <div className="field">
          <p className="control ">
            <input className="input is-medium" 
              //type="password" 
              name='password'
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              type='password'
            />
          </p>
        </div>
        <div className="field">
          <p className="control password-confirmation-control ">
            <input className="input is-medium" 
              name="password_confirmation" 
              placeholder="Confirm Password" 
              value={formData.password_confirmation}
              onChange={handleChange}
              type='password'
            />

          </p>
        </div>
        <div className="field-button">
          <button id="form-button " className="is-medium button is-fullwidth">Sign Up</button><br />
        </div>
      </form>
      <ParticlesBg />
    </div>
  )
}

export default Register
