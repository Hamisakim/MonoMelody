import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../../styles/main.scss'

import axios from 'axios'
//import { getTokenFromLocalStorage } from '../../helpers/authHelp'

import Sequencer from '../sequencer/Sequencer'
import SequencerPlayback from '../sequencer/SequencerPlayback'
import LoopInfoCard from '../sequencer/LoopInfoCard'
import CommentFeed from '../CommentParts/CommentFeed'
import CommentForm from '../CommentParts/CommentForm'


const LoopShow = () => {
  const [loop, setLoop] = useState(null)

  // * Song State
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(-10)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // * Track State
  const [steps, setSteps] = useState(null)

  // * Effect State
  const [effect, setEffect] = useState('')
  const [effectsArray, setEffectsArray] = useState([])


  const params = useParams()

  useEffect(() => {
    const getLoopData = async () => {
      try {
        const response = await axios.get(`/api/loops/${params.id}`)
        // console.log('response.data ->', response.data)
        setLoop(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getLoopData()
  }, [])

  useEffect(() => {
    if (!loop) return null
    // console.log('loop ->', loop)


    setEffect(loop.effect)
    setEffectsArray(effectsArray)
  }, [loop])

  useEffect(() => {
    setSteps(stepsIntoArray())
    setEffectsArray(effectsIntoArray())
  }, [loop, effect])

  useEffect(() => {

    // console.log('steps ->', steps)
    // console.log('effect ->', effect)
    // console.log('effectArray ->', effectsArray)
  }, [effect])

  const stepsIntoArray = () => {
    if (!loop) return null
    // console.log(loop.steps)
    const stepsArray = loop.steps.split(' ')
    return stepsArray
  }

  const effectsIntoArray = () => {
    if (!loop) return null
    const effectArray = effect.split(' ')
    return effectArray
  }

  const handleVolume = (event) => {
    const currentVolume = parseFloat(event.target.value)
    setVolume(currentVolume)
  }

  if (!loop) return null
  return (
    <div className="loop-wrapper">
      <Sequencer 
        isPlaying={isPlaying}
        bpm={loop.bpm}
        volume={volume}
        steps={steps}
        synth={loop.synth}
        setCurrentStepIndex={setCurrentStepIndex}
        effectsArray={effectsArray}  
      />
      <SequencerPlayback 
        currentStepIndex={currentStepIndex} 
        steps={steps} 
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        handleVolume={handleVolume}
        volume={volume} 
      />
      <LoopInfoCard 
        loop={loop}
      />

      <CommentFeed id={params.id}/>
      <CommentForm id={params.id}/>
    </div> 
  )
}

export default LoopShow