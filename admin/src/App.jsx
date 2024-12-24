import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddItems from '../pages/AddItems/AddItems'
import ItemList from '../pages/ItemList/ItemList'
import Orders from '../pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecruitmentList from '../pages/RecruitmentList/RecruitmentList'
import UserList from '../pages/UserList/UserList'

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
          <Route path = "/RecruitmentList" element={<RecruitmentList url ={url}/>}/>
          <Route path = "/UserList" element={<UserList url ={url}/>}/>
          <Route path = "/Orders" element={<Orders url ={url}/>}/>
        </Routes>
      </div>
      
    </div>
  )
}

export default App
