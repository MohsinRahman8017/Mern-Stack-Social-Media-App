import React, { useEffect,useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";

import { toast ,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"

import { useSelector, useDispatch } from 'react-redux'
import { ThemeMode } from "./components/Home/Left-Side-Bar/themeSlice"
import "./App.css"

import { store } from './store'
import { Provider } from 'react-redux'


let App = () => {

  const token = localStorage.getItem("token")
  const Theme = useSelector((state) => state.theme.mode)

  if(localStorage.getItem("ThemeMode") == "DarkMode"){
    document.body.classList.remove("BodyLight")
    document.body.classList.add("BodyDark")
  }
  else{
    document.body.classList.remove("BodyDark")
    document.body.classList.add("BodyLight")
  }



  return(
          <>
          <div className="container">
              <ToastContainer  autoClose={1500} />
                <BrowserRouter>
                  <Routes>
                      <Route  path="/" element={
                       token ? <HomePage /> : <LoginPage/>
                   } />
                      <Route path="/register" element={<RegisterPage/>} />
                      <Route path="/login" element={<LoginPage/>} />
                      <Route path="/profile/:id" element={<ProfilePage />}/>
                  </Routes>
                </BrowserRouter>
           </div>
          </>
  )
}

export default App