let MOCK_DATA = [
  {
    "key": 1,
    "id": 1,
    "title": "온라인 상담 문의입니다.",
    "consumerNm": "홍길동",
    "phone": "010-1234-5678",
    "createdAt": "2024-03-20",
    "status": "pending",
    "counselor": "-",
    "answeredAt": null,
    "content": "온라인 상담 문의입니다.",
    "file": ["/vite.svg", "/admin/header_logo.png"],
  },
  {
    "key": 2,
    "id": 2,
    "title": "제품 사용법에 대해 문의드립니다.",
    "consumerNm": "김철수",
    "phone": "010-2345-6789",
    "createdAt": "2024-03-19",
    "status": "completed",
    "counselor": "이상담",
    "answeredAt": "2024-03-19"
  },
  {
    "key": 3,
    "id": 3,
    "title": "A/S 신청 관련 문의",
    "consumerNm": "이영희",
    "phone": "010-3456-7890",
    "createdAt": "2024-03-18",
    "status": "pending",
    "counselor": "-",
    "answeredAt": null
  },
  {
    "key": 4,
    "id": 4,
    "title": "제품 구매 문의",
    "consumerNm": "박민수",
    "phone": "010-4567-8901",
    "createdAt": "2024-03-17",
    "status": "completed",
    "counselor": "김상담",
    "answeredAt": "2024-03-17"
  },
  {
    "key": 5,
    "id": 5,
    "title": "제품 교체 문의",
    "consumerNm": "정지원",
    "phone": "010-5678-9012",
    "createdAt": "2024-03-16",
    "status": "pending",
    "counselor": "-",
    "answeredAt": null
  },
  {
    "key": 6,
    "id": 6,
    "title": "제품 교체 문의",
    "consumerNm": "정지원",
    "phone": "010-5678-9012",
    "createdAt": "2024-03-16",
    "status": "pending",
    "counselor": "-",
    "answeredAt": null
  },
  {
    "key": 7,
    "id": 7,
    "title": "제품 교체 문의",
    "consumerNm": "정지원",
    "phone": "010-5678-9012",
    "createdAt": "2024-03-16",
    "status": "pending",
    "counselor": "-",
    "answeredAt": null
  },
  {
    "key": 8,
    "id": 8,
    "title": "제품 교체 문의",
    "consumerNm": "정지원",
    "phone": "010-5678-9012",
    "createdAt": "2024-03-16",
    "status": "pending",
    "counselor": "-",
    "answeredAt": null
  },
  {
    "key": 9,
    "id": 9,
    "title": "제품 교체 문의",
    "consumerNm": "정지원",
    "phone": "010-5678-9012",
    "createdAt": "2024-03-16",
    "status": "pending",
    "counselor": "-",
    "answeredAt": null
  },
  {
    "key": 10,
    "id": 10,
    "title": "제품 교체 문의",
    "consumerNm": "정지원",
    "phone": "010-5678-9012",
    "createdAt": "2024-03-16",
    "status": "pending",
    "counselor": "-",
    "answeredAt": null
  },
  {
    "key": 11,
    "id": 11,
    "title": "제품 교체 문의",
    "consumerNm": "정지원",
    "phone": "010-5678-9012",
    "createdAt": "2024-03-16",
    "status": "pending",
    "counselor": "-",
    "answeredAt": null
  },
  {
    "key": 12,
    "id": 12,
    "title": "제품 교체 문의",
    "consumerNm": "정지원",
    "phone": "010-5678-9012",
    "createdAt": "2024-03-16",
    "status": "pending",
    "counselor": "-",
    "answeredAt": null
  }
];

export const updateMockData = (id, updates) => {
  MOCK_DATA = MOCK_DATA.map(item => 
    item.id === id ? { ...item, ...updates } : item
  );
};

export const deleteMockData = (id) => {
  MOCK_DATA = MOCK_DATA.filter(item => item.id !== id);
};

export const getMockData = () => MOCK_DATA;

export default MOCK_DATA;