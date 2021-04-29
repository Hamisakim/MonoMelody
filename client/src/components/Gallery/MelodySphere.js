import React from 'react'
import { Link } from 'react-router-dom'
import './sphere.scss'
import Ticker from 'react-ticker'
import LikeButton from '../likebutton/LikeButton'


const MelodySphere = (props) => {
  // console.log('🐝 ~ file: MelodySphere.js ~ line 4 ~ props', props)
  
  // eslint-disable-next-line no-unused-vars
  const { title, likes, id, genres  } = props
  // console.log('🐝 ~ file: MelodySphere.js ~ line 9 ~ genres', genres)
  // console.log('🐝 ~ file: MelodySphere.js ~ line 7 ~ likes', likes)
  const mainGenre = props.genres[0].name
  

  const genreNames = () => {
    const genreNameArray = []
    genres.map(genre=>{
      const genreArray =  Object.values(genre)
      const name = genreArray[1]
      genreNameArray.push(name)
      return name
    })
    return genreNameArray
  }
    
  const nameToMap = genreNames()
  //get genre as array to string 

  console.log('🐝 ~ file: MelodySphere.js ~ line 34 ~ genreNames()', genreNames())

  // const genreAsString = 
  // console.log('🐝 ~ file: MelodySphere.js ~ line 8 ~ genre', genre)
  
  const randomHexCode  = Math.floor(Math.random() * 16777215).toString(16)
  const boxShadowRandomizer = {
    boxShadow: `0 0 30px #${randomHexCode}`,
  }
  
  return (
    <div style={boxShadowRandomizer} className={`sphere bounceInDown ${mainGenre.toLowerCase()} `}>
      <div className='sphere-content'>
        <h1>{title}</h1> 
        <Link to={`/loop/${id}`}>
          <h2 className='sphere-genre'>{mainGenre}</h2>
        </Link>
        <div className='ticker'>
          <Ticker
            // height={50}
            speed={5}
            mode='chain'
          >
            {() => (
              <div className='sphere-ticker'>{nameToMap}</div>
            )}
          </Ticker>
        </div> 
        <LikeButton  id={id}/>
      </div>
    </div>
  )
}

export default MelodySphere
