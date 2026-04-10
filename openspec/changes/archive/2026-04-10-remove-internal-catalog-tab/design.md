## Context

目前系統中包含「內部型錄」功能，該功能包含了一個專屬的路由 `/catalog/:category`、相關的頁面元件 (`Catalog`)、矩陣元件 (`CatalogMatrix`)，以及大量專屬的靜態 JSON 資料庫（存放於 `src/data` 下）。由於營運或需求變更，目前不再需要此功能。

## Goals / Non-Goals

**Goals:**
- 完整且安全地移除與「內部型錄」相關的所有 UI、路由、及相關靜態資料。
- 確保不會影響到系統其他正常運行之功能（如首頁、名片頁等仍使用 `cardsData.ts`）。

**Non-Goals:**
- 不進行其他與型錄無關的重構。
- 專案其他部分資料及共用元件保持不變。

## Decisions

1. **僅刪除特定用途的靜態資料** 
   - 由於 `cardsData.ts` 被首頁及名片頁引用，故保留。
   - 與機型相關的 `.json` 檔案及 `catalogIndex.ts` 僅被 `Catalog.tsx` 使用，故可安全刪除。

2. **完整清理路由設定** 
   - 確保 `App.tsx` 中移除 `<Route path="/catalog/:category" ... />`，以避免出現無效路徑（Dead Links）。

## Risks / Trade-offs

- **[Risk]** 可能誤刪其他功能正在使用的 `.json` 檔案或共用 `Type`。 
  - *Mitigation:* 在刪除前已進行全局搜尋，確認 `src/types/catalog.ts` 及各機型 `.json` 檔案沒有被其他模組引用。
