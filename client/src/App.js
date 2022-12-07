import React, {useEffect,useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login, { SignUp } from "./Auth.js";
import Calculator from "./Calculator.js";
import History from "./History.js";
import Back from "./Back.js";
import Home from "./Home.js"

import "./back.scss"

function App() {
  return (
    <BrowserRouter>
      <Back/>
      <Routes>
          <Route path = "" element = {<Home/>}/>
          <Route path = "login" element={<Login />} />
          <Route path = "signup" element = {<SignUp />} />
          <Route path = "calculator" element ={<Calculator />} />
          {/* <Route path = "" element ={<Home/>}/> */}
          <Route path = "history" element = {<History/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;