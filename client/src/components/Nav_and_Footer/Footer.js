import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className='footer-content'>
        <Link className="footer-link" to="/about">
        About         
        </Link>
        {`MonoMelody © ${new Date().getFullYear()}`}
      </div>
    </footer>
  
  
  
  )
}

export default Footer
