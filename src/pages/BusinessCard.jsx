import { useParams } from 'react-router-dom';
import { cardsData } from '../data/cardsData';

function BusinessCard() {
  const { id } = useParams();
  const card = cardsData.find((c) => c.id === id);

  // 防呆：找不到人時顯示錯誤
  if (!card) {
    return <div className="text-center mt-10 text-xl font-bold">找不到這張名片：{id}</div>;
  }

  // === 邏輯判斷區 ===
  const isVernalco = card.type === 'vernalco';

  const baseUrl = import.meta.env.BASE_URL;
  
  // 圖片路徑 (對應 public 資料夾結構)
  const logoSrc = isVernalco 
    ? `${baseUrl}images/vernalco/vernalco_logo.png` 
    : `${baseUrl}images/vernal/vernal_logo.png`;

  const websiteUrl = isVernalco ? 'https://www.vernalco.com' : 'https://www.vernal.com.tw';
  const websiteText = isVernalco ? 'www.vernalco.com' : 'www.vernal.com.tw';
  const companyName = 'Vernal Manufacturing & Engineering co., ltd.';

  return (
    // 背景與容器
    <div className="min-h-screen w-full bg-white flex justify-center p-4 font-sans text-gray-800">
      <main className="w-full max-w-100"> {/* 限制最大寬度模擬名片 */}
        <div className="flex flex-col">
          
          {/* Logo 區塊 */}
          <a href={websiteUrl} target="_blank" rel="noreferrer" className="mb-9 block">
            <img src={logoSrc} alt="Company Logo" className="h-auto max-w-50" />
          </a>

          {/* 名字區塊 (根據 layout 變化) */}
          <div className="mb-4">
            {card.layout === 'kanji' ? (
              // === 漢字直排模式 ===
              <>
                <div className="flex flex-row items-end">
                  {card.nameData.map((item, index) => (
                    <div 
                      key={index} 
                      className={`flex flex-col items-center ${index === 0 ? 'mr-4' : ''}`}
                    >
                      <span className={`text-xl text-gray-800 mb-0 leading-none ${item.furigana ? '' : 'invisible'}`}>
                        {item.furigana || '無'} 
                      </span>
                      {/* 漢字 */}
                      <h2 className="text-4xl font-bold leading-tight">
                        {item.kanji}
                      </h2>
                    </div>
                  ))}
                </div>
                
                {card.nameEn && (
                  <p className="mt-1 text-lg text-gray-500 font-medium">
                    {card.nameEn}
                  </p>
                )}
              </>
            ) : (
              // === 英文橫排模式 ===
              <h1 className="text-4xl font-bold">{card.nameEn}</h1>
            )}
          </div>

          {/* 部門與職稱 */}
          {/* 技巧：如果沒有職稱，部門下方要加 mb-9 撐開距離 */}
          <p className={`text-base text-gray-600 ${!card.title ? 'mb-9' : ''}`}>
            {card.dept}
          </p>
          
          {/* 職稱 (有才顯示) */}
          {card.title && (
            <p className="text-base font-bold mb-9">{card.title}</p>
          )}

          {/* 聯絡資訊 */}
          <div className="space-y-1 text-base">
            {/* 電話 */}
            <a href={`tel:${card.phones.tel}`} className="flex items-center text-gray-700 hover:text-blue-600 transition mb-3">
              <span className="material-symbols-outlined text-3xl mr-3 font-normal">call</span>
              <p>{card.phones.tel}</p>
            </a>

            {/* 傳真 */}
            <div className="flex items-center text-gray-700 mb-3">
              <span className="material-symbols-outlined text-3xl mr-3 font-normal">fax</span>
              <p>{card.phones.fax}</p>
            </div>

            {/* Email (支援多筆) */}
            {card.emails.map((email, idx) => (
              <a key={idx} href={`mailto:${email.address}`} className="flex items-center text-gray-700 hover:text-blue-600 transition mb-3">
                <span className="material-symbols-outlined text-3xl mr-3 font-normal">mail</span>
                <p>{email.address}</p>
                {/* Email 標籤 (如: 代表/直通) */}
                {email.label && (
                  <span className="ml-2 text-xs font-bold bg-gray-200 px-1 rounded self-center">
                    {email.label}
                  </span>
                )}
              </a>
            ))}

            {/* 地址 */}
            <a href={`http://maps.google.com/?q=$$${card.address}`} target="_blank" rel="noreferrer" className="flex items-start text-gray-700 hover:text-blue-600 transition pt-1">
              <span className="material-symbols-outlined text-3xl mr-3 -mt-0.5 font-normal">domain</span>
              <p className="leading-snug">{card.address}</p>
            </a>
          </div>

          {/* 公司全名 */}
          <p className="text-xl mt-9 mb-9 text-gray-800 font-medium">
            {companyName}
          </p>

          {/* 頁尾 (下載與官網) */}
          <div className="border-t border-gray-300 pt-4 flex justify-between items-center">
            <a href={card.downloadLink} className="text-gray-600 hover:text-black transition flex items-center" download>
              <span className="material-symbols-outlined text-4xl">download</span>
            </a>
            <a href={websiteUrl} target="_blank" rel="noreferrer" className="text-lg text-gray-600 hover:text-blue-600 underline decoration-1 underline-offset-2">
              {websiteText}
            </a>
          </div>

        </div>
      </main>
    </div>
  );
}

export default BusinessCard;