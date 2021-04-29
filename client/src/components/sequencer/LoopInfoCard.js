import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/main.scss'

const LoopInfoCard = ({ loop }) => {
  const formattedGenres = () => {
    const genres = loop.genres
    const genresNameArray = []
    genres.map(genre => {
      genresNameArray.push(genre.name)
    })
    return genresNameArray    
  }



  
  
  return (
    <div className="box">
      <h1 className="title">{loop.title} <Link to={`/profile/${loop.owner.id}`} className="loop-owner-text">({loop.owner.username})</Link></h1>
      <p><strong>key:</strong> <span className="orange-text">{loop.key}</span></p>
      <p><strong>scale:</strong> <span className="orange-text">{loop.scale}</span></p>
      <p><strong>bpm:</strong> <span className="orange-text">{loop.bpm}</span></p>
      <p><strong>synth:</strong> <span className="orange-text">{loop.synth}</span></p>
      <div className="genre-tag-wrapper">
        {formattedGenres().map(tag => {
          return <p key={tag} className="genre-tag-text">{tag}</p>
        })}
      </div>
      
    </div>
  )
}

export default LoopInfoCard
