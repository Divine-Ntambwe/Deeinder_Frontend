import React from 'react'
import {useNavigate} from 'react-router-dom'
import useFetch from './useFetch';
import { useContext } from 'react';
import { UserContext } from './App';

function SplashScreen() {
  const nav = useNavigate();
  const {setUser} = useContext(UserContext);
  
  if (localStorage.getItem("user")) {
    nav('/Home');
    setUser(JSON.parse(localStorage.getItem("user")))
  }
  return (
    <div id="splash-screen"><img id="splashBG"src="splashBG.png"></img></div>
  )
}

export default SplashScreen