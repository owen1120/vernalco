import { Link } from 'react-router-dom';
import { useResponsiveStore } from '../store/useResponsiveStore'; 

function Navbar() {
  const { isDesktop, toggleSidebar } = useResponsiveStore();

  return (
    <nav className="flex items-center px-8 py-4 bg-white border-b-2 border-lime-500 shadow-sm print:hidden">
      
      {!isDesktop && (
        <button 
          onClick={toggleSidebar}
          className="mr-6 text-slate-600 hover:text-lime-600 focus:outline-none flex items-center justify-center transition-colors"
          aria-label="打開側邊欄"
        >
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      )}

      <div className="flex items-center gap-6">
        <Link 
          to="/" 
          className="text-slate-600 hover:text-lime-600 font-bold transition-colors"
        >
          首頁
        </Link>
        
        <Link 
          to="/catalog/star" 
          className="text-slate-600 hover:text-lime-600 font-bold transition-colors"
        >
          內部型錄
        </Link>
      </div>
      
    </nav>
  );
}

export default Navbar;