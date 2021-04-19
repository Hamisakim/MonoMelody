import React from 'react'
import Select from 'react-select'
import '../../styles/main.scss'

import { userIsAuthenticated } from '../../helpers/authHelp'

const SequencerControls = ({ loopKey, synth, effect, scale, bpm, volume, handleBpm, handleVolume, handleSynthType, handleScaleType, scaleOptions, synthOptions, effectOptions, handleEffectType, handleChange, formData, genreOptions, handleGenreSelect, genres, handleSave, keyOptions, handleKey }) => {

  return (
    <div className="box">
      <form className="synth-controls-wrapper">
        <div className="synth-controls-col">
          <div>
            <label>vol(db): {volume}</label>
            <div className="slidecontainer">
              <input type="range" min="-40" max="10" value={volume} onChange={handleVolume} />
            </div>
          </div>
          <div>
            <label>bpm: {bpm}</label>
            <div className="slidecontainer">
              <input type="range" min="30" max="280" value={bpm} onChange={handleBpm} />
            </div>
          </div>
        </div>
        <div className="synth-controls-col">
          <div>
            <label>synth:</label>
            <Select
              className='react-select-container'
              defaultValue={synth}
              name="synth"
              options={synthOptions}
              onChange={handleSynthType}
              value={synth}
              placeholder={synth}
            />
          </div>
          <div>
            <label>effect:</label>
            <Select
              className='react-select-container'
              defaultValue={effect}
              name="effect"
              options={effectOptions}
              onChange={handleEffectType}
              value={effect}
              placeholder={effect}
            />
          </div>
        </div>
        <div className="synth-controls-col">
          <div>
            <label>scale:</label>
            <Select
              className='react-select-container'
              defaultValue={scale}
              name="scale"
              options={scaleOptions}
              onChange={handleScaleType}
              value={scale}
              placeholder={scale}
            />
          </div>
          <div>
            <label>key:</label>
            <Select
              className='react-select-container'
              defaultValue={loopKey}
              name="key"
              options={keyOptions}
              onChange={handleKey}
              value={loopKey}
              placeholder={loopKey}
            />
          </div>
        </div>
      </form>
      { userIsAuthenticated() &&
        <>
          <form>
            <input 
              className='input'
              placeholder="title"
              name="title"
              onChange={handleChange}
              value={formData.title}
            />
            <Select
              defaultValue={[genreOptions[0], genreOptions[2]]}
              isMulti
              name="genres"
              options={genreOptions}
              className="basic-multi-select genre"
              classNamePrefix="select"
              onChange={handleGenreSelect}
              value={genres}
            />
          </form>
          <button className="button" onClick={handleSave}>SAVE</button>
        </>
      }

    </div>
  )
}

export default SequencerControls
