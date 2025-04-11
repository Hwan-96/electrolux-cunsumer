import React from 'react';
import ServiceLayout from './ServiceLayout';

const AsCharge = () => {
  return (
    <ServiceLayout currentPage="수리요금 구성" activeTab="as_charge" title="서비스 정책 안내">
      <div className="charge-wrap">
        <ul className="charge-sum">
          <li className="ico ico1"><span>부품비</span></li>
          <li className="ico ico2"><span>수리비</span></li>
          <li className="ico ico3"><span>출장비</span></li>
        </ul>

        <p className="txt1">※ 서비스 요금은 부품비와 수리비 출장비의 합계액으로 구성되며 각 요금의 결정은 다음과 같습니다.</p>

        <ul className="detail-info">
          <li>
            <dl>
              <dt className="ico1"><span>부품비</span></dt>
              <dd>부품비는 완제품을 수리하는데 부품 교체를 할 경우 소요되는 부품가격을 말합니다. <br/>부품가는 부가세 10%가 포함된 가격입니다.</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt className="ico2"><span>수리비</span></dt>
              <dd>
                수리비는 유료 수리시 부품비를 제외한 기술료(외근시는 출장비 포함)를 말하며
                수리시 소요시간,난이도 등을 감안한 기준공수에 의해 산정합니다.
              </dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt className="ico3"><span>출장비</span></dt>
              <dd>출장비는 출장수리를 요구하는 경우에 적용되며 제품수리와 상관없이 20,000원을 청구 합니다.</dd>
            </dl>
          </li>
        </ul>
      </div>
    </ServiceLayout>
  );
};

export default AsCharge;
