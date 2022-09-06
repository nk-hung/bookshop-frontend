import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./components/Home";
import LoginScreen from "./components/Login";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />
      </Routes>
    </div>
  );
}

export default App;
