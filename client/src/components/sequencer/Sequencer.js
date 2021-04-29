import React from 'react'
import { Song, Track, Instrument, Effect } from 'reactronica'
import '../../styles/main.scss'



const Sequencer = ({ steps, isPlaying, bpm, volume, setCurrentStepIndex, synth, effectsArray }) => {


  if (!steps) return null
  return (
    <div>
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
          {effectsArray.map((effectType, index) => {
            return <Effect key={index} type={effectType} />
          })}
        </Track>
      </Song>
    </div>
  )
}

export default Sequencer