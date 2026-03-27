import { ReactNode } from 'react';
import { MatrixRowDef } from '../types/catalog';
import { useResponsiveStore } from '../store/useResponsiveStore'; // 💎 引入全域雷達

interface CatalogMatrixProps<T> {
  data: T[];
  rowDefs: MatrixRowDef<T>[];
  brandName?: string;
  spindleType?: string; 
}

const getColorTheme = (brand?: string) => {
  const b = brand?.toUpperCase() || '';
  if (b.includes('STAR')) return { brand: 'bg-sky-500 text-white', main: 'bg-sky-300 text-sky-900', sub: 'bg-sky-700 text-white' };
  if (b.includes('CITIZEN')) return { brand: 'bg-rose-400 text-white', main: 'bg-rose-300 text-rose-900', sub: 'bg-rose-700 text-white' };
  if (b.includes('NOMURA')) return { brand: 'bg-violet-400 text-white', main: 'bg-violet-300 text-violet-900', sub: 'bg-violet-700 text-white' };
  if (b.includes('TSUGAMI')) return { brand: 'bg-amber-500 text-white', main: 'bg-amber-400 text-amber-900', sub: 'bg-amber-600 text-white' };
  
  return { brand: 'bg-slate-600 text-white', main: 'bg-slate-500 text-white', sub: 'bg-slate-700 text-white' };
};

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
  const { isMobile, isTablet, isPrinting } = useResponsiveStore();

  if (!data || data.length === 0) {
    return (
      <div className="p-10 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
        <span className="material-symbols-outlined text-4xl mb-2">info</span>
        <p>目前這個分類還沒有資料喔！</p>
      </div>
    );
  }

  const theme = getColorTheme(brandName);

  if (isMobile && !isPrinting) {
    return (
      <div className="flex flex-col gap-6">
        {(brandName || spindleType) && (
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden text-sm">
            {brandName && (
              <div className={`flex p-3 font-bold ${theme.brand}`}>
                <div className="w-1/3">Corresponding Brand</div>
                <div className="w-2/3 uppercase">{brandName}</div>
              </div>
            )}
            {spindleType && (
              <div className={`flex p-3 font-bold border-t border-white/20 ${spindleType === 'Main Spindle' ? theme.main : (spindleType === 'Sub Spindle' ? theme.sub : theme.brand)}`}>
                <div className="w-1/3">Spindle Position</div>
                <div className="w-2/3 uppercase">{spindleType}</div>
              </div>
            )}
          </div>
        )}

        {data.map((item, itemIndex) => (
          <div key={itemIndex} className="bg-white rounded-xl shadow-md ring-1 ring-slate-200 overflow-hidden flex flex-col">
            {rowDefs.map((rowDef, rowIndex) => (
              <div key={rowIndex} className="flex border-b border-slate-100 last:border-0">
                <div className={`w-1/3 p-3 font-bold text-xs flex items-center ${rowDef.labelClassName || 'bg-slate-50 text-slate-700'}`}>
                  {rowDef.label}
                </div>
                <div className={`w-2/3 p-3 flex items-center wrap-break-words text-sm ${rowDef.valueClassName || 'text-slate-700'}`}>
                  {rowDef.render(item)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }


  let chunkSize = 5;
  if (isTablet && !isPrinting) {
    chunkSize = 3;
  }

  const chunks = chunkArray(data, chunkSize);

  return (
    <div className="flex flex-col gap-10">
      {chunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className="break-inside-avoid overflow-hidden bg-white rounded-xl shadow-sm ring-1 ring-slate-200">
          
          <table className="w-full table-fixed text-center border-collapse text-sm wrap-break-words">
            <tbody>
              
              {brandName && (
                <tr className={`font-bold ${theme.brand}`}>
                  <td className="border border-slate-300 p-2 w-45 text-left tracking-wide">
                    Corresponding Brand
                  </td>
                  <td className="border border-slate-300 p-2 uppercase tracking-wider" colSpan={chunkSize}>
                    {brandName}
                  </td>
                </tr>
              )}

              {spindleType && (
                spindleType === 'Main & Sub Spindle' ? (
                  <tr className="font-bold">
                    <td className={`border border-slate-300 p-2 w-45 text-left tracking-wide ${theme.brand}`}>
                      Spindle Position
                    </td>
                    <td className="border border-slate-300 p-0" colSpan={chunkSize}>
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
                  <tr className={`font-bold ${spindleType === 'Main Spindle' ? theme.main : theme.sub}`}>
                    <td className="border border-slate-300 p-2 w-45 text-left tracking-wide">
                      Spindle Position
                    </td>
                    <td className="border border-slate-300 p-2 uppercase tracking-wider" colSpan={chunkSize}>
                      {spindleType}
                    </td>
                  </tr>
                )
              )}

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