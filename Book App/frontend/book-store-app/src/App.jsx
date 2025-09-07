import { Outlet } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar /> {/* fixed navbar & footer for all of the children*/}
      <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary'>
        <Outlet />      {/* Outlet render all children of App*/}
      </main>
      <Footer />
    </>
  )
}

export default App
