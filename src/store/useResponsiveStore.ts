import { create } from 'zustand';

interface ResponsiveState {
  windowWidth: number;
  isPrinting: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  
  initListeners: () => void;
}

export const useResponsiveStore = create<ResponsiveState>((set) => ({
  windowWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
  isPrinting: false,
  isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  isTablet: typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false,
  isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,

  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

  initListeners: () => {
    if (typeof window === 'undefined') return;

    if ((window as any).__responsiveListenersBound) return;
    (window as any).__responsiveListenersBound = true;

    const handleResize = () => {
      const width = window.innerWidth;
      const isDesktopNow = width >= 1024;

      set((state) => {
        let newSidebarState = state.isSidebarOpen;
        if (isDesktopNow && state.isSidebarOpen) {
          newSidebarState = false;
        }

        return {
          windowWidth: width,
          isMobile: width < 768,
          isTablet: width >= 768 && width < 1024,
          isDesktop: isDesktopNow,
          isSidebarOpen: newSidebarState, 
        };
      });
    };

    const handleBeforePrint = () => set({ isPrinting: true });
    const handleAfterPrint = () => set({ isPrinting: false });

    window.addEventListener('resize', handleResize);
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    const mediaQueryList = window.matchMedia('print');
    const printListener = (mql: MediaQueryListEvent) => set({ isPrinting: mql.matches });
    
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', printListener);
    } else if (mediaQueryList.addListener) {
      mediaQueryList.addListener(printListener);
    }
  }
}));