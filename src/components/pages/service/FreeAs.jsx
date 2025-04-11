import React from 'react';
import ServiceLayout from './ServiceLayout';

const FreeAs = () => {
  return (
    <ServiceLayout currentPage="유ㆍ무상 기준" activeTab="free_as" title="유ㆍ무상 기준">
      <div className="free-as-wrap">
        <p className="subj-txt1 txt1">
          고장이 아닌 경우 서비스를 요청하시면 출장요금이 부과되므로 반드시 사용설명서를 읽어주시고, 설명서로 미해결 시 
          <span className="fc-blue01 b">전문상담(<a href="tel:1566-1238" className="fc-blue01">1566-1238</a>)</span>을 받아 보시길 권장합니다.
        </p>

        <table className="type1 view1 num ta1">
          <tbody>
            <tr>
              <th scope="row" className="w1">1</th>
              <td className="w2">
                <p className="b">무상수리</p>
                <p className="fc-blue01 b">품질보증 기간 이내에 정상적인 사용상태에서 발생되는 성능, 기능상의 고장인 경우 일렉트로룩스 코리아에서 지정한 서비스 엔지니어가
                  수리한 후 3개월 이내 동일 부위 재고장 발생시 무상수리를 진행합니다.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>
                <p className="b">유상수리</p>
                <ul className="bl-bar">
                  <li>보증기간이 경과된 제품</li>
                  <li>사용설명 및 분해하지 않고 간단한 조정시</li>
                  <li>인터넷, 안테나, 유선신호등 외부환경 문제시</li>
                  <li>배송된 제품의 초기 및 판매점(고객)에서 부실하게 설치해 주어 재설치시</li>
                  <li>제품의 이동,이사 등으로 인한 설치 변경시</li>
                  <li>제품 내부의 먼지, 헤드 등의 세척 및 이물 제거시</li>
                  <li>타사 제품 (소프트웨어 포함)으로 인한 고장 발생시</li>
                  <li>사용설명서 내에 주의사항을 지키지 않아 고장 발생시</li>
                  <li>전기 용량을 틀리게 사용하여 고장이 발생된 경우</li>
                  <li>당사에서 지정하지 않은 소모품이나 옵션품으로 발생된 고장의 경우</li>
                  <li className="fc-blue01 b">일렉트로룩스 코리아에서 지정한 서비스 엔지니어가 아닌 사람이 수리하여 고장이 발생한 경우</li>
                  <li>외부 충격이나 떨어뜨림 등에 의한 고장, 손상 발생시</li>
                  <li>천재 지변(낙뢰,화재,지진,풍수해,해일 등)으로 인한 고장의 경우</li>
                  <li>소모성 부품의 수명이 다한 경우(배터리, 형광등, 헤드, 필터류, 램프류, 토너, 잉크 등)</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ServiceLayout>
  );
};

export default FreeAs;
