import React from "react";
import Layout from "./components/Layout";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Login from './pages/Login'
import Singup from './pages/SingUp'
import Product from './pages/Product'
import Panier from './pages/Panier'

function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
        <div className="pages container">
          <Routes>
            <Route
              path="/"
              element={user ? <Home/> : <Navigate to='/login'/>}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to='/' />}
            />
            <Route
              path="/singup"
              element={!user ? <Singup/> : <Navigate to='/' />}
            />
            <Route
              path="/product/:id"
              element={user ? <Product/> : <Navigate to='/login' />}
            />
            <Route
              path="/panier"
              element={user ? <Panier/> : <Navigate to='/login' />}
            />
          </Routes>
        </div>
        </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App;
