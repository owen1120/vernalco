// src/components/CatalogMatrix.tsx
import { ReactNode } from 'react';
import { MatrixRowDef } from '../types/catalog';

interface CatalogMatrixProps<T> {
  data: T[];
  rowDefs: MatrixRowDef<T>[];
  brandName?: string;
  spindleType?: string; 
}

// 💎 視覺打磨：根據品牌名稱，動態回傳你精心設計的 Tailwind 色彩主題！
// (包含文字顏色對比處理，確保淺色底 300/400 用深色字，深色底 500/700 用白字)
const getColorTheme = (brand?: string) => {
  const b = brand?.toUpperCase() || '';
  if (b.includes('STAR')) return { brand: 'bg-sky-500 text-white', main: 'bg-sky-300 text-sky-900', sub: 'bg-sky-700 text-white' };
  if (b.includes('CITIZEN')) return { brand: 'bg-rose-400 text-white', main: 'bg-rose-300 text-rose-900', sub: 'bg-rose-700 text-white' };
  if (b.includes('NOMURA')) return { brand: 'bg-violet-400 text-white', main: 'bg-violet-300 text-violet-900', sub: 'bg-violet-700 text-white' };
  if (b.includes('TSUGAMI')) return { brand: 'bg-amber-500 text-white', main: 'bg-amber-400 text-amber-900', sub: 'bg-amber-600 text-white' };
  
  // 預設色彩 (非機型目錄)
  return { brand: 'bg-slate-600 text-white', main: 'bg-slate-500 text-white', sub: 'bg-slate-700 text-white' };
};

// 將大陣列切割成多個小陣列，size 設定為 5，並自動補齊空位 (Padding)
function chunkArray<T>(array: T[], size: number): (T | null)[][] {
  const chunked: (T | null)[][] = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk: (T | null)[] = array.slice(i, i + size);
    while (chunk.length < size) {
      chunk.push(null);
    }
    chunked.push(chunk);
  }
  return chunked;
}

export function CatalogMatrix<T>({ data, rowDefs, brandName, spindleType }: CatalogMatrixProps<T>) {
  if (!data || data.length === 0) {
    return (
      <div className="p-10 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
        <span className="material-symbols-outlined text-4xl mb-2">info</span>
        <p>目前這個分類還沒有資料喔！</p>
      </div>
    );
  }

  const chunks = chunkArray(data, 5);
  const theme = getColorTheme(brandName);

  return (
    <div className="flex flex-col gap-10">
      {chunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className="break-inside-avoid overflow-hidden bg-white rounded-xl shadow-sm ring-1 ring-slate-200">
          
          <table className="w-full table-fixed text-center border-collapse text-sm wrap-break-words">
            <tbody>
              
              {/* === 💎 Corresponding Brand 標題列 === */}
              {brandName && (
                <tr className={`font-bold ${theme.brand}`}>
                  <td className="border border-slate-300 p-2 w-45 text-left tracking-wide">
                    Corresponding Brand
                  </td>
                  <td className="border border-slate-300 p-2 uppercase tracking-wider" colSpan={5}>
                    {brandName}
                  </td>
                </tr>
              )}

              {/* === 💎 Spindle Position 標題列 (最高級的分割邏輯) === */}
              {spindleType && (
                spindleType === 'Main & Sub Spindle' ? (
                  // 雙棲機型：將 colSpan=5 的區域完美對切！
                  <tr className="font-bold">
                    <td className={`border border-slate-300 p-2 w-45 text-left tracking-wide ${theme.brand}`}>
                      Spindle Position
                    </td>
                    <td className="border border-slate-300 p-0" colSpan={5}>
                      <div className="flex w-full h-full">
                        <div className={`flex-1 p-2 border-r border-slate-300 uppercase tracking-wider flex items-center justify-center ${theme.main}`}>
                          Main Spindle
                        </div>
                        <div className={`flex-1 p-2 uppercase tracking-wider flex items-center justify-center ${theme.sub}`}>
                          Sub Spindle
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  // 單一主/副軸：套用各自的專屬色彩
                  <tr className={`font-bold ${spindleType === 'Main Spindle' ? theme.main : theme.sub}`}>
                    <td className="border border-slate-300 p-2 w-45 text-left tracking-wide">
                      Spindle Position
                    </td>
                    <td className="border border-slate-300 p-2 uppercase tracking-wider" colSpan={5}>
                      {spindleType}
                    </td>
                  </tr>
                )
              )}

              {/* === 橫列資料渲染區 === */}
              {rowDefs.map((rowDef, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-slate-50 transition-colors duration-150">
                  <td className={`border border-slate-300 p-2 font-bold w-45 text-left align-middle ${rowDef.labelClassName || 'bg-slate-100 text-slate-700'}`}>
                    {rowDef.label}
                  </td>
                  
                  {chunk.map((item, itemIndex) => (
                    <td 
                      key={itemIndex} 
                      className={`border border-slate-300 p-2 align-middle ${item ? (rowDef.valueClassName || 'text-slate-700') : 'bg-slate-50'}`}
                    >
                      {item ? rowDef.render(item) : ''}
                    </td>
                  ))}
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}