// src/pages/Catalog.tsx
import { Link, useParams, Navigate } from 'react-router-dom';
import { 
  CatalogCategory, MatrixRowDef, 
  AccessoryItem, MachineryPartItem, ErColletChuckItem, MachineItem 
} from '../types/catalog';
import { catalogDataMap } from '../data/catalogIndex';
import { CatalogMatrix } from '../components/CatalogMatrix';

const CATEGORIES: { id: CatalogCategory; name: string }[] = [
  { id: 'star', name: 'Star 機型' },
  { id: 'citizenCincom', name: 'Citizen Cincom 機型' },
  { id: 'nomuraDs', name: 'Nomura DS 機型' },
  { id: 'tsugami', name: 'Tsugami 機型' },
  { id: 'machineryParts', name: '機械零件 (Machinery Parts)' },
  { id: 'accessories', name: '配件 (Accessories)' },
  { id: 'erColletChuck', name: 'ER 筒夾 (ER Collet Chuck)' },
];

const ImagePlaceholder = () => (
  <div className="w-24 h-24 bg-slate-50 border border-slate-200 mx-auto mb-3 flex items-center justify-center rounded-lg shadow-inner">
    <span className="material-symbols-outlined text-slate-300 text-4xl">image</span>
  </div>
);

// === 準備非機型資料的「轉置矩陣橫列說明書」 ===

const accessoriesRows: MatrixRowDef<AccessoryItem>[] = [
  { label: 'Product', render: (item) => (
      <div className="text-center min-h-35 flex flex-col justify-end">
        {item.imgUrl ? <img src={item.imgUrl} alt="product" className="max-h-24 mx-auto mb-2 object-contain" /> : <ImagePlaceholder />}
        <p className="font-bold text-slate-800 text-xs leading-tight mb-1">{item.title || '-'}</p>
        <p className="text-sm font-bold text-lime-700">{item.titleZhTw || '-'}</p>
      </div>
  )},
  { label: 'Item No.', labelClassName: 'bg-lime-600 text-white', valueClassName: 'font-bold bg-lime-50 text-lime-900', render: (item) => item.sku || '-' },
  { label: 'Drawing No.', render: (item) => item.drawingNo || '-' },
  { label: 'Val. Serial No.', render: (item) => item.valuationSerialNum || '-' },
  { label: 'Specifications', render: (item) => (
      <ul className="text-xs text-slate-600 text-left list-disc list-inside">
        {item.productSpecifications?.length ? item.productSpecifications.map((spec, i) => <li key={i}>{spec}</li>) : '-'}
      </ul>
  )},
];

const machineryPartsRows: MatrixRowDef<MachineryPartItem>[] = [
  { label: 'Product', render: (item) => (
      <div className="text-center min-h-35 flex flex-col justify-end">
        {item.imgUrl ? <img src={item.imgUrl} alt="product" className="max-h-24 mx-auto mb-2 object-contain" /> : <ImagePlaceholder />}
        <p className="font-bold text-slate-800 text-xs leading-tight mb-1">{item.title || '-'}</p>
        <p className="text-sm font-bold text-lime-700">{item.titleZhTw || '-'}</p>
      </div>
  )},
  { label: 'Ref. No.', render: (item) => item.refNo || '-' },
  { label: 'Item No.', labelClassName: 'bg-lime-600 text-white', valueClassName: 'font-bold bg-lime-50 text-lime-900', render: (item) => item.sku || '-' },
  { label: 'Drawing No.', render: (item) => item.drawingNo || '-' },
  { label: 'Val. Serial No.', render: (item) => item.valuationSerialNum || '-' },
  { label: 'Brand', render: (item) => item.brand || '-' },
  { label: 'Stroke / Pat.', render: (item) => (
      <div className="text-xs text-slate-600">
        <p>Stroke: {item.processingStroke || '-'}</p>
        <p>Pat: {item.pat || '-'}</p>
      </div>
  )},
  { label: 'Compatible Machines', render: (item) => (
      <div className="text-[10px] text-left leading-relaxed">
        {item.matchingMachineTools?.length ? item.matchingMachineTools.map((tool, i) => <div key={i}>{tool}</div>) : '-'}
      </div>
  )},
];

