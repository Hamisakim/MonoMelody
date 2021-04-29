import React from 'react'
import '../../styles/main.scss'

const StepsPlayback = ({ steps, currentStepIndex, isPlaying, setIsPlaying, volume, handleVolume }) => {

  if (!steps) return null
  return (
    <div className="box">
      <div className="sequence-wrapper">
        {steps.map((step, index) => {
          return <div key={index} id={index} className={index === currentStepIndex ? 'step-div-active note' : 'step-div-inactive note' }> {index + 1} </div>
        })}
      </div>
      <hr />
      <div className='loop-playback-controlls'>
        <div>
          <button className={isPlaying ? 'button is-danger' : 'button is-success'} onClick={() => setIsPlaying(!isPlaying)} > {isPlaying ? 'STOP' : 'PLAY'}</button>
        </div>
        <div>
          <label>vol(db): {volume}</label>
          <div className="slidecontainer">
            <input type="range" min="-40" max="10" value={volume} onChange={handleVolume} />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default StepsPlayback