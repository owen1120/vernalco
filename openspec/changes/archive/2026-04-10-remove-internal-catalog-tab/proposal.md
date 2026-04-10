## Why

移除不再需要的「內部型錄」分頁，以簡化專案架構並確保程式碼庫乾淨整潔。

## What Changes

- 移除導覽列 `Navbar` 的「內部型錄」連結。
- 移除路由配置中 `/catalog/:category` 相關設定。
- 刪除 `Catalog` 頁面元件和 `CatalogMatrix` 元件。
- 刪除與型錄資料相關的所有專屬檔案 ( JSON 資料、型錄介面定義檔等 )。

## Capabilities

### New Capabilities
無

### Modified Capabilities
無

## Impact

主要影響範圍為前端畫面與無用檔案移除：
- `src/App.tsx` (路由)
- `src/components/Navbar.tsx` (導覽列連結)
- `src/pages/Catalog.tsx` (需刪除)
- `src/components/CatalogMatrix.tsx` (需刪除)
- `src/types/catalog.ts` (需刪除)
- `src/data/` 內多個 `.json` 檔及 `catalogIndex.ts` (需刪除)
