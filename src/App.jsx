import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import ListProduct from './pages/ListProduct';
import OrderPage from './pages/OrderPage';
import Login from './components/Login';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export const backendUrl = import.meta.env.VITE_BACKEND_URL
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])
  return (
    <div className="bg-black min-h-screen text-white">
      <ToastContainer/>
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="mx-auto ml-[max(5vw,25px)] my-8 text-gray-200 text-base w-[70%]">
              <Routes>
                <Route path="/add" element={<AddProduct token={token} />} />
                <Route path="/list" element={<ListProduct token={token} />} />
                <Route path="/orders" element={<OrderPage token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
