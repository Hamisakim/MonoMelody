/* eslint-disable quotes */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import './profilepage.scss'


import defaultImage from '../../assets/default_avatar.jpeg'
import editIcon from '../../assets/edit-icon.svg'
import { isUserOwner } from '../../helpers/authHelp'

const ProfilePage = () => {
  
  const [userData,setUserData] = useState(null)
  console.log('🐝 ~ file: ProfilePage.js ~ line 8 ~ userData', userData)
  
  const params = useParams()
  console.log('🐝 ~ file: ProfilePage.js ~ line 8 ~ params', params)
  
  const getUser =  async () => {
    const response = await axios.get(`/api/auth/users/${params.id}/`)
    setUserData(response.data)
  }

  useEffect(() => {
    getUser()
  }, [location.pathname])




  if (!userData) return <h1 className='load-page'>NO DATA </h1>
  const userLoops = userData.loops_created
  console.log('🐝 ~ file: ProfilePage.js ~ line 22 ~ userLoops', userLoops)

  const formattedTimestamp = (timestamp) =>{
    const date = new Date(timestamp)
    const toString = date.toString()
    const dateSlice = toString.slice(4,10)
    const timeSlice = toString.slice(15,21)
    console.log('🐝 ~ timeSlice', timeSlice)
    return `${dateSlice} `
  }


  return (
    <div className='component profile-page'>
      <section className='profile-top-section'>
        { !userData.profile_image &&
            <img style={{ width: '15rem', height: '15rem' }}  src={defaultImage}  alt='profile picture'/>
        }
        
        { userData.profile_image &&
            <img style={{ width: '15rem', height: '15rem' }}  src={userData.profile_image}  alt='profile picture'/>
        }


        <div className='profile-details'>
          <h1>{`${userData.username}`}</h1>
          <p>
            {!userData.bio ? "No info! Someone's mysterious..." : userData.bio }
          </p>
          <p>{!userData.location ? null : `Location :${userData.location}`}</p>
          
          { isUserOwner(userData.id) &&
          
            <Link to={'/profile/edit'}>
              <img className="edit-icon" src={editIcon}/>
            </Link>
          }
        </div>
      
      
      </section>
      
      
      
      <section className='profile-bottom-section'>
      
        <div className='user-loops'>
          <h1>My loops</h1>
          <div className='loops-container columns is-multiline'>

            {userLoops.map(loop=>{
              console.log('🐝 ~ loop', loop)
              return (
                <Link to={`/loop/${loop.id}`} key={loop.id} >
                  <div  className='column profile-melody-sphere'>
                    <div  className='profile-sphere-content'>

                      <h1>{loop.title}</h1>
                      <h2>{formattedTimestamp(loop.date_created)}</h2>
                    </div>
                  </div>
                </Link>
              )
            })
            }

          </div>

        </div>
      
      
      </section>





    </div>
  )
}

export default ProfilePage
