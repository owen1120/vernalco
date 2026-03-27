import { create } from 'zustand';

// 定義雷達站的狀態結構
interface ResponsiveState {
  windowWidth: number;
  isPrinting: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  initListeners: () => void; 
}

export const useResponsiveStore = create<ResponsiveState>((set) => ({
  windowWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
  isPrinting: false,
  isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  isTablet: typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false,
  isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,

  initListeners: () => {
    if (typeof window === 'undefined') return;

    if ((window as any).__responsiveListenersBound) return;
    (window as any).__responsiveListenersBound = true;

    // 處理螢幕尺寸變更
    const handleResize = () => {
      const width = window.innerWidth;
      set({
        windowWidth: width,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    // 處理列印狀態的監聽器
    const handleBeforePrint = () => set({ isPrinting: true });
    const handleAfterPrint = () => set({ isPrinting: false });

    window.addEventListener('resize', handleResize);
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    // 針對 Safari 等部分瀏覽器的進階列印監聽支援
    const mediaQueryList = window.matchMedia('print');
    const printListener = (mql: MediaQueryListEvent) => set({ isPrinting: mql.matches });
    
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', printListener);
    } else if (mediaQueryList.addListener) {
      // 兼容舊版瀏覽器
      mediaQueryList.addListener(printListener);
    }
  }
}));