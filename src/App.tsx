import React from "react";
import { Route, Routes } from "react-router-dom";
import Announcement from "./components/Announcement";
import HomeScreen from "./components/Home";
import LoginScreen from "./components/Login";
import ProductDetailScreen from "./components/Products/detail/product-detail";

function App() {
  return (
    <div>
      <Announcement />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        {/* <Route path='/products' element={<ProductScreen />}/> */}
        <Route path='/products/:id' element={<ProductDetailScreen />} />
      </Routes>
    </div>
  );
}

export default App;
