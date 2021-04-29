import React from 'react'
import '../../styles/main.scss'

const StepsDisplay = ({ steps, currentStepIndex, isPlaying, setIsPlaying, handleResetSteps }) => {

  if (!steps) return null
  return (
    <div className="box">
      <div className="sequence-wrapper">
        {steps.map((step, index) => {
          return <div key={index} id={index} className={index === currentStepIndex ? 'step-div-active note' : 'step-div-inactive note' }> {index + 1} </div>
        })}
      </div>
      <hr />
      <div>
        <button className={isPlaying ? 'button is-danger' : 'button is-success'} onClick={() => setIsPlaying(!isPlaying)} > {isPlaying ? 'STOP' : 'PLAY'}</button>
        <button className="button is-warning"  onClick={handleResetSteps}>RESET</button> 
      </div>
    </div>
  )
}

export default StepsDisplay
