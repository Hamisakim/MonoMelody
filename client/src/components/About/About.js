/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react'
import '../../styles/main.scss'
import ParticlesBg from '../particles/ParticlesBg'
import eric from '../../assets/Eric_Linkedin.jpeg'
import sami from '../../assets/Sami_Linkedin.jpeg'
import link from '../../assets/link.png'
import git from '../../assets/Git.png'

const About = () => {  


  const imgStyle = { width: '15rem', height: '15rem' } 

  return (
    <>
      <div className="loop-wrapper">
        <div className="box">
          <div className="section-header-about section-header-create">
            <h1 className="about-title">Meet the team:</h1>    
            <br />
          </div>
          <div className="section-wrapper-about">  
            <img className='profile-pic' style={imgStyle} src={eric} alt='greek man'/>
            <div className='about-text'>

              <h1 className="name">Eric Petsopoulos</h1>
              <div className="about-links">
                <a href="https://www.linkedin.com/in/eric-petsopoulos-b5751761/">
                  <img  src={link} alt='linkedin'/>
                </a>
                <a href="https://github.com/ericpesto">
                  <img className='git-link' src={git} alt='github'/>
                </a>
              </div>
            </div>

          </div>
          <br />

          <div className="section-wrapper-about"> 
            <img className='profile-pic' style={imgStyle}  src={sami} alt='arabian man'/>
            <div className='about-text'>
              <h1 className="name">Sami Hakim</h1> 

              <div className="about-links">
                <a href="https://www.linkedin.com/in/samihakim/"><img  src={link} alt='linkedin'/></a>
                <a href="https://github.com/Hamisakim"> 
                  <img className='git-link' src={git} alt='github'/>
                </a>
              </div>
            </div>

          </div>


        </div>
      </div>
      <ParticlesBg />
    </>
  )

}

export default About
