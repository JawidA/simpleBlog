import {Route, Routes, Link } from 'react-router-dom'
import { useContext } from 'react'

import { ThemeContext } from './component/useContext'
import Home from './pages/home'
import Create from './pages/create'
import Update from './pages/update'

function App() {

  const {themeColor, setThemeColor} = useContext(ThemeContext);

  console.log(themeColor)
  console.log(`bg-[${themeColor}]`)
  return (
    <div>
      <div className='flex gap-2 justify-center p-5'>
        <div onClick={() => {setThemeColor("bg-red-500")}} className='rounded-full w-10 h-10 bg-red-500 cursor-pointer'></div>
        <div onClick={() => {setThemeColor("bg-green-500")}} className='rounded-full w-10 h-10 bg-green-500 cursor-pointer'></div>
        <div onClick={() => {setThemeColor("bg-blue-500")}} className='rounded-full w-10 h-10 bg-blue-500 cursor-pointer'></div>
      </div>
      <nav className={`${themeColor} p-5 lg:px-40`}>
        <div className='mx-auto container flex items-center justify-between'>
          <h1 className='text-3xl text-white font-bold '>AJA Best</h1>

          <div className='flex gap-5 text-lg text-gray-100'>
            <Link to={"/"} >Home</Link>
            <Link to={"/create"}>Create Blog</Link>
            {/* <Link>Update</Link> */}
          </div>
        </div>
      </nav>


      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/create' element={<Create/>} />
        <Route path='/:id' element={<Update/>}/>
      </Routes>
    </div>
  )
}

export default App
