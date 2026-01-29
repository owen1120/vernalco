// src/data/cardsData.js

export const cardsData = [
  // 特殊變體
  {
    id: 'wu', 
    type: 'vernal', 
    layout: 'kanji', 
    nameData: [ 
      { kanji: '呉', furigana: 'ゴ' },
      { kanji: '中', furigana: 'チュウ' },
      { kanji: '軒', furigana: 'ケン' }
    ],
    dept: 'Overseas Dept.',
    // title: '', 
    phones: {
      tel: '+886-4-2487-2233',
      fax: '+886-4-2487-0022'
    },
    emails: [
      { address: 'service@vernal.tw', label: '代表' },
      { address: 'c.h-wu@vernal.tw', label: '直通' } 
    ],
    address: 'No. 808, Sec. 5 Huanzhong E. Rd., Dali Dist., Taichung City 41252, Taiwan',
    downloadLink: 'https://drive.google.com/file/d/1_Q6if5kAkDFtn49SohRYt643Cn4MzyZ3/view?usp=sharing' 
  },

  // 結構 A
  {
    id: 'kuo',
    type: 'vernal',
    layout: 'kanji',
    nameData: [
      { kanji: '郭', furigana: 'カク' },
      { kanji: '田', furigana: '' }, 
      { kanji: '坤', furigana: '' }
    ],
    dept: 'Engineering Dept.',
    title: 'Manager',
    phones: {
      tel: '+886-4-2487-2233',
      fax: '+886-4-2487-0022'
    },
    emails: [
      { address: 'service@vernal.tw' }
    ],
    address: 'No. 808, Sec. 5 Huanzhong E. Rd., Dali Dist., Taichung City 41252, Taiwan',
    downloadLink: 'https://drive.google.com/file/d/1gIeK39aK_jwAiA2i0qrekQ0r0146kJr3/view?usp=sharing' 
  },

  {
    id: 'alice', 
    type: 'vernal', 
    layout: 'kanji', 
    
    nameData: [
      { kanji: '劉', furigana: 'リュウ' }, 
      { kanji: '晴', furigana: '' }, 
      { kanji: '萍', furigana: '' } 
    ],
    
    dept: 'Overseas Dept.',
    title: null, 
    
    phones: {
      tel: '+886-4-2487-2233',
      fax: '+886-4-2487-0022'
    },
    emails: [
      { address: 'service@vernal.tw' }
    ],
    address: 'No. 808, Sec. 5 Huanzhong E. Rd., Dali Dist., Taichung City 41252, Taiwan',
    downloadLink: 'https://drive.google.com/file/d/1id_QB7PO26_xHrGU2woYu8Y7QsWocbGx/view?usp=sharing' 
  },

  // 結構 B
  {
    id: 'lin',
    type: 'vernalco', 
    layout: 'english', 
    nameEn: 'Chi-Li Lin',
    dept: 'Engineering Dept. / Section 1',
    title: 'Section Manager',
    phones: {
      tel: '+886-4-2487-2233',
      fax: '+886-4-2487-0022'
    },
    emails: [
      { address: 'service@vernal.tw' }
    ],
    address: 'No. 808, Sec. 5 Huanzhong E. Rd., Dali Dist., Taichung City 41252, Taiwan',
    downloadLink: 'https://drive.google.com/file/d/147uW7PVIO3uAPbZvvkKZMWgY1RBpc3ST/view?usp=sharing'
  }
];