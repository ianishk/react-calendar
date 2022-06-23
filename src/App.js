import React from 'react'
import './styles.css'
import Sidebar from './components/Sidebar'
import Calendar from './components/Calendar'

const App = () => {
  return (
    <div className='App'>
      <Sidebar />
      <Calendar />
    </div>
  )
}

export default App