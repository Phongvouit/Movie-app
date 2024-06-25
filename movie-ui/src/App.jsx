import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Netflix from './pages/Netflix'
import Player from './pages/Player'
import Movies from './pages/Movies'
import MyList from './pages/MyList'
import Search from './pages/Search'
import DetailMovie from './pages/DetailMovie'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/signup' element={<Signup/>}/>
      <Route exact path='/player/:id' element={<Player/>}/>
      <Route exact path='/movies' element={<Movies/>}/>
      <Route exact path='/mylist' element={<MyList/>}/>
      <Route exact path='/search' element={<Search/>}/>
      <Route exact path='/:mediaType/:id' element={<DetailMovie/>}/>
      <Route exact path='/' element={<Netflix/>}/>
    </Routes>
    <Toaster/>
    </BrowserRouter>
  )
}
