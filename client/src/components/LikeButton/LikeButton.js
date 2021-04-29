import './likebutton.scss'
import React, { useState, useEffect } from 'react'
import { getTokenFromLocalStorage,  getPayloadFromToken, userIsAuthenticated } from '../../helpers/authHelp'
import axios from 'axios'
import { userNeedsToLogin,getErrorsToastify } from '../../helpers/popUps'

//* Pass in the ID as props from parent component. 
//* will send authentication header to DB
//* Add check to see if user is logged in so they can like! 
//* Will keep current likes = to those on database 

const Likebutton = ({ id }) => {
  const [ ownerId, setOwnerId ] = useState()
  const [totalFavourites, setTotalFavourites] = useState(0)
  //?? check here and change this _
  const [userLikedAlready, setUserLikedAlready] = useState(null)
  
  useEffect(() => {
    refreshFavourites()
    const payload = getPayloadFromToken()
    const currentUserId = payload.sub
    setOwnerId(currentUserId)
    

    const interval = setInterval(refreshFavourites, 100000)
    //?need to return and clear interval instantly to prevent it going nuts
    return () => {
      clearInterval(interval)
    }
  }, [])

  // useEffect(() => {
  //   refreshFavourites()
  // },[userLikedAlready])
  const refreshFavourites = async () => {
    const response = await axios.get(`/api/loops/${id}/`)
    const data = response.data
    const latestTotalFavourites = data.likes.length
    setTotalFavourites(latestTotalFavourites)
    setLikesArray(data.likes)
    checkIfLiked(data.likes)
  }
  
  //__________________________________________________________________________
  // eslint-disable-next-line no-unused-vars
  const [likesArray, setLikesArray] = useState()
  const [likeId, setLikeId] = useState()


  const checkIfLiked = (likesArr) => {
    const areThereLikes = likesArr[0]
    if (!areThereLikes){ 
      setUserLikedAlready(false) 
      return null
    }
    const payload = getPayloadFromToken()
    const ownerId = payload.sub
    
    likesArr.map(like=>{
      if (like.owner.id === ownerId){
        setUserLikedAlready(true)
        setLikeId(like.id)
      } else if (like.owner.id !== ownerId){
        setUserLikedAlready(false)
      }
    })
  } 
  //__________________________________________________________________________

  const handleLike = async () => {
    const token = getTokenFromLocalStorage()
    if (!userIsAuthenticated()){
      userNeedsToLogin('Please login to like!')
      return null
    }

    if (userLikedAlready){
      //* If user has liked do delete
      try {   
        await axios.delete(`/api/like/${likeId}/`, { headers: { Authorization: `Bearer ${token}` } } ) 
        setUserLikedAlready(true)
        refreshFavourites()
      } catch (err) {
        getErrorsToastify(err)
      }
    } else if (!userLikedAlready){
      //* If user hasn't liked do post request
      try {   
        const likeLoadToSend = {
          owner: ownerId,
          loop: id,
        }
        await axios.post(`/api/like/${id}/`, likeLoadToSend, { headers: { Authorization: `Bearer ${token}` } } ) 
        refreshFavourites()

      } catch (err) {
        getErrorsToastify(err)
      }
      
    }
  }



  return (
    <div className='like-btn-and-counter '>
      <div>
        { !userLikedAlready && 
        <button  color='#42c298' onClick={handleLike}>
        🧡
        </button>
        }
       
        { userLikedAlready &&  
        <button onClick={handleLike}  color='red' >
        🖤
        </button>
        }
        
        {totalFavourites}
         
      </div>
    </div>
  )
}

export default Likebutton
