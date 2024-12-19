import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/sidebar'
import { Route, Routes } from 'react-router-dom'
import AddItems from '../pages/AddItems/AddItems'
import ItemList from '../pages/ItemList/ItemList'
import Orders from '../pages/Orders/Orders'

const App = () => {
  return (
    <div>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/Add" element ={<AddItems/>}/>
          <Route path="/List" element ={<ItemList/>}/>
          <Route path = "/Orders" element={<Orders/>}/>
        </Routes>
      </div>
      
    </div>
  )
}

export default App
