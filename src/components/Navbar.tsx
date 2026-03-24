import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex items-center gap-6 px-8 py-4 bg-white border-b-2 border-lime-500 shadow-sm print:hidden">
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
    </nav>
  );
}

export default Navbar;