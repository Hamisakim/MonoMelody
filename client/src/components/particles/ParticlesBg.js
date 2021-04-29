import React from 'react'
import '../../styles/main.scss'
import Particles from 'react-particles-js'

const ParticlesBg = () => {
  
  return (
    <Particles
      className="particles-wrapper"
      params={{
        'particles': {
          'number': {
            'value': 20,
            'density': {
              'enable': true,
            },
          },
          'color': {
            'value': '#ff7f08',
          },
          'size': {
            'value': 20,
            'random': true,
            'anim': {
              'speed': 3,
              'size_min': 0.3,
            },
          },
          'line_linked': {
            'enable': true,
            'opacity': 0.1,
            'distance': 280,
          },
          'move': {
            'random': true,
            'speed': 0.6,
            'direction': 'top',
            'out_mode': 'out',
          },
        },
        'interactivity': {
          'events': {
            'onhover': {
              'enable': true,
              'mode': 'bubble',
            },
            'onclick': { //! need to do something here 
              'enable': true,
              'mode': 'repulse',
            },
          },
          'modes': {
            'bubble': {
              'distance': 250,
              'duration': 2,
              'size': 0,
              'opacity': 0.1,
            },
            'repulse': {
              'distance': 300,
              'duration': 4,
            },
          },
        },
      }} />
  )
}

export default ParticlesBg
