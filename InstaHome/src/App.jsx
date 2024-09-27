import Navbar from './components/Navbar/Navbar'
import ApartmentSection from './components/Apartments/ApartmentSection'

import './App.css'

function App() {
  return (
    /*Se implementa el import de las distintas secciones de la pagina y se llaman en el return para que sean mostradas */
    <>
      <div className='overflow-x-hidden'>
      <Navbar />
      <ApartmentSection /> 
      </div>
    </>
  )
}

export default App
