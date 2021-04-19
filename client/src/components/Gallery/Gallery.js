// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MelodySphere from './MelodySphere'
const Gallery = () => {

  const [data, setData] = useState(null)
  //* All current genres in the DB to map out buttons 
  
  const [genres, setGenres] = useState(null)
  //* array of the genre IDs from the genres array.
  
  const [genreFilter, setGenreFilter] = useState([])
  
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/loops/')
      setData(response.data)
    }
  
  
    const getGenres = async () => {
      const response = await axios.get('/api/genres/')
      const dataArray = response.data
      const genreArray = [...genreFilter]
      dataArray.map(item=>{
        genreArray.push(item.id)
      })
      setGenres(dataArray)
      setGenreFilter(genreArray)
    }
    getGenres()
    getData()
  },[])


  const handleGenreSelect = (event) => {
    const genreId =  Number(event.target.value)
    const preventDuplicate = genreFilter.findIndex(e => e === genreId)
    const genreArray = [...genreFilter]
    //*checking if genreId is already in the filter array 
    if (preventDuplicate === -1){
      genreArray.push(genreId)
      setGenreFilter(genreArray)
    } else {
      genreArray.splice(preventDuplicate, 1)
      setGenreFilter(genreArray)
    }
  }





  if (!data) return <div className='load-page'><h1>NO DATA!</h1></div>
  
  return (
    <div className='gallery component'>
      <div className='gallery-filter'>
        { !genres ? null :
        // * maps through genres in db to make buttons
          genres.map(genre=>{
            const randomHexCode  = Math.floor(Math.random() * 16777215).toString(16)
            const buttonBackground = {
              backgroundColor: `#${randomHexCode}`,
            }
            return (
              <button
                style={buttonBackground}
                className='genre-tag-button' 
                key={genre.id} 
                value={genre.id}
                onClick={handleGenreSelect}
              >
                {genre.name}
              </button>
            )
          })}
      </div>
      <div className='sphere-display columns is-multiline'>
        {data.map(item=>{
          const itemGenreId = item.genres[0].id
          const checkIfInFilter = genreFilter.findIndex(e => e === itemGenreId)
          if (checkIfInFilter > -1)
            return (
              <div className='column' key={item.id} >
                <MelodySphere  {...item}/>
              </div>
            )
        })
        }
      </div>
    </div>
  )
}
export default Gallery
