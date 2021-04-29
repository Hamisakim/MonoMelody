import React from 'react'
import '../../styles/keyboard.scss'

const Keyboard = ({ notes, handleKeyboardKeyPress }) => {
  
  return (
    <div className="box keyboard-wrapper">
      <div className="keys-row">
        {notes.map((note) => {
          return  <button 
            key={note} 
            value={note} 
            className="key" 
            onClick={handleKeyboardKeyPress}
          >{note}</button>
        })}
      </div>
    </div>
  )
}

export default Keyboard
