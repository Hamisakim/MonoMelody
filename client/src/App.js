/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Gallery from './components/gallery/Gallery'
import HomePage from './components/home/HomePage'
import Login from './components/login-register/Login'
import Register from './components/login-register/Register'
import Footer from './components/nav_and_footer/Footer'
import NavBar from './components/nav_and_footer/NavBar'
import Sequencer from './components/sequencer/Sequencer'
import LoopEdit from './components/loops/LoopEdit'
import LoopNew from './components/loops/LoopNew'
import LoopShow from './components/loops/LoopShow'
import ProfilePage from './components/profile/ProfilePage'
import About from './components/about/About'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProfileForm from './components/profile/ProfileForm'

const App = () => {


  return (
    <>
      <BrowserRouter>

        <NavBar/>
        <Switch>

          <Route exact path="/">
            <HomePage/>
          </Route>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/register'>
            <Register />
          </Route>
          <Route exact path='/profile/edit'>
            <ProfileForm/>
          </Route>
        
          <Route path='/profile/:id'>
            <ProfilePage/>
          </Route>
          

          <Route path='/create'>
            <LoopNew />
          </Route>

          <Route path='/loop/:id/edit'>
            <LoopEdit />
          </Route>

          <Route path='/loop/:id'>
            <LoopShow />
          </Route>

          <Route path='/gallery'>
            <Gallery/>
          </Route>

          <Route path='/create'> 
            <Sequencer />
          </Route>

          <Route path='/about'>
            <About />
          </Route>

        </Switch>
        <Footer/>
        
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
