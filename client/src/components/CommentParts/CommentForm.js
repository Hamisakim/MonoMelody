import React, { useState } from 'react'
import axios from 'axios'
import { getTokenFromLocalStorage,userIsAuthenticated } from '../../helpers/authHelp'
import { commentPopup,  userNeedsToLogin,getErrorsToastify } from '../../helpers/popUps'
import LikeButton from '../LikeButton/LikeButton'
//* need to find way to prevent adding a comment from adding a rating too
// ? comment clears field on submit


const CommentForm = ({ id }) => {
  const [userComment, setUserComment] = useState({
    text: '',
    loop: id,
  })
  
  const [isThereComment, setIsThereComment] = useState(null)



  const handleCommentChange = (event) => {
    //?get the value of what's being typed in the form and updating state
    const newUserComment = { ...userComment, [event.target.name]: event.target.value }
    // console.log('🐝 ~ file: Login.js ~ line 25 ~ event', event)
    setUserComment(newUserComment)
  }


  const handleCommentPost = async(event) => {
    event.preventDefault()
    const isThereComment = !!userComment.commentText
    if (!userIsAuthenticated()) {
      userNeedsToLogin('Please login to review and comment!☺️')
    }
    if (!isThereComment) {
      setIsThereComment(false)
      console.log('NO COMMENT')
      commentPopup(0)
      return null
    } 
    try {
      const commentToAdd = { ...userComment }
      await axios.post('/api/comments/', commentToAdd, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } } )
      console.log('🐝 ~ file: CommentForm.js ~ line 23 ~ commentToAdd', commentToAdd)
      commentPopup(true)
      setUserComment({ commentText: '' })
    } catch (err) {
      getErrorsToastify(err)
      console.log('🔴 ~ file: CommentForm.js ~ line 24 ~ err', err)
    }
  }



  return (
    <div className="box">
      <form className='comment-form'>
        {!isThereComment && 
        <input
          className={`input ${!isThereComment ? 'is-danger' : ''}`}
          // className={classToAdd}
          placeholder="leave comment"
          onChange={handleCommentChange}
          name="text"
          value={userComment.text}
        />
        }
        <div className='btn-container'>
          <button href='#comment-feed' className="button comment-btn box hover-box" onClick={handleCommentPost}>Comment</button>
        </div>
      </form>
      <LikeButton id={id} />


    </div>
  )
}

export default CommentForm