const erColletChuckRows: MatrixRowDef<ErColletChuckItem>[] = [
  { label: 'Product', render: (item) => (
      <div className="text-center min-h-35 flex flex-col justify-end">
        {item.imgUrl ? <img src={item.imgUrl} alt="product" className="max-h-24 mx-auto mb-2 object-contain" /> : <ImagePlaceholder />}
        <p className="font-bold text-slate-800 text-xs leading-tight mb-1">{item.endedType || '-'}</p>
        <p className="text-sm font-bold text-lime-700">{item.colletType || '-'}</p>
      </div>
  )},
  { label: 'Item No.', labelClassName: 'bg-lime-600 text-white', valueClassName: 'font-bold bg-lime-50 text-lime-900', render: (item) => item.sku || '-' },
  { label: 'Drawing No.', render: (item) => item.drawingNo || '-' },
  { label: 'Val. Serial No.', render: (item) => item.valuationSerialNum || '-' },
  { label: 'Dimensions', render: (item) => item.overallDimensions || '-' },
];

const getMachineRows = (spindleType: 'main' | 'sub' | 'both'): MatrixRowDef<MachineItem>[] => [
  { label: 'Product', render: (item) => (
      <div className="text-center min-h-35 flex flex-col justify-end">
        {item.imgUrl ? <img src={item.imgUrl} alt="product" className="max-h-24 mx-auto mb-2 object-contain" /> : <ImagePlaceholder />}
        <p className="font-bold text-slate-800 text-xs leading-tight mb-1">{item.title || '-'}</p>
        <p className="text-sm font-bold text-lime-700">{item.titleZhTw || '-'}</p>
      </div>
  )},
  { label: 'Ref. No.', render: (item) => item.refNo || '-' },
  { label: 'Item No.', labelClassName: 'bg-lime-600 text-white', valueClassName: 'font-bold bg-lime-50 text-lime-900', render: (item) => item.sku || '-' },
  { label: 'Drawing No.', render: (item) => item.drawingNo || '-' },
  { label: 'Val. Serial No.', render: (item) => item.valuationSerialNum || '-' },
  { label: 'Speed Ratio', render: (item) => item.speedRatio || '-' },
  { label: 'RPM (Max.)', render: (item) => item.maxRpm || '-' },
  { label: 'Adj. Spindle', render: (item) => item.adjustableSpindle || '-' },
  { label: 'Adj. Angle', render: (item) => item.adjustableAngle || '-' },
  { label: 'Handle', render: (item) => item.handle || '-' },
  { label: 'Length Per Ref.', render: (item) => item.lengthPerRef || '-' },
  { label: 'Clamping Method', render: (item) => <div className="whitespace-pre-wrap">{item.clampingMethod || '-'}</div> },
  
  { label: 'Compatible Machines', render: (item) => {
      if (spindleType === 'both') {
        return (
          <div className="text-[10px] text-left leading-relaxed flex flex-col gap-2">
            {item.matchingMachineTools.mainSpindle.length > 0 && (
              <div><span className="font-bold text-slate-500 border-b border-slate-200 block mb-0.5">Main:</span>
                {item.matchingMachineTools.mainSpindle.map((m, i) => <div key={`m-${i}`}>{m}</div>)}
              </div>
            )}
            {item.matchingMachineTools.subSpindle.length > 0 && (
              <div><span className="font-bold text-slate-500 border-b border-slate-200 block mb-0.5">Sub:</span>
                {item.matchingMachineTools.subSpindle.map((m, i) => <div key={`s-${i}`}>{m}</div>)}
              </div>
            )}
          </div>
        );
      }
      
      const machines = spindleType === 'main' ? item.matchingMachineTools.mainSpindle : item.matchingMachineTools.subSpindle;
      return <div className="text-[10px] text-left leading-relaxed">
        {machines?.length ? machines.map((m, i) => <div key={i}>{m}</div>) : '-'}
      </div>
  }},
  { label: 'Special Note', render: (item) => (
      <div className="text-[10px] text-left leading-relaxed">
        {item.specialNote?.length && item.specialNote[0] !== '-' ? item.specialNote.map((note, i) => <div key={i}>{note}</div>) : '-'}
      </div>
  )},
];


// === 主元件渲染區 ===

