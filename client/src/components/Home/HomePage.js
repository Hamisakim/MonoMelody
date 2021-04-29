/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react'
import { Link } from 'react-router-dom'
import './homepage.scss'
import Typing from 'react-typing-animation'
import ParticlesBg from '../particles/ParticlesBg'

const HomePage = () => {

  return (
    <>
      <div className="homepage-wrapper">
        

        <div className="hero">

          <Typing>
            <Typing.Delay ms={1000} />
            <h1> Welcome to Mono_<span className="hero-bold-text">Melody<span id="orange-dot">.</span></span></h1>
            <Typing.Delay ms={500} />
            <Typing.Speed ms={25} />
            <p className="hero-text">monoMelody is a music minded social media platform. Use our bespoke sequencer to craft your own melodies and share them for others to enjoy.</p>
            <Typing.Delay ms={250} />
            <Typing.Speed ms={100} />
            <Link to="/create" className="home-button">Create</Link>
          </Typing>
          
        </div>
        <ParticlesBg />
      </div>
    </>
  )
}

export default HomePage
