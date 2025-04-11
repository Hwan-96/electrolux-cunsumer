import React from 'react';
import ServiceLayout from './ServiceLayout';

const Warranty = () => {
  return (
    <ServiceLayout currentPage="제품의 보증기간" activeTab="warranty" title="제품의 보증기간">
      <div className="warranty-wrap">
        <p class="subj-txt1 txt1">일렉트로룩스 코리아에서는 품목별 소비자분쟁해결기준(공정거래위원회 고시)에 따라 아래와 같이 제품에 대한 보증을 실시 합니다.</p>
        <h3 class="subj-tit1 tit1">제품의 보증기간</h3>

        <table class="type1 view1 num ta1">
          <caption></caption>

          <tbody>
            <tr>
              <th scope="row" class="w1">1</th>
              <td class="w2">제품 보증기간이라 함은 제조사 또는 제품 판매자가 소비자에게 정상적인 상태에서 자연 발생한 품질, <br />성능, 기능 하자에 대하여 무료수리를 해주겠다고
                약속 기간을 말한다.</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>
                제품의 보증기간은 구입일자를 기준으로 산정하며, 구입일자의 확인은 제품보증서(구입영수증포함)에 의해서 한다. <br />
                단 보증서가 없는 경우는 동 제품의 생산 당시 회사가 발행한 보증서 내용에 준하여 보증 조건을 결정하며, <br />
                생산년월에 3개월 감안(유통기간반영)하여 구입일자를 적용하여 보증기간을 산정한다.
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>
                다음의 경우는 보증기간이 6개월로 단축 적용한 것이다.<br />
                <ol>
                  <li>① 영업용도나 영업장에서 사용할 경우. (단,영업용 제품은 제외) 예) 전기청소기 등</li>
                  <li>② 차량,선박 등에 탑재하는 등 정상적인 사용환경이 아닌 곳에서 사용할 경우.</li>
                  <li>③ 제품사용 빈도가 극히 많은 공공장소에 설치 사용할 경우. 예) 공장, 기숙사 등</li>
                  <li>④ 기타 생산활동 등 가정용 이외의 용도로 사용될 경우. 예) 공장, 기숙사 등</li>
                </ol>
              </td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>중고품(전파상구입, 모조품)구입의 보증기간은 적용되지 않으며, 수리불가의 경우는 피해보상의 책임을 지지않는다.</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>당사와 별도 계약에 한하여 납품되는 제품의 보증은 그 계약 내용을 기준으로 한다.</td>
            </tr>
          </tbody>
        </table>

        <h3 class="subj-tit1 tit1">품목별 보증기간</h3>
        <table class="type1 view2 ta2">
          <caption></caption>

          <thead>
            <tr>
              <th scope="col" class="w1">구분</th>
              <th scope="col" class="w2">보증기간</th>
              <th scope="col" class="w3">관련제품</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th scope="row">일반제품</th>
              <td class="tac">6개월</td>
              <td>
                복사기<br />
                ※기본 6개월이며, 인쇄 매수에 따라 단축 될수 있음.
              </td>
            </tr>
            <tr>
              <th scope="row">계절성 제품</th>
              <td class="tac">1년</td>
              <td><span class="fc-blue01 b">전제품</span></td>
            </tr>
            <tr>
              <th scope="row" rowspan="5">핵심부품</th>
              <td class="tac">2년</td>
              <td>에어컨, 선풍기, 온풍기, 로터리히터, 팬히터</td>
            </tr>
            <tr>
              <td class="tac">10년</td>
              <td class="fc-blue01 b">
                세탁 MOTOR<br />

                <ul class="bl-bar">
                  <li>드럼세탁기 : ‘08.1월 제조분부터</li>
                  <li>전자동세탁기 : ‘11.2월 제조분부터</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="tac">4년</td>
              <td class="">
                CRT [CTV, 모니터]<br />
                ※ 모니터는 소비자가 확인 가능한 타이머가 부착된 제품으로<br />
                1만 시간을 초과한 경우에는 보증 기간이 만료된 것으로 함<br />
                콤프레셔 [냉장고, 에어컨, 김치독]<br />
                ※ 단, 자판기 콤프는 제외(1년)
              </td>
            </tr>
            <tr>
              <td class="tac">3년</td>
              <td class="">
                C일반모터[세탁기], 마그네트론[전자렌지], 메인보드[PC],<br />
                헤드드럼[VTR/CAM], 버너[로터리/팬히터]
              </td>
            </tr>
            <tr>
              <td class="tac">2년</td>
              <td class="">
                PDP 패널 [PDP, DID]<br />
                LCD 패널 [LTV, LCD모니터, DID]<br />
                ※ 단, 노트북 LCD 패널은 제외
              </td>
            </tr>
          </tbody>
        </table>

        <div class="subj-txt1 txt2">
          <span class="fc-blue01 b">※ 예외사항</span><br />
          * 영업용의 경우 보증기간 6개월 적용
        </div>

        <div class="hscr_box">
          <div class="scr_area">
            <table class="type1 view2 ta3 tac">
              <caption></caption>

              <thead>
                <tr>
                  <th scope="col" colspan="2" class="w1">변경 항목</th>
                  <th scope="col" class="w2">내 용</th>
                  <th scope="col" class="w3">개정 전</th>
                  <th scope="col" class="w4">개정 후</th>
                  <th scope="col" class="w5">적용 제조월</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th scope="row" colspan="2" rowspan="3">핵심부품<br />보증기간</th>
                  <td class="tal">
                    <ul class="bl-bar">
                      <li>TV/모니터 CRT, 일반 냉장고/김치독 콤프레서</li>
                    </ul>
                  </td>
                  <td>4년</td>
                  <td class="b">3년</td>
                  <td rowspan="2">'09.2월<br />제조원 ~</td>
                </tr>
                <tr>
                  <td class="tal">
                    <ul class="bl-bar">
                      <li>컴퓨터 마더보드</li>
                    </ul>
                  </td>
                  <td>3년</td>
                  <td class="b">2년</td>
                </tr>
                <tr>
                  <td class="tal">
                    <ul class="bl-bar">
                      <li>양문형냉장고/스탠드형김치독 인버터 콤프레셔</li>
                    </ul>
                  </td>
                  <td>3년</td>
                  <td class="b">10년</td>
                  <td>'09.11월<br />제조원 ~</td>
                </tr>
                <tr>
                  <th scope="row" colspan="2">계절성 제품</th>
                  <td class="tal fc-blue01 b">
                    <ul class="bl-bar">
                      <li>가습기</li>
                    </ul>
                  </td>
                  <td>2년</td>
                  <td class="b">1년</td>
                  <td>'09.2월<br />제조원 ~</td>
                </tr>
                <tr>
                  <th scope="row" rowspan="4">제품<br />내용<br />년수</th>
                  <th scope="row" rowspan="3">연장<br />13개 품목</th>
                  <td class="tal fc-blue01 b">
                    <ul class="bl-bar">
                      <li>가습기, 정수기</li>
                    </ul>
                  </td>
                  <td>5년</td>
                  <td class="b">7년</td>
                  <td rowspan="3">'09.1월<br />제조원 ~</td>
                </tr>
                <tr>
                  <td class="tal">
                    <ul class="bl-bar">
                      <li>VTR, DVD플레이어, 전기(가스)오븐, 비데,</li>
                      <li>가스레인지, 유무선전화기, 냉온수기, 캠코더, 홈시어터</li>
                    </ul>
                  </td>
                  <td>5년</td>
                  <td class="b">6년</td>
                </tr>
                <tr>
                  <td class="tal">
                    <ul class="bl-bar">
                      <li>전기압력밥솥, 믹서기</li>
                    </ul>
                  </td>
                  <td>4년</td>
                  <td class="b">6년</td>
                </tr>
                <tr>
                  <th scope="row" class="bdl-gr">단축 3개<br />품목</th>
                  <td class="tal">
                    <ul class="bl-bar">
                      <li>MP3, 카세트, CD플레이어</li>
                    </ul>
                  </td>
                  <td>5년</td>
                  <td class="b">4년</td>
                  <td>'09.1월<br />제조원 ~</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3 class="subj-tit1 tit1">부품별 보증기간</h3>
        <p class="subj-txt1 txt2">부품보증이라 함은 제품을 구성하는 각 부품에 대한 품질 보증을 말하며 그 기간은 다음과 같다.</p>
        <table class="type1 view1 num ta1">
          <caption></caption>
          <tbody>
            <tr>
              <th scope="row" class="w1">1</th>
              <td class="w2">당사에서 지정한 서비스 엔지니어 또는 당사의 수리자격을 취득한 자가 수리한 제품이 3개월 이내<br />동일 부위에 하자가 발생한 경우 무상으로 처리한다.
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>유상 또는 보증 이내 무상으로 교체한 부품의 경우 3개월 이내 자연적인 사용상태에서의<br />재 고장이 발생하여 교체할 경우는 무상으로 수리한다.</td>
            </tr>
          </tbody>
        </table>

        <h3 class="subj-tit1 tit1">세부항목별 내구년수</h3>
        <table class="type1 view2 tac ta4">
          <caption></caption>

          <thead>
            <tr>
              <th scope="col" rowspan="2" class="w1">품목</th>
              <th scope="col" colspan="2" class="w1-2 bdl-gr">내용년수</th>
            </tr>
            <tr>
              <th scope="col" class="w2 bdl-gr">종전</th>
              <th scope="col" class="w3  bdl-gr">개정</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td class="tal bln">
                <ul class="bl-bar">
                  <li>TV, 냉장고, 에어컨, 전축, 전자렌지, 제습기, 보일러</li>
                </ul>
              </td>
              <td class="b">7년</td>
              <td class="b" rowspan="2">7년</td>
            </tr>
            <tr>
              <td class="tal bln">
                <ul class="bl-bar">
                  <li>가습기, 정수기, 전기청소기</li>
                </ul>
              </td>
              <td class="b">5년</td>
            </tr>
            <tr>
              <td class="tal bln">
                <ul class="bl-bar">
                  <li>전기온수기, 족욕기</li>
                </ul>
              </td>
              <td class="b">6년</td>
              <td class="b" rowspan="3">6년</td>
            </tr>
            <tr>
              <td class="tal bln">
                <ul class="bl-bar">
                  <li>전기압력밥솥, 믹서기</li>
                </ul>
              </td>
              <td class="b">4년</td>
            </tr>
            <tr>
              <td class="tal bln">
                <ul class="bl-bar">
                  <li>비디오플레이어, DVD 플레이어, 전기(가스)오븐, 비데</li>
                  <li>가스레인지, 유ㆍ무선전화기, 냉온수기, 캠코더, 홈시어터</li>
                </ul>
              </td>
              <td class="b">5년</td>
            </tr>
            <tr>
              <td class="tal bln">
                <ul class="bl-bar">
                  <li>선풍기, 냉풍기, 전기장판, 세탁기, 카메라, 디지털피아노</li>
                  <li>네비게이션, 난로(전기, 가스, 기름)</li>
                </ul>
              </td>
              <td class="b">5년</td>
              <td class="b">5년</td>
            </tr>
            <tr>
              <td class="tal bln">
                <ul class="bl-bar">
                  <li>퍼스널 컴퓨터(완성품) 및 주변기기, 노트북PC</li>
                </ul>
              </td>
              <td class="b">4년</td>
              <td class="b" rowspan="2">4년</td>
            </tr>
            <tr>
              <td class="tal bln">
                <ul class="bl-bar">
                  <li>휴대용음향기기(MP3, 카세트, CD 플레이어)</li>
                </ul>
              </td>
              <td class="b">5년</td>
            </tr>
            <tr>
              <td class="tal bln">
                <ul class="bl-bar">
                  <li>휴대폰, 전기면도기, 헤어드라이어</li>
                  <li>전기조리기기(멀티쿠커, 튀김기, 다용도식품조리기, 전기토스터, 전기냄비, 전기프라이팬 등)</li>
                </ul>
              </td>
              <td class="b">3년</td>
              <td class="b">3년</td>
            </tr>
            <tr>
              <td class="tal bln">
                <ul class="bl-bar">
                  <li>별도의 기간을 정하지 않은 경우</li>
                </ul>
              </td>
              <td class="b">5년</td>
              <td class="b">5년</td>
            </tr>
          </tbody>
        </table>

        <p class="subj-txt1">※ 제품별 부품보유기간은 제품의 잔존가 산출시 사용되며, “개정” 내용은 ‘2009년 1월 16일’ 부터 적용됩니다.</p>
      </div>
    </ServiceLayout>
  );
};

export default Warranty;