function Catalog() {
  const { category } = useParams<{ category: string }>();

  const isValidCategory = CATEGORIES.some(c => c.id === category);
  if (!isValidCategory) {
    return <Navigate to="/catalog/star" replace />;
  }

  const currentCategoryObj = CATEGORIES.find(c => c.id === category);
  
  // 💎 取出原石資料
  const rawData = catalogDataMap[category as CatalogCategory] || [];
  
  // 💎 核心打磨：加入過濾網！只允許 status 為 'published' 的資料進入渲染流程
  const data = rawData.filter((item: any) => item.status === 'published');

  const isMachineCategory = ['star', 'citizenCincom', 'nomuraDs', 'tsugami'].includes(category || '');
  const brandName = isMachineCategory ? currentCategoryObj?.name.split(' ')[0].toUpperCase() : undefined;

  const machineData = isMachineCategory ? (data as MachineItem[]) : [];
  
  // 1. 純主軸
  const mainOnlyData = machineData.filter(item => 
    item.matchingMachineTools?.mainSpindle?.length > 0 && 
    (!item.matchingMachineTools?.subSpindle || item.matchingMachineTools.subSpindle.length === 0)
  );
  
  // 2. 純副軸
  const subOnlyData = machineData.filter(item => 
    (!item.matchingMachineTools?.mainSpindle || item.matchingMachineTools.mainSpindle.length === 0) && 
    item.matchingMachineTools?.subSpindle?.length > 0
  );
  
  // 3. 主/副軸共用 (Both)
  const bothSpindleData = machineData.filter(item => 
    item.matchingMachineTools?.mainSpindle?.length > 0 && 
    item.matchingMachineTools?.subSpindle?.length > 0
  );

  let rowDefs: MatrixRowDef<any>[] = [];
  if (!isMachineCategory) {
    switch (category) {
      case 'accessories': rowDefs = accessoriesRows; break;
      case 'machineryParts': rowDefs = machineryPartsRows; break;
      case 'erColletChuck': rowDefs = erColletChuckRows; break;
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-70px)] bg-slate-50 font-sans print:bg-white">
      {/* 側邊欄 */}
      <aside className="w-64 bg-white border-r border-slate-200 shrink-0 shadow-sm print:hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="material-symbols-outlined mr-2 text-lime-600">menu_book</span>
            型錄分類
          </h2>
          <nav className="flex flex-col space-y-2">
            {CATEGORIES.map((cat) => {
              const isActive = category === cat.id;
              return (
                <Link
                  key={cat.id}
                  to={`/catalog/${cat.id}`}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-lime-50 text-lime-700 border border-lime-200 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* 內容區 */}
      <main className="flex-1 p-8 overflow-x-auto print:p-0 print:overflow-visible">
        
        <div className="print:hidden mb-6 border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-800">{currentCategoryObj?.name}</h1>
        </div>

        {isMachineCategory ? (
          <div className="flex flex-col">
            {mainOnlyData.length > 0 && (
              <div className="mb-16 print:mb-0">
                <CatalogMatrix 
                  data={mainOnlyData} 
                  rowDefs={getMachineRows('main')} 
                  brandName={brandName} 
                  spindleType="Main Spindle" 
                />
              </div>
            )}
            
            {subOnlyData.length > 0 && (
              <div className="mb-16 print:mb-0 print:break-before-page">
                <CatalogMatrix 
                  data={subOnlyData} 
                  rowDefs={getMachineRows('sub')} 
                  brandName={brandName} 
                  spindleType="Sub Spindle" 
                />
              </div>
            )}

            {bothSpindleData.length > 0 && (
              <div className="mb-16 print:mb-0 print:break-before-page">
                <CatalogMatrix 
                  data={bothSpindleData} 
                  rowDefs={getMachineRows('both')} 
                  brandName={brandName} 
                  spindleType="Main & Sub Spindle" 
                />
              </div>
            )}
            
            {/* 防呆：如果全部都被過濾掉了，給個提示 */}
            {mainOnlyData.length === 0 && subOnlyData.length === 0 && bothSpindleData.length === 0 && (
              <div className="p-10 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
                <span className="material-symbols-outlined text-4xl mb-2">info</span>
                <p>目前這個分類的商品都還在草稿階段喔！</p>
              </div>
            )}
          </div>
        ) : (
          <CatalogMatrix data={data} rowDefs={rowDefs} brandName={brandName} />
        )}
      </main>
    </div>
  );
}

export default Catalog;