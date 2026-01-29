import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'; 
import Home from './pages/Home';
import About from './pages/About';
import BusinessCard from './pages/BusinessCard';

function App() {
  return (
    <BrowserRouter basename="/vernalco/">
      <Routes>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>

        <Route path="/bc/:id" element={<BusinessCard />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;