import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'; 
import Home from './pages/Home';
import BusinessCard from './pages/BusinessCard';
import Catalog from './pages/Catalog'; 
import { useResponsiveStore } from './store/useResponsiveStore'; 

function App() {
  const initListeners = useResponsiveStore((state) => state.initListeners);

  useEffect(() => {
    initListeners();
  }, [initListeners]);

  return (
    <HashRouter>
      <Routes>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog/:category" element={<Catalog />} />
        </Route>

        <Route path="/bc/:id" element={<BusinessCard />} />

      </Routes>
    </HashRouter>
  );
}

export default App;