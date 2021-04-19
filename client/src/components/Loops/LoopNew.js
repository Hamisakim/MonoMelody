import React, { useState, useEffect } from 'react'
import { Song, Track, Instrument, Effect } from 'reactronica'
import '../../styles/main.scss'

import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helpers/authHelp'

import SequencerControls from '../sequencer/SequencerControls'
import Keyboard from '../sequencer/Keyboard'
import StepsDisplay from '../sequencer/StepsDisplay'


const LoopNew = () => {
  // * Song State
  const [isPlaying, setIsPlaying] = useState(false)
  const [bpm, setBpm] = useState(120)
  const [volume, setVolume] = useState(100)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // * Track State
  const [steps, setSteps] = useState(null)
  const [scale, setScale] = useState('phrygian')
  const [key, setKey] = useState('d')
  // * Instrument State
  const [synth, setSynth] = useState('synth')
  const [notes, setNotes] = useState([])

  // * Effect State
  const [effect, setEffect] = useState('freeverb')

  // * Form State
  const [loopTitle, setLoopTitle] = useState('')
  const [genres, setGenres] = useState([])
  const [genresArray, setGenresArray] = useState([])
  const [formData, setFormData] = useState({
    title: loopTitle,
    bpm: bpm,
    steps: steps,
    synth: synth,
    genres: genresArray,
    scale: scale,
    effect: effect,
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
    { value: 'locrian' , label: 'locrian'  }, 
    { value: 'phrygian', label: 'phrygian' }
  ]

  const effectOptions = [
    { value: 'autoFilter', label: 'autoFilter' },
    { value: 'autoPanner', label: 'autoPanner' },
    { value: 'autoWah', label: 'autoWah' },
    { value: 'bitCrusher', label: 'bitCrusher' }, 
    { value: 'distortion', label: 'distortion' }, 
    { value: 'feedbackDelay', label: 'feedbackDelay' }, 
    { value: 'freeverb' , label: 'freeverb'  }, 
    { value: 'panVol', label: 'panVol' },
    { value: 'tremolo', label: 'tremolo' }
  ]

  const genreOptions = [
    { id: '1', value: 1, name: 'Hip-Hop', label: 'Hip-Hop' },
    { id: '2', value: 2, name: 'Rock', label: 'Rock' },
    { id: '3', value: 3, name: 'Pop', label: 'Pop' }
  ]

  const keyOptions = [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' },
    { value: 'd', label: 'D' }
    // { value: 'e', label: 'E' },
    // { value: 'f', label: 'F' },
    // { value: 'g', label: 'G' }
  ]

  useEffect(() => {
    console.log('SCALE', scale)
    if (key === 'a') {

      // setKey('a')

      if (scale === 'major') {
        notesArray = ['A2', 'B2', 'C#3', 'D3', 'E3', 'F#3', 'G#3', 'A4']
        setNotes(['A2', 'B2', 'C#3', 'D3', 'E3', 'F#3', 'G#3', 'A4'])
      }
  
      if (scale === 'minor') {
        notesArray = ['A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A4']
        setNotes(['A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A4'])
      }
  
      if (scale === 'dorian') {
        notesArray = ['A2', 'B2', 'C3', 'D3', 'E3', 'F#3', 'G3', 'A4']
        setNotes(['A2', 'B2', 'C3', 'D3', 'E3', 'F#3', 'G3', 'A4'])
      }
  
      if (scale === 'phrygian') {
        notesArray = ['A2', 'Bb2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A4']
        setNotes(['A2', 'Bb2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A4'])
      }
  
      if (scale === 'lydian') {
        notesArray = ['A2', 'B2', 'C#3', 'D#3', 'E3', 'F#3', 'G#3', 'A4']
        setNotes(['A2', 'B2', 'C#3', 'D#3', 'E3', 'F#3', 'G#3', 'A4'])
      }
  
      if (scale === 'mixolydian') {
        notesArray = ['A2', 'B2', 'C#3', 'D3', 'E3', 'F#3', 'G3', 'A4']
        setNotes(['A2', 'B2', 'C#3', 'D3', 'E3', 'F#3', 'G3', 'A4'])
      }
  
      if (scale === 'locrian') {
        notesArray = ['A2', 'Bb2', 'C3', 'D3', 'Eb3', 'F3', 'G3', 'A4']
        setNotes(['A2', 'Bb2', 'C3', 'D3', 'Eb3', 'F3', 'G3', 'A4'])
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

    return notesArray
    
  // }, [scale, key])
  }, [key, scale])

  // ! FORM BUG
  useEffect(() => {
    setSteps([])
    setVolume(-15)
    // setSynthList(synthListArray)
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
      effect: effect,
    }
    setFormData(newFormData)
  }, [effect])

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
    } catch (err) {
      console.log(err)
    }
  }

  const handleKeyboardKeyPress = (event) => { 
    const newSteps = [...steps, event.target.value]
    if (newSteps.length <= 8) {
      setIsPlaying(false) 
      setSteps(newSteps)
    }
  } 

  useEffect(() => {
    setIsPlaying(!isPlaying)
  }, [steps])

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
    console.log('genreValuesArray ->', genreValuesArray)
    setGenres(genreOptions)
    setGenresArray(genreValuesArray)
  }

  const handleEffectType = (effectOptions) => {
    const currentEffect =  effectOptions.value
    console.log('currentEffect ->', currentEffect)
    setEffect(currentEffect)
  }

  const handleScaleType = (scaleOptions) => {
    const currentScale =  scaleOptions.value
    console.log('currentScale ->', currentScale)
    setScale(currentScale)
  }

  const handleKey = (keyOptions) => {
    const currentKey =  keyOptions.value
    console.log('currentKey->', currentKey)
    setKey(currentKey)
  }

  const handleResetSteps = () => {
    setSteps([])
    setIsPlaying(false)
  }

  if (!steps) return null
  return (
    <div className="loop-wrapper">
      <Song 
        isPlaying={isPlaying}
        bpm={bpm}
        volume={volume}>
        <Track 
          steps={steps}
          onStepPlay={(_stepNotes, index) => {
            setCurrentStepIndex(index)
          }}>
          <Instrument 
            type={synth}
          />
          <Effect type={effect} />
        </Track>
      </Song>
      <hr />

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
        // isPlaying={isPlaying}
        // setIsPlaying={setIsPlaying}
        handleChange={handleChange}
        genreOptions={genreOptions}
        handleGenreSelect={handleGenreSelect}
        handleSave={handleSave}
        // handleResetSteps={handleResetSteps}
        handleKey={handleKey}
      />
      <Keyboard 
        notes={notes} 
        handleKeyboardKeyPress={handleKeyboardKeyPress}
        handleResetSteps={handleResetSteps} 
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying} />
      <StepsDisplay 
        currentStepIndex={currentStepIndex} 
        steps={steps} 
      />
    </div>
  )
}

export default LoopNew