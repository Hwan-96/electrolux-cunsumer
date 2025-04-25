# 위치 정보 표준화 개선사항

## 개요
프로젝트에서 위치 정보(시도/시군구)에 관련된 모든 코드를 하나의 표준화된 데이터 소스(`sidosigungu_202504.json`)를 사용하도록 리팩토링했습니다.

## 주요 변경사항

### 1. src/utils/regionData.js
- `sidosigungu_202504.json` 파일을 사용하여 모든 지역 정보 데이터 관리
- 일반 사용자 및 관리자를 위한 데이터 포맷 변환 함수 제공
- 다양한 유틸리티 함수 제공:
  - `regionData`, `cityData`: 기본 데이터 객체
  - `getCitiesByRegion()`: 지역별 시군구 목록 반환
  - `getAllRegions()`: 모든 지역 목록 반환
  - `getAllCitiesByRegion()`: 특정 지역의 모든 시군구 반환
  - `getAdminRegionOptions()`: 관리자용 지역 옵션 (전체 포함)
  - `getAdminCityOptions()`: 관리자용 시군구 옵션 (전체 포함)

### 2. 사용자 단 컴포넌트 업데이트
- `FindCenter.jsx`: 메인 페이지 서비스 센터 찾기 컴포넌트
- `CenterSearch.jsx`: 서비스 센터 검색 메인 페이지
- `CenterSearchOpts.jsx`: 서비스 센터 검색 옵션 컴포넌트

### 3. 관리자 단 업데이트
- `regionStore.js`: 관리자 지역 상태 관리 스토어
- `centerListSearch.js`: 서비스 센터 검색 유틸리티

### 4. API 서비스 업데이트
- `api.js`: API 요청 시 Mock 데이터 사용 시 표준화된 지역 데이터 사용

## 관리자 서비스센터 데이터와 사용자 검색 연동

### 변경사항
- `mockApi.js`: 관리자 페이지에서 등록한 서비스센터 데이터를 사용하도록 수정
- `CenterList.jsx`: 관리자 데이터 형식에 맞게 표시 방식 수정
- `CenterInfo.jsx`: 서비스센터 상세 정보 팝업 컴포넌트 개선
  - 관리자에서 등록한 URL을 지도에 표시
  - 우편번호 및 주소 형식 자동 파싱

### 데이터 흐름
1. 관리자 페이지에서 서비스센터 데이터 등록/수정/삭제
2. `MOCK_CenterList.js`에 데이터 저장
3. 사용자 검색 시 `mockApi.js`를 통해 관리자 데이터 조회
4. `CenterList.jsx`에서 데이터 표시

### 이점
1. **데이터 일관성**: 관리자가 등록한 서비스센터만 사용자 검색에 표시
2. **편리한 관리**: 관리자 페이지에서 데이터 관리 가능
3. **표준화된 형식**: 지역명, 시군구명을 표준화하여 정확한 검색 제공
4. **연동된 UI**: 약도 URL을 활용한 더 나은 사용자 경험

## 이점
1. **데이터 일관성**: 프로젝트 전체에서 동일한 지역 정보 사용
2. **유지보수 용이성**: 지역 정보 업데이트 시 한 곳만 수정
3. **사용성 개선**: 최신 지역 정보 제공으로 사용자 경험 향상
4. **코드 중복 제거**: 여러 컴포넌트에서 중복된 지역 데이터 제거

## 사용법

### 일반 컴포넌트에서 사용
```jsx
import { regionData, getCitiesByRegion } from '@/utils/regionData';

// 지역 데이터 사용
const regions = regionData;

// 특정 지역의 시군구 목록 가져오기
const cities = getCitiesByRegion('서울특별시');
```

### 관리자 컴포넌트에서 사용
```jsx
import useRegionStore from '@/components/admin/store/regionStore';

// regionStore 사용
const { 
  getRegionOptions, 
  getCityOptions, 
  selectedRegion, 
  setSelectedRegion 
} = useRegionStore();

// 지역 옵션 가져오기 (전체 포함)
const regionOptions = getRegionOptions();

// 시군구 옵션 가져오기 (전체 포함)
const cityOptions = getCityOptions(selectedRegion);
``` 