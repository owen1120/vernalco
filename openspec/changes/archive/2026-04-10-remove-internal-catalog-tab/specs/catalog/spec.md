## REMOVED Requirements

### Requirement: Internal Catalog Functionality
**Reason**: 內部型錄功能已不再需要，為簡化專案架構並確保程式碼庫乾淨整潔。
**Migration**: 無，此功能已被完全移除。

#### Scenario: User tries to access catalog
- **WHEN** user tries to navigate to `/catalog/:category`
- **THEN** system should no longer offer this route and should not display any link in navbar
