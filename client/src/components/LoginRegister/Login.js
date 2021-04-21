import { React, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { loginPopUp, getErrorsToastify } from '../../helpers/popUps'

import ParticlesBg from '../particles/ParticlesBg'

const Login = () => {
  
  const [formData, setFormData] = useState({
    // email: '',
    username: '',
    password: '', 
  })
  const history = useHistory()


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/auth/login/', formData)
      console.log('🐝 ~ file: Login.js ~ line 26 ~ response', response.data.message)
      // setWasLoginSuccess(true)
      loginPopUp(true)
      window.localStorage.setItem('token',response.data.token)
      history.push('/create')
    } catch (err) {
      // loginPopUp(false)
      getErrorsToastify(err)
      console.log('🐝 ~ file: Login.js ~ line 24 ~ err', err)
    }
  }

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    console.log('🐝 ~ file: Login.js ~ line 14 ~ event', event)
    setFormData(newFormData)
  }
  
  return (
    // <div className='user-form component'>
    <div className='loop-wrapper'>
      <form onSubmit={handleSubmit}className="box column is-half">
        <h1 className="title">Login</h1>
        <div className="field">
          <label className="label">username</label>
          <div className="control">
            <input
              className="input"
              placeholder="Username"
              // name="email"
              name="username"
              onChange={handleChange}
              value={formData.username}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              //value={formData.password}
            />
          </div>
        </div>
        <div className="field-button">
          <button id="form-button" className="button is-fullwidth">Login</button><br />
        </div>
      </form>
      <ParticlesBg />
    </div>
  )
}

export default Login
