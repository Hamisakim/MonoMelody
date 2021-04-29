/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MelodySphere from './MelodySphere'
import './gallery.scss'

const Gallery = () => {
  const [data, setData] = useState(null)
  const [genres, setGenres] = useState(null)
  const [genreFilter, setGenreFilter] = useState(null)


  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/loops/')
      setData(response.data)
    }
    const getGenres = async () => {
      const response = await axios.get('/api/genres/')
      console.log('🐝 ~ file: Gallery.js ~ line 20 ~ response', response)
    }
    getData()
    getGenres()
  },[])



  if (!data) return <div className='load-page'><h1>NO DATA!</h1></div>

  return ( 
    
    <div className='sphere-display columns is-multiline'>
      {data.map(item=>{
        const itemGenreId = item.genres[0].id
        const checkIfInFilter = genreFilter.findIndex(e => e === itemGenreId)
        if (checkIfInFilter > -1 || genreFilter === null)
          return (
            <div className='column' key={item.id} >
              <MelodySphere  {...item}/>
            </div>
          )
      })
      }
    </div>

  )



}
export default Gallery
