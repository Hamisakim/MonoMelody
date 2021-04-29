/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Gallery from './components/Gallery/Gallery'
import HomePage from './components/Home/HomePage'
import Login from './components/LoginRegister/Login'
import Register from './components/LoginRegister/Register'
import Footer from './components/Nav_and_Footer/Footer'
import NavBar from './components/Nav_and_Footer/NavBar'
import Sequencer from './components/sequencer/Sequencer'
import LoopEdit from './components/Loops/LoopEdit'
import LoopNew from './components/Loops/LoopNew'
import LoopShow from './components/Loops/LoopShow'
import ProfilePage from './components/Profile/ProfilePage'
import About from './components/About/About'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProfileForm from './components/Profile/ProfileForm'

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
