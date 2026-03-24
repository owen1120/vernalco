// 1. 共用的部分：電話和 Email 的結構
export interface PhoneNumbers {
  tel: string;
  fax: string;
}

export interface EmailAddress {
  address: string;
  label?: string; 
}

// 2. 漢字名字的結構 (vernal 專用)
export interface KanjiName {
  kanji: string;
  furigana: string;
}

// 3. 共通的基礎屬性
interface BaseCard {
  id: string;
  dept: string;
  title: string | null; 
  phones: PhoneNumbers;
  emails: EmailAddress[];
  address: string;
  downloadLink: string;
}

// 4. 'vernal' 類型的專屬結構
export interface VernalCard extends BaseCard {
  type: 'vernal'; 
  layout: 'kanji';
  nameEn?: string; 
  nameData: KanjiName[];
}

// 5. 'vernalco' 類型的專屬結構
export interface VernalcoCard extends BaseCard {
  type: 'vernalco'; 
  layout: 'english';
  nameEn: string; 
  nameData?: never; 
}

// 6. 型別
export type BusinessCardData = VernalCard | VernalcoCard;