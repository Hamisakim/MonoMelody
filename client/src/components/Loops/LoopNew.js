/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import '../../styles/main.scss'

import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helpers/authHelp'

import Sequencer from '../sequencer/Sequencer'
import { toastifyPopUp, getErrorsToastify, userNeedsToLogin } from '../../helpers/popUps'
import SequencerControls from '../sequencer/SequencerControls'
import Keyboard from '../sequencer/Keyboard'
import StepsDisplay from '../sequencer/StepsDisplay'

import ParticlesBg from '../particles/ParticlesBg'


const LoopNew = () => {
  // * Song State
  const [isPlaying, setIsPlaying] = useState(false)
  const [bpm, setBpm] = useState(120)
  const [volume, setVolume] = useState(-10)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // * Track State
  const [steps, setSteps] = useState([])
  const [scale, setScale] = useState('phrygian')
  const [key, setKey] = useState('d')
  // * Instrument State
  const [synth, setSynth] = useState('synth')
  const [notes, setNotes] = useState([])

  // * Effect State
  const [effect, setEffect] = useState([])
  const [effectsArray, setEffectsArray] = useState([])

  // * Form State
  const [loopTitle, setLoopTitle] = useState('')
  const [genres, setGenres] = useState([])
  const [genresArray, setGenresArray] = useState([])
  const [genresDb, setGenresDb] = useState([])

  const [formData, setFormData] = useState({
    title: loopTitle,
    bpm: bpm,
    steps: steps,
    synth: synth,
    genres: genresArray,
    scale: scale,
    effect: effectsArray.join(' '),
    key: key,
  })

  // * Global Variables

  let notesArray = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4']

  const synthOptions = [
    { value: 'duoSynth', label: 'duoSynth' },
    { value: 'fmSynth', label: 'fmSynth' },
    { value: 'membraneSynth', label: 'membraneSynth' },
    { value: 'pluckSynth', label: 'pluckSynth' }, 
    { value: 'synth', label: 'synth' }
  ]
  
  const scaleOptions = [
    { value: 'major', label: 'major' },
    { value: 'minor', label: 'minor' },
    { value: 'dorian', label: 'dorian' },
    { value: 'phrygian', label: 'phrygian' }, 
    { value: 'lydian', label: 'lydian' }, 
    { value: 'mixolydian', label: 'mixolydian' }, 
    { value: 'locrian' , label: 'locrian' }
  ]

  const effectOptions = [
    { value: 'autoFilter', label: 'autoFilter' },
    { value: 'autoWah', label: 'autoWah' },
    { value: 'bitCrusher', label: 'bitCrusher' }, 
    { value: 'distortion', label: 'distortion' }, 
    { value: 'feedbackDelay', label: 'feedbackDelay' }, 
    { value: 'freeverb' , label: 'freeverb'  }
  ]

  const createGenreOptions = () => {
    const genreOptionsArray = []
    genresDb.map(genre => {
      const genreOptionTemplate = { value: genre.id, label: genre.name }
      return genreOptionsArray.push(genreOptionTemplate)
    })
    return genreOptionsArray
  }
  
  const genreOptions = [ ...createGenreOptions() ]

  const keyOptions = [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' },
    { value: 'd', label: 'D' }
    // { value: 'e', label: 'E' },
    // { value: 'f', label: 'F' },
    // { value: 'g', label: 'G' }
  ]

  const history = useHistory()

  useEffect(() => {
    console.log('SCALE', scale)
    if (key === 'a') {

      // setKey('a')

      if (scale === 'major') {
        notesArray = ['A2', 'B2', 'C#3', 'D3', 'E3', 'F#3', 'G#3', 'A3']
        setNotes(['A2', 'B2', 'C#3', 'D3', 'E3', 'F#3', 'G#3', 'A3'])
      }
  
      if (scale === 'minor') {
        notesArray = ['A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3']
        setNotes(['A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3'])
      }
  
      if (scale === 'dorian') {
        notesArray = ['A2', 'B2', 'C3', 'D3', 'E3', 'F#3', 'G3', 'A3']
        setNotes(['A2', 'B2', 'C3', 'D3', 'E3', 'F#3', 'G3', 'A3'])
      }
  
      if (scale === 'phrygian') {
        notesArray = ['A2', 'Bb2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3']
        setNotes(['A2', 'Bb2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3'])
      }
  
      if (scale === 'lydian') {
        notesArray = ['A2', 'B2', 'C#3', 'D#3', 'E3', 'F#3', 'G#3', 'A3']
        setNotes(['A2', 'B2', 'C#3', 'D#3', 'E3', 'F#3', 'G#3', 'A3'])
      }
  
      if (scale === 'mixolydian') {
        notesArray = ['A2', 'B2', 'C#3', 'D3', 'E3', 'F#3', 'G3', 'A3']
        setNotes(['A2', 'B2', 'C#3', 'D3', 'E3', 'F#3', 'G3', 'A3'])
      }
  
      if (scale === 'locrian') {
        notesArray = ['A2', 'Bb2', 'C3', 'D3', 'Eb3', 'F3', 'G3', 'A3']
        setNotes(['A2', 'Bb2', 'C3', 'D3', 'Eb3', 'F3', 'G3', 'A3'])
      }
    }


    if (key === 'b') {

      // setKey('b')

      if (scale === 'major') {
        notesArray = ['B2', 'C#3', 'D#3', 'E3', 'F#3', 'G#3', 'A#3', 'B3']
        setNotes(['B2', 'C#3', 'D#3', 'E3', 'F#3', 'G#3', 'A#3', 'B3'])
      }
  
      if (scale === 'minor') {
        notesArray = ['B2', 'C#3', 'D3', 'E3', 'F#3', 'G3', 'A3', 'B3']
        setNotes(['B2', 'C#3', 'D3', 'E3', 'F#3', 'G3', 'A3', 'B3'])
      }
  
      if (scale === 'dorian') {
        notesArray = ['B2', 'C#3', 'D3', 'E3', 'F#3', 'G#3', 'A3', 'B3']
        setNotes(['B2', 'C#3', 'D3', 'E3', 'F#3', 'G#3', 'A3', 'B3'])
      }
  
      if (scale === 'phrygian') {
        notesArray = ['B2', 'C3', 'D3', 'E3', 'F#3', 'G3', 'A3', 'B3']
        setNotes(['B2', 'C3', 'D3', 'E3', 'F#3', 'G3', 'A3', 'B3'])
      }
  
      if (scale === 'lydian') {
        notesArray = ['B2', 'C#3', 'D#3', 'E#3', 'F#3', 'G#3', 'A#3', 'B3']
        setNotes(['B2', 'C#3', 'D#3', 'E#3', 'F#3', 'G#3', 'A#3', 'B3'])
      }
  
      if (scale === 'mixolydian') {
        notesArray = ['B2', 'C#3', 'D#3', 'E3', 'F#3', 'G#3', 'A3', 'B3']
        setNotes(['B2', 'C#3', 'D#3', 'E3', 'F#3', 'G#3', 'A3', 'B3'])
      }
  
      if (scale === 'locrian') {
        notesArray = ['B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3']
        setNotes(['B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3'])
      }
    }

    if (key === 'c') {
      // setKey('c')

      if (scale === 'major') {
        notesArray = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4']
        setNotes(['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4'])
      }
  
      if (scale === 'minor') {
        notesArray = ['C3', 'D3', 'Eb3', 'F3', 'G3', 'Ab3', 'Bb3', 'C4']
        setNotes(['C3', 'D3', 'Eb3', 'F3', 'G3', 'Ab3', 'Bb3', 'C4'])
      }
  
      if (scale === 'dorian') {
        notesArray = ['C3', 'D3', 'Eb3', 'F3', 'G3', 'A3', 'Bb3', 'C4']
        setNotes(['C3', 'D3', 'Eb3', 'F3', 'G3', 'A3', 'Bb3', 'C4'])
      }
  
      if (scale === 'phrygian') {
        notesArray = ['C3', 'Db3', 'Eb3', 'F3', 'G3', 'Ab3', 'Bb3', 'C4']
        setNotes(['C3', 'Db3', 'Eb3', 'F3', 'G3', 'Ab3', 'Bb3', 'C4'])
      }
  
      if (scale === 'lydian') {
        notesArray = ['C3', 'D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C4']
        setNotes(['C3', 'D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C4'])
      }
  
      if (scale === 'mixolydian') {
        notesArray = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'Bb3', 'C4']
        setNotes(['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'Bb3', 'C4'])
      }
  
      if (scale === 'locrian') {
        notesArray = ['C3', 'Db3', 'Eb3', 'F3', 'Gb3', 'Ab3', 'Bb3', 'C4']
        setNotes(['C3', 'Db3', 'Eb3', 'F3', 'Gb3', 'Ab3', 'Bb3', 'C4'])
      }  
    }

    if (key === 'd') {

      // setKey('d')

      if (scale === 'major') {
        notesArray = ['D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C#4', 'D4']
        setNotes(['D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C#4', 'D4'])
      }
  
      if (scale === 'minor') {
        notesArray = ['D3', 'E3', 'F3', 'G3', 'A3', 'Bb3', 'C4', 'D4']
        setNotes(['D3', 'E3', 'F3', 'G3', 'A3', 'Bb3', 'C4', 'D4'])
      }
  
      if (scale === 'dorian') {
        notesArray = ['D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4']
        setNotes(['D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4'])
      }
  
      if (scale === 'phrygian') {
        notesArray = ['D3', 'Eb3', 'F3', 'G3', 'A3', 'Bb3', 'C4', 'D4']
        setNotes(['D3', 'Eb3', 'F3', 'G3', 'A3', 'Bb3', 'C4', 'D4'])
      }
  
      if (scale === 'lydian') {
        notesArray = ['D3', 'E3', 'F#3', 'G#3', 'A3', 'B3', 'C#4', 'D4']
        setNotes(['D3', 'E3', 'F#3', 'G#3', 'A3', 'B3', 'C#4', 'D4'])
      }
  
      if (scale === 'mixolydian') {
        notesArray = ['D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C4', 'D4']
        setNotes(['D3', 'E3', 'F#3', 'G3', 'A3', 'B3', 'C4', 'D4'])
      }
  
      if (scale === 'locrian') {
        notesArray = ['D3', 'Eb3', 'F3', 'G3', 'Ab3', 'Bb3', 'C4', 'D4']
        setNotes(['D3', 'Eb3', 'F3', 'G3', 'Ab3', 'Bb3', 'C4', 'D4'])
      }  
    }
    handleResetSteps()
    return notesArray
  }, [key, scale])



  useEffect(() => {
    if ( !getTokenFromLocalStorage()){
      userNeedsToLogin('Please login to save')
    }

    const getGenres = async() => {
      const response = await axios.get('/api/genres/')
      setGenresDb(response.data)
    }
    getGenres()
  }, [])

  useEffect(() => {
    createGenreOptions()
  }, [genresDb])

  useEffect(() => {
    // setSteps([])
    // setVolume(-10)
    setLoopTitle('')
  }, []) 

  useEffect(() => {
    const newFormData = {
      ...formData,
      title: loopTitle,
    }
    setFormData(newFormData)
  }, [loopTitle])

  useEffect(() => {
    const newFormData = {
      ...formData,
      steps: steps,
    }
    setFormData(newFormData)
  }, [steps])

  useEffect(() => {
    const newFormData = {
      ...formData,
      bpm: bpm,
    }
    setFormData(newFormData)
  }, [bpm])

  useEffect(() => {
    const newFormData = {
      ...formData,
      synth: synth,
    }
    setFormData(newFormData)
  }, [synth])

  useEffect(() => {
    const newFormData = {
      ...formData,
      genres: genresArray,
    }
    setFormData(newFormData)
  }, [genresArray])

  useEffect(() => {
    const newFormData = {
      ...formData,
      scale: scale,
    }
    setFormData(newFormData)
  }, [scale])

  useEffect(() => {
    const newFormData = {
      ...formData,
      key: key,
    }
    setFormData(newFormData)
  }, [key])

  useEffect(() => {
    const newFormData = {
      ...formData,
      effect: effectsArray.join(' '),
    }
    setFormData(newFormData)
  }, [effectsArray])

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSave =  async () => {
    const stringSteps = steps.join(' ')
    const formToSend = { ...formData, steps: stringSteps }
    console.log('formToSend-> ', formToSend)
    try {
      await axios.post('/api/loops/', formToSend, { headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}`, 'Content-Type': 'application/json' } })
      toastifyPopUp(true,'Save successful!')
      history.push('/gallery')
    } catch (err) {
      toastifyPopUp(false,'Could not save!')
      getErrorsToastify(err)


    }
  }

  const handleKeyboardKeyPress = (event) => { 
    const newSteps = [...steps, event.target.value]
    if (newSteps.length <= 8) {
      // setIsPlaying(false) 
      setSteps(newSteps)
    }
  } 

  const handleBpm = (event) => {
    const currentBpm = Number(event.target.value)
    setBpm(currentBpm)
  }

  const handleVolume = (event) => {
    const currentVolume = parseFloat(event.target.value)
    setVolume(currentVolume)
  }

  const handleSynthType = (synthOptions) => {
    const currentSynth = synthOptions.value
    setSynth(currentSynth)
  }

  const handleGenreSelect = (genreOptions) => {
    const genreValuesArray = []
    genreOptions.map(option => {
      genreValuesArray.push(option.value)
    })
    setGenres(genreOptions)
    setGenresArray(genreValuesArray)
  }

  const handleEffectType = (effectOptions) => {
    const effectValuesArray = []
    effectOptions.map(option => {
      effectValuesArray.push(option.value)
    })

    setEffect(effectOptions)
    setEffectsArray(effectValuesArray) 
  }

  const handleScaleType = (scaleOptions) => {
    const currentScale =  scaleOptions.value
    console.log('currentScale ->', currentScale)
    setScale(currentScale)
    // handleResetSteps()
  }

  const handleKey = (keyOptions) => {
    const currentKey =  keyOptions.value
    console.log('currentKey->', currentKey)
    setKey(currentKey)
    // handleResetSteps()
  }

  const handleResetSteps = () => {
    setSteps([])
    setIsPlaying(false)
  }

  if (!steps) return null
  return (
    <div className="loop-wrapper">
      <Sequencer 
        isPlaying={isPlaying}
        bpm={bpm}
        volume={volume}
        steps={steps}
        synth={synth}
        setCurrentStepIndex={setCurrentStepIndex}
        effectsArray={effectsArray}  
      />
      <SequencerControls 
        handleBpm={handleBpm}
        handleVolume={handleVolume}
        handleSynthType={handleSynthType}
        handleScaleType={handleScaleType}
        handleEffectType={handleEffectType}
        synth={synth}
        scale={scale}
        effect={effect}
        bpm={bpm}
        volume={volume}
        loopKey={key}
        genres={genres}
        formData={formData}
        scaleOptions={scaleOptions}
        synthOptions={synthOptions}
        effectOptions={effectOptions}
        keyOptions={keyOptions}
        handleChange={handleChange}
        genreOptions={genreOptions}
        handleGenreSelect={handleGenreSelect}
        handleSave={handleSave}
        handleKey={handleKey}
      />
      <Keyboard 
        notes={notes} 
        handleKeyboardKeyPress={handleKeyboardKeyPress} 
      />
      <StepsDisplay 
        currentStepIndex={currentStepIndex} 
        steps={steps} 
        handleResetSteps={handleResetSteps} 
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying} 
      />
      <ParticlesBg />
    </div>
  )
}

export default LoopNew
