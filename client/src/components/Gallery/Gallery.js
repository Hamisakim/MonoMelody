import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MelodySphere from './MelodySphere'
import './gallery.scss'

// import ParticlesBg from '../particles/ParticlesBg'

const Gallery = () => {
  const [data, setData] = useState(null)
  const [genres, setGenres] = useState(null)
  const [genreFilter, setGenreFilter] = useState(null) //should be ids to check 
  //____________________________________________________________________
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('/api/loops/')
      setData(response.data)
    }
    const getGenres = async () => {
      const response = await axios.get('/api/genres/')
      const dataArray = response.data
      const arrayOfGenreNames = []
      const arrayOfGenreId = []
      dataArray.map(genre =>{
        arrayOfGenreNames.push(genre.name)
        arrayOfGenreId.push(genre.id)
      })
      setGenres(response.data)
    }
    getData()
    getGenres()
  },[])
  //____________________________________________________________________
  const handleGenreSelect = (event) => {
    const genreId =  Number(event.target.value)
    let genreArray = []
    !genreFilter ? genreArray = [] :
      genreArray = [...genreFilter]
    const preventDuplicate = genreArray.findIndex(e => e === genreId)
    if (preventDuplicate === -1){
      genreArray.push(genreId)
      setGenreFilter(genreArray)
    } else {
      genreArray.splice(preventDuplicate, 1)
      setGenreFilter(genreArray)
    }
  }  
  const handleFilterReset = () => {
    setGenreFilter(null)
  }
  //____________________________________________________________________
  
  if (!data || !genres) return <div className='load-page'><h1>NO DATA!</h1></div>
  return ( 
    <>
      <div className='gallery component'>
        <div className='gallery-wrapper'>     
          <div className='container'>
            <button className='reset-filter-btn' onClick={handleFilterReset}>
                Reset Filter</button>

          </div>
          <div className='gallery-filter'> 
  
            { 
              genres.map(genre=>{ 
                const selectedFilter = {
                  backgroundColor: 'transparent',
                  color: '#ff7f08',
                  borderColor: '#ff7f08',
                  zIndex: 100,

                }
                const notSelected = {
                  backgroundColor: 'transparent',
                  color: 'white',
                  borderColor: 'white',
                  zIndex: 100,
              
                }
                let style = notSelected
                //if genre.id is in the filter array then change color 
                if (!genreFilter){
                  style = notSelected
                } else if (genreFilter.findIndex(e => e === genre.id) > -1 ){
                  style = selectedFilter
                }
                return (
                  <button
                  // style={buttonBackground}
                    className='genre-tag-button' 
                    key={genre.id} 
                    value={genre.id}
                    style={style}
                    onClick={() => {
                      handleGenreSelect(event)
                    }} 
                  >
                    {genre.name}
                  </button>
                )
              })
            }
          </div>
          <div className='sphere-display columns is-multiline'
              
            style={{ zIndex: 100 }}
          >
            { !genreFilter &&
        data.map(item=>{
          return (
            <div className='column' key={item.id} >
              <MelodySphere  {...item}/>
            </div>
          )
        })
            }
            {genreFilter && 
            data.map(item=>{
              // const itemGenreId = item.genres[0].id //!first genre id
              const genreIdsToCheck = []
              const allGenresArray = item.genres
              allGenresArray.map(genre=>{
                genreIdsToCheck.push(genre.id)
              })
              const checkIfFilterMatchesGenre = () => {
                const checkIfInFilter = (id) => {
                  return genreFilter.findIndex(e => e === id)
                }
                for (let i = 0; i < genreIdsToCheck.length; i++){
                  const result = checkIfInFilter(genreIdsToCheck[i])
                  if ( result > -1) return true
                }
                return false
              }
              if (checkIfFilterMatchesGenre())
                return (
                  <div className='column' key={item.id}  style={{ zIndex: 100 }}>
                    <MelodySphere  {...item} genreId={genreIdsToCheck}/>
                  </div>
                )
            })
            }
          </div>
        </div>

      </div>
      {/* <ParticlesBg /> */}

    </>
  )
}
export default Gallery