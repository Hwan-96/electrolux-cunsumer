import visualPc1 from '/images/visual/pc/01.jpg';
import visualPc2 from '/images/visual/pc/02.jpg';
import visualPc3 from '/images/visual/pc/03.jpg';
import visualPc4 from '/images/visual/pc/04.jpg';
import visualMo1 from '/images/visual/mo/01.jpg';
import visualMo2 from '/images/visual/mo/02.jpg';
import visualMo3 from '/images/visual/mo/03.jpg';
import visualMo4 from '/images/visual/mo/04.jpg';

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
import banner1 from '/images/visual/banner/01.jpg';
import banner2 from '/images/visual/banner/02.jpg';

export const mainBannerImages = {
  banner1,
  banner2
};

// 메인 비디오 이미지
import videoPoster from '/images/main-vid-poster.jpg';
export const mainVideoImage = videoPoster;

// 메인 비디오 URL
export const mainVideoUrl = 'https://www.youtube.com/embed/5BqtcCOvIgU?si=TBRds8rfR7A5D42S';

// 메인 게시판 데이터
import boardIntegrated from '/images/main_bd_01_2024.jpg';
import boardWireless from '/images/main_bd_02_2024.jpg';
import boardWired from '/images/main_bd_03_2024.jpg';
import boardRobot from '/images/main_bd_04_2024.jpg';
import boardAirPurifier from '/images/main_bd_05_2024.jpg';
import boardSmallAppliance from '/images/main_bd_06_2024.jpg';
import boardDishwasher from '/images/main_bd_07_2024.jpg';
import boardInduction from '/images/main_bd_08_2024.jpg';
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