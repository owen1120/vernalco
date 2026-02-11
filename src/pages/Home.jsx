import { Link } from 'react-router-dom';
import { cardsData } from '../data/cardsData';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
          ✨ Vernal 電子名片 ✨
        </h1>
        <p className="text-center text-gray-500 mb-10">
          認證：已完成的名片列表
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {cardsData.map((card) => {
            
            const displayName = card.layout === 'kanji'
              ? card.nameData.map(d => d.kanji).join('') // 例如：吳 + 中 + 軒
              : card.nameEn;                             // 例如：Chi-Li Lin

            const themeColor = card.type === 'vernalco' ? 'bg-lime-600' : 'bg-yellow-400';

            return (
              <Link
                key={card.id}
                to={`/bc/${card.id}`} 
                className="block group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
              >
                <div className="p-6 flex items-center space-x-4">
                  
                  {/* 頭像圈圈 (用名字第一個字當頭像) */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-sm ${themeColor}`}>
                    {displayName[0]}
                  </div>
                  
                  {/* 文字資訊 */}
                  <div>
                    <p className='text-xs text-gray-400 font-mono mb-0.5'>NO. {card.id}</p>
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {displayName}
                    </h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block bg-gray-100 text-gray-600`}>
                      {card.type.toUpperCase()}
                    </span>
                  </div>

                  <span className="material-symbols-outlined absolute right-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    arrow_forward_ios
                  </span>
                </div>
              </Link>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default Home;