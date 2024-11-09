import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Auth from './pages/Auth.jsx'
import CreateRecipe from './pages/CreateRecipe.jsx'
import SavedRecipes from './pages/savedRecipes.jsx'
import Navbar from './components/Navbar.jsx'

function App() {

  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/create-recipe' element={<CreateRecipe/>}/>
          <Route path='/saved-recipe' element={<SavedRecipes/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
