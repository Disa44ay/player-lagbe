import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/sidebar'
import { Route, Routes } from 'react-router-dom'
import AddItems from '../pages/AddItems/AddItems'
import ItemList from '../pages/ItemList/ItemList'
import Orders from '../pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/Add" element ={<AddItems url ={url}/>}/>
          <Route path="/List" element ={<ItemList url ={url}/>}/>
          <Route path = "/Orders" element={<Orders url ={url}/>}/>
        </Routes>
      </div>
      
    </div>
  )
}

export default App
