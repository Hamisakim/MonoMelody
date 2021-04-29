import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { userIsAuthenticated } from '../../helpers/authHelp'
//* Todo -change time stamps, show profile pic
//? bonus get user position and set it 

const CommentFeed = ({ id }) => {
  const [commentsArray, setCommentsArray] = useState([])

  useEffect(() => {
    getComments()
    const interval = setInterval(getComments, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const getComments = async () =>{ 
    const response = await axios.get(`/api/loops/${id}/`) 
    const newCommentsArray = response.data.comments
    setCommentsArray(newCommentsArray)
  }
  
  const formattedTimestamp = (timestamp) =>{
    const date = new Date(timestamp)
    const toString = date.toString()
    const dateSlice = toString.slice(4,10)
    const timeSlice = toString.slice(15,21)
    return `${dateSlice} at ${timeSlice}`
  }

  return (
    <div className="box comment-feed" id='comment-feed'>
      <>
        <h1 style={{ fontSize: 20 }}> Whats the chat? </h1>
        { !userIsAuthenticated() &&
        <h1>login to comment</h1>
        }


        <hr />
        {commentsArray.reverse().map(comment => { 
          const  timestamp  = comment.created_at
          return (
            <div key={comment.id} className='user-comment-container'>
              {/* <p>{comment.commentText} - {comment.rating}</p> */}
              <p><span style={{ fontSize: 25 }}>{`"${comment.text}"`}</span> </p>
              <p><Link to={`/profile/${comment.owner.id}`}>
                <span style={{ fontSize: 20, color: '#ff7f08'  }}>{comment.owner.username}  </span>  
              </Link>
                on  {formattedTimestamp(timestamp)}</p>
              <hr/>
            </div>
          )
        })}
      </>
      
    </div>
  )
}

export default CommentFeed
