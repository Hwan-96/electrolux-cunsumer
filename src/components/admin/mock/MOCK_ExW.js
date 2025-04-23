// ExW 모의 데이터
let MOCK_DATA = [
  {
    id: 1,
    name: '김철수',
    phone: '010-1234-5678',
    address: '서울시 강남구 테헤란로 123',
    email: 'chulsoo@gmail.com',
    model: 'UltraCare 9000',
    category: '청소기',
    baseWarranty: 12,
    extendedWarranty: 24,
    purchaseDate: '2023-01-15',
    deliveryDate: '2023-01-20',
    effectiveDate: '2023-01-20',
    exwEndDate: '2025-01-20'
  },
  {
    id: 2,
    name: '이영희',
    phone: '010-2345-6789',
    address: '서울시 서초구 방배로 45',
    email: 'younghee@naver.com',
    model: 'ElectroLux A700',
    category: '냉장고',
    baseWarranty: 24,
    extendedWarranty: 36,
    purchaseDate: '2022-11-10',
    deliveryDate: '2022-11-15',
    effectiveDate: '2022-11-15',
    exwEndDate: '2025-11-15'
  },
  {
    id: 3,
    name: '박지민',
    phone: '010-3456-7890',
    address: '경기도 성남시 분당구 판교로 123',
    email: 'jimin@daum.net',
    model: 'QuickCook 5000',
    category: '인덕션',
    baseWarranty: 18,
    extendedWarranty: 12,
    purchaseDate: '2023-03-20',
    deliveryDate: '2023-03-25',
    effectiveDate: '2023-03-25',
    exwEndDate: '2025-03-25'
  },
  {
    id: 4,
    name: '최수진',
    phone: '010-4567-8901',
    address: '인천시 연수구 송도동 123',
    email: 'sujin@gmail.com',
    model: 'CoolAir Pro',
    category: '에어컨',
    baseWarranty: 12,
    extendedWarranty: 24,
    purchaseDate: '2022-06-15',
    deliveryDate: '2022-06-20',
    effectiveDate: '2022-06-20',
    exwEndDate: '2024-06-20'
  },
  {
    id: 5,
    name: '정민호',
    phone: '010-5678-9012',
    address: '부산시 해운대구 해운대로 123',
    email: 'minho@naver.com',
    model: 'CleanWash 800',
    category: '세탁기',
    baseWarranty: 24,
    extendedWarranty: 36,
    purchaseDate: '2023-05-05',
    deliveryDate: '2023-05-10',
    effectiveDate: '2023-05-10',
    exwEndDate: '2026-05-10'
  }
];

export const getMockData = () => {
  return MOCK_DATA;
};

export const deleteMockData = (id) => {
  MOCK_DATA = MOCK_DATA.filter(item => item.id !== id);
};

export const updateMockData = (id, data) => {
  MOCK_DATA = MOCK_DATA.map(item => {
    if (item.id === id) {
      return { ...item, ...data };
    }
    return item;
  });
};

export const addMockData = (data) => {
  const newId = Math.max(...MOCK_DATA.map(item => item.id), 0) + 1;
  MOCK_DATA.push({ ...data, id: newId });
}; 