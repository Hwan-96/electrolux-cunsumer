// 로고 이미지
import logoMain from '@/images/logo.png';
import logoFooter from '@/images/flogo.png';

export const logoImages = {
  main: logoMain,
  footer: logoFooter
};

import visualPc1 from '@/images/visual/pc/01.jpg';
import visualPc2 from '@/images/visual/pc/02.jpg';
import visualPc3 from '@/images/visual/pc/03.jpg';
import visualPc4 from '@/images/visual/pc/04.jpg';
import visualMo1 from '@/images/visual/mo/01.jpg';
import visualMo2 from '@/images/visual/mo/02.jpg';
import visualMo3 from '@/images/visual/mo/03.jpg';
import visualMo4 from '@/images/visual/mo/04.jpg';

// 메인 비주얼 이미지
export const mainVisualImages = [
  {
    pc: visualPc1,
    mo: visualMo1
  },
  {
    pc: visualPc2,
    mo: visualMo2
  },
  {
    pc: visualPc3,
    mo: visualMo3
  },
  {
    pc: visualPc4,
    mo: visualMo4
  }
];

// 메인 중간 배너 이미지
import banner1 from '@/images/visual/banner/01.jpg';
import banner2 from '@/images/visual/banner/02.jpg';

export const mainBannerImages = {
  banner1,
  banner2
};

// 메인 비디오 이미지
import videoPoster from '@/images/main-vid-poster.jpg';
export const mainVideoImage = videoPoster;

// 메인 비디오 URL
export const mainVideoUrl = 'https://www.youtube.com/embed/5BqtcCOvIgU?si=TBRds8rfR7A5D42S';

// 메인 게시판 데이터
import boardIntegrated from '@/images/main_bd_01_2024.jpg';
import boardWireless from '@/images/main_bd_02_2024.jpg';
import boardWired from '@/images/main_bd_03_2024.jpg';
import boardRobot from '@/images/main_bd_04_2024.jpg';
import boardAirPurifier from '@/images/main_bd_05_2024.jpg';
import boardSmallAppliance from '@/images/main_bd_06_2024.jpg';
import boardDishwasher from '@/images/main_bd_07_2024.jpg';
import boardInduction from '@/images/main_bd_08_2024.jpg';
export const mainBoardData = [
  {
    title: '통합',
    image: boardIntegrated,
    link: '/faq'
  },
  {
    title: '무선 청소기',
    image: boardWireless,
    link: '/faq?productType=무선청소기'
  },
  {
    title: '유선 청소기',
    image: boardWired,
    link: '/faq?productType=유선청소기'
  },
  {
    title: '로봇 청소기',
    image: boardRobot,
    link: '/faq?productType=로봇청소기'
  },
  {
    title: '공기 청정기',
    image: boardAirPurifier,
    link: '/faq?productType=공기청정기'
  },
  {
    title: '소형가전',
    image: boardSmallAppliance,
    link: '/faq?productType=소형가전'
  },
  {
    title: '식기세척기',
    image: boardDishwasher,
    link: '/faq?productType=식기세척기'
  },
  {
    title: '인덕션',
    image: boardInduction,
    link: '/faq?productType=인덕션'
  }
];

// 메인 중간 배너 데이터
export const mainBannerData = [
  {
    id: 'banner1',
    image: mainBannerImages.banner1,
    link: 'https://www.electrolux.co.kr/',
    title: ''
  },
  {
    id: 'banner2',
    image: mainBannerImages.banner2,
    link: 'https://www.electrolux.co.kr/',
    title: ''
  }
];

// 서비스센터 데이터
import centerAdmin1 from '@/images/center_admin/admin_1.jpg';
import centerAdmin2 from '@/images/center_admin/admin_2.jpg';
export const centerAdmin = [
  {
    id: 1,
    name: '위니아에이드 강릉센터',
    src: 'https://www.winiaaid.com/support/service/detail/588',
    image: null,
    address: '강원 강릉시 가작로 290 (포남동) 1층',
    phone: '0505-339-1238',
    desc: null,
    time: null,
    lunchtime: null,
    holiday: null,
  },
  {
    id: 2,
    name: '일렉트로룩스 강릉센터',
    src: null,
    image: centerAdmin1,
    address: '강원 강릉시 가작로 290 (포남동) 1층',
    phone: '1566-1588',
    desc: '안녕하십니까? 원주 서비스센터 소장 OOO입니다. 항상 고객만족을 최우선으로 일하겠습니다.',
    time: '평일 09:00 ~ 18:00',
    lunchtime: '12:00 ~ 13:00',
  },
  {
    id: 3,
    name: '위니아에이드 원주센터',
    src: 'https://www.winiaaid.com/support/service/detail/487',
    image: null,
    address: '강원 원주시 나비허리길 57-1 (단구동, 신성미소지움아파트) 2층',
    phone: '1566-1588',
    desc: null,
    time: null,
    lunchtime: null,
    holiday: null,
  },
  {
    id: 4,
    name: '일렉트로룩스 원주센터',
    src: null,
    image: centerAdmin2,
    address: '강원 춘천시 공지로 133 (석사동) 3층',
    phone: '1566-1588',
    desc: '안녕하십니까? 춘천 서비스센터 소장 OOO입니다. 항상 고객만족을 최우선으로 일하겠습니다.',
    time: '평일 09:00 ~ 18:00',
    lunchtime: '12:00 ~ 13:00',
  },
]

// FAQ 이미지 임포트
import faqImg1 from '@/images/faq_link_01_2024.jpg';
import faqImg2 from '@/images/faq_link_02_2024.jpg';
import faqImg3 from '@/images/faq_link_03_2024.jpg';
import faqImg4 from '@/images/faq_link_04_2024.jpg';
import faqImg5 from '@/images/faq_link_05_2024.jpg';
import faqImg6 from '@/images/faq_link_06_2024.jpg';
import faqImg7 from '@/images/faq_link_07_2024.jpg';
import faqImg8 from '@/images/faq_link_08_2024.jpg';

export const faqImages = [faqImg1, faqImg2, faqImg3, faqImg4, faqImg5, faqImg6, faqImg7, faqImg8];
