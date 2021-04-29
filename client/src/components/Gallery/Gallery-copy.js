// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MelodySphere from './MelodySphere'
import './gallery.scss'
const Gallery = () => {

  const [data, setData] = useState(null)
  
  //* All current genres in the DB to map out buttons 
  const [genres, setGenres] = useState(null)
  
  //* array of the genre IDs from the genres array.
  const [genreFilter, setGenreFilter] = useState([])
  console.log('🐝 ~ file: Gallery.js ~ line 15 ~ genreFilter', genreFilter)
  
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/loops/')
      setData(response.data)
    }
  
  
    const getGenres = async () => {
      const response = await axios.get('/api/genres/')
      const dataArray = response.data
      const genreArray = [...genreFilter]
      const genreNames = [...genresNameArray]
      dataArray.map(item=>{
        genreArray.push(item.id)
        genreNames.push(item.name)
      })
      setGenres(dataArray)
      // setGenreFilter(genreArray)
      setGenresNameArray(genreNames)
    }
    getGenres()
    getData()
  },[])


  const handleGenreSelect = (event) => {
    console.log('🐝 ~ file: Gallery.js ~ line 40 ~ event', event)
    // * this will add to the array to map in the show section
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
      setGenresNameArray()
    }
  }

  const [genresNameArray, setGenresNameArray] = useState('')
  console.log('🐝 ~ file: Gallery.js ~ line 56 ~ genresNameArray', genresNameArray)
  const handleGenreNameArray = (name) => {
    console.log('🐝 ~ file: Gallery.js ~ line 57 ~ name', name)
    const arrayToSet = genresNameArray
    console.log('🐝 ~ file: Gallery.js ~ line 60 ~ arrayToSet', arrayToSet)
    setGenresNameArray(arrayToSet)
  }

  if (!data) return <div className='load-page'><h1>NO DATA!</h1></div>
  
  return (
    <div className='gallery component'>

      <div className='chosen-genre-display'>
       
        {genresNameArray.map(e =>{
          console.log('🐝 ~ file: Gallery.js ~ line 68 ~ e ', e )
          return <p key={e} >{e}</p>
        })
        }

      </div>
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
                onClick={() => {
                  handleGenreSelect(event),
                  handleGenreNameArray(genre.name)
                } }
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
