import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'; 
import Home from './pages/Home';
import About from './pages/About';
import BusinessCard from './pages/BusinessCard';

function App() {
  return (
    <HashRouter>
      <Routes>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>

        <Route path="/bc/:id" element={<BusinessCard />} />

      </Routes>
    </HashRouter>
  )
}

export default App;