import React, { useState, useEffect } from 'react'
import { Song, Track, Instrument } from 'reactronica'
import '../../styles/main.scss'

import SequencerControls from './SequencerControls'
import axios from 'axios'
const SequencerTest = () => {

  // eslint-disable-next-line no-unused-vars

  // * Song State
  const [isPlaying, setIsPlaying] = useState(false)
  const [bpm, setBpm] = useState(120)
  const [volume, setVolume] = useState(100)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // * Track State
  const [steps, setSteps] = useState(null)

  // * Instrument State
  const [synth, setSynth] = useState('monoSynth')
  const [attack, setAttack] = useState(20)
  const [sustain, setSustain] = useState(20)
  const [decay, setDecay] = useState(20)
  const [release, setRelease] = useState(20)
  const [synthList, setSynthList] = useState([])
  const [notes, setNotes] = useState([])

  // * Instrument Variables
  const synthListArray = ['amSynth', 'duoSynth', 'fmSynth', 'membraneSynth', 'metalSynth', 'monoSynth', 'pluckSynth', 'synth']
  const notesArray = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4']

  // * Form State
  const [loopTitle, setLoopTitle] = useState('')
  const [genre, setGenre] = useState([])
  const [formData, setFormData] = useState({
    title: loopTitle,
    // synth: '',
    // envelope: {},
    loop_data: {
      steps: steps,
      bpm: bpm,
      volume: volume,
      synth: synth,
      attack: attack,
      sustain: sustain,
      decay: decay,
      release: release,
    },
    genres: genre,
  })

  // const handleLoad = () => {} // load loop from saved/other user etc..

  useEffect(() => {
    setSteps(['C3'])
    setBpm(120)
    setVolume(-5)
    setSynthList(synthListArray)
    setNotes(notesArray)

    setLoopTitle('test frontend loop')
    setGenre(4)
  }, []) 

  //*Updates formData when any options change
  useEffect(() => {
    const newFormData = {
      title: loopTitle,
      loop_data: {
        steps: steps,
        bpm: bpm,
        volume: volume,
        synth: synth,
        attack: attack,
        sustain: sustain,
        decay: decay,
        release: release,
      },
      genre: genre,
    }
    setFormData(newFormData)
    console.log('FORM DATA ->>',formData)

  }, [bpm,volume,steps,currentStepIndex,synth,attack,sustain,decay,release,synthList,notes])

  const handleKeyboardKeyPress = (event) => { // handles when a note is clicked to add 
    const newSteps = [...steps, event.target.value] 
    console.log('🐝 ~ file: SequencerTest.js ~ line 98 ~ newSteps', newSteps)
    setIsPlaying(false)
    setSteps(newSteps)
    // ! play note of button value
  } 

  const handleBpm = (event) => {
    const currentBpm = Number(event.target.value)
    setBpm(currentBpm)
  }

  const handleVolume = (event) => {
    const currentVolume = parseFloat(event.target.value)
    setVolume(currentVolume)
  }

  const handleSynthType = (event) => {
    const currentSynth = event.target.value
    setSynth(currentSynth)
  }

  // eslint-disable-next-line no-unused-vars
  const handleAttack = (event) => {
    const currentAttack = event.target.value
    setAttack(parseFloat(currentAttack))
  }

  // eslint-disable-next-line no-unused-vars
  const handleSustain = (event) => {  
    const currentSustain = event.target.value
    setSustain(parseFloat(currentSustain))
  }

  // eslint-disable-next-line no-unused-vars
  const handleDecay = (event) => {
    const currentDecay = event.target.value
    setDecay(parseFloat(currentDecay))
  }

  // eslint-disable-next-line no-unused-vars
  const handleRelease = (event) => {
    const currentRelease = event.target.value
    setRelease(parseFloat(currentRelease))
  }

  // have form for title  
  const handleSave =  async () => {
    const formDataToSend =  formData 
    const loopData = JSON.stringify(formDataToSend.loop_data)
    const { steps, bpm , volume, synth,attack, sustain, decay } = formDataToSend.loop_data
    console.log('🐝 ~ file: SequencerTest.js ~ line 139 ~ steps', steps)
    const stringData = `
    "steps": "${steps}","bpm": ${bpm},
    "volume": ${volume},
    "synth": "${synth}",
    "attack": ${attack},
    "sustain": ${sustain},
    "decay": ${decay},
    "release": ${release}`
    
    console.log('🐝 ~ file: SequencerTest.js ~ line 140 ~ stringData', stringData)
    
    
    //const loopDataString = `" ${loopData} "`
    //const stringLoopData = JSON.stringify(loopData)
    console.log('loopdata ->', loopData )
    const formatedFormData = { ...formDataToSend, loop_data: stringData }
    const JSONFormData = formatedFormData
    console.log('🐝 ~ file: SequencerTest.js ~ line 138 ~ JSONFormdata', JSONFormData)
    // console.log('🐝 ~ file: SequencerTest.js ~ line 32 ~ formDataToSend', formDataToSend)
  
    // const testLoad = {
    //   'title': 'TEST FRONT 22',
    //   'loop_data': 'fefefefefef',
    //   'genres': [2],
    // }
  
  
    //need to stringinfy just loop_data
    // console.log('stringified ->', JSON.stringify(formDataToSend.loop_data))
    // console.log('testobject', { ...formDataToSend, loop_data: JSON.stringify(formDataToSend.loop_data) })
    // console.log('formDataToSend', formDataToSend)
  
    try {
      // await axios.post('/api/loops/', formData)
      await axios.post('/api/loops/', JSONFormData, { headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImV4cCI6MTYxOTEwMTkxMX0.kidR-O1H_Ox1AdtYRbFRdwGutGeSMcQs8Lb-oPo7yv4' } })
    } catch (err) {
      console.log('🔴  Error sending loop',err)
    }
    // setFormData(formDataToSend)
  }

  // const [envelope, setEnvelope] = useState({ 
  //   attack: attack, 
  //   decay: decay, 
  //   sustain: sustain, 
  //   release: release })
  // console.log('🐝 ~ file: App.js ~ line 88 ~ envelope', envelope)

  // eslint-disable-next-line no-unused-vars
  // const handleEnvelopeChange = (event) => {
  //   const updatedEnvelope = { ...envelope, [event.target.name]: parseFloat(event.target.value) }
  //   setEnvelope(updatedEnvelope)
  //   console.log('🐝 ~ file: App.js ~ line 97 ~ updatedEnvelope', updatedEnvelope)
  // }



  if (!steps) return null
  const listStyle = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
  }

  return (
    <div className="keyboard-wrapper">
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
            envelope={{ attack: attack, decay: decay, sustain: sustain, release: release }}
          />
          {/* <Effect type="feedbackDelay" />
          <Effect type="distortion" /> */}
        </Track>
      </Song>
      <SequencerControls 
        handleBpm={handleBpm}
        handleVolume={handleVolume}
        handleSynthType={handleSynthType}
        handleAttack={handleAttack}
        handleSustain={handleSustain}
        handleDecay={handleDecay}
        handleRelease={handleRelease}
        bpm={bpm}
        volume={volume}
        synthList={synthList}
        attack={attack}
        sustain={sustain}
        decay={decay}
        release={release}
      />
      <div className="note-sequence" style={{
        fontSize: '50px',
      }}>
        <ol style={listStyle}>
          {steps.map((step, index) => {
            return <li key={index} id={index} style={index === currentStepIndex ? { color: 'green' } : { color: 'black' } } className={index === currentStepIndex ? 'note-playing' : 'note-off'}> {step} </li>
          })}
        </ol>
      </div>
      <div className="keys-row">
        {notes.map(note => {
          return  <button key={note} value={note} className="key" onClick={handleKeyboardKeyPress}>{note}</button>
        })}
      </div>
      <hr />
      <button
        style={{
          fontSize: '2rem',
        }}
        onClick={() => {
          setIsPlaying(!isPlaying)
        }}
      >
        {isPlaying ? 'Stop sound' : 'Play sound'}
      </button>

      <button onClick={handleSave}>
        SAVE
      </button>


    </div>
  )
}
export default SequencerTest