import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
// import { ImageUploadField } from '../userStuff/ImageUploadField'
import axios from 'axios'
import { getTokenFromLocalStorage,getPayloadFromToken } from '../../helpers/authHelp'

import './profilepage.scss'


const ProfileForm = () => {

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    location: '',
    bio: '',
    profilePicture: '',
  })
  const [user, setUser] = useState(null)
  console.log('🐝 ~ setUser', setUser)
  console.log('🐝 ~ user', user)
  const [userId, setUserId] = useState(null)
  console.log('🐝 ~ userId', userId)

  const history = useHistory()
  
  console.log('🐝 ~ formData', formData)

  useEffect(() => {
    const payload = getPayloadFromToken()
    const userId = payload.sub
    const getUserData = async () => {
      const response = await axios.get(`/api/auth/users/${userId}`)
      setUserId(userId)
      setUser(response.data)
      setFormData(response.data)
      console.log('🐝 ~ response.data', response.data)
    }
    getUserData()
    console.log('get user ->', user)
  }, [])

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    //setFormData({ ...formData, [event.target.name]: event.target.value })
    setFormData(newFormData)
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    await axios.put(`/api/auth/users/${userId}/`, formData, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } } )
    console.log('🐝 ~ formData', formData)
    history.push(`/profile/${userId}`)
  }

  if (!user) return null
  return (
    <>
      <div className="main-profile-form">

     
        <h1 className="form-title">Tell us a little bit about yourself</h1>
        <form
          onSubmit={handleSubmit}
        >
          <div className="field">
            <label className="label">First Name:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Last Name:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* <div className="field"
            name="profilePicture"
            value={formData.profilePicture}
            handleImageUrl={handleImageUrl}
          >
          </div> */}

          <div className="field">
            <label className="label">Location:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>


          <div className="field">
            <label className="label">Bio:</label>
            <div className="control">
              <textarea
                className="textarea"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <button className="button is-fullwidth is-dark" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
      
  )
}

export default ProfileForm