import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header"
import Home from "./Components/Home"
import Coins from "./Components/Coins"
import CoinDetails from "./Components/CoinDetails";
import Exchanges from "./Components/Exchanges";
import Error from "./Components/Error";
import Footer from "./Components/Footer"

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/coins" element={<Coins/>}/>
        <Route path="/exchanges" element={<Exchanges/>}/>
        <Route path="/coins/:id" element={<CoinDetails/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
