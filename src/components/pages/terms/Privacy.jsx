import React from 'react'
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';

const Privacy = () => {
  return (
    <div id="sub-container">
      <PathNav 
        prevPage="Home" 
        currentPage="개인정보처리방침"
      />
      <div id="contents">
        <article className="sub-article">
          <SubTitleBox
            title="개인정보처리방침"
          />

          <div className="site-rule-wrap">
            <article className="inner">
              <h1>총칙</h1>
						  1.개인정보란 생존하는 개인에 관한 정보로서 당해 정보에 포함되어 있는 성명, 본인확인기관에서 제공하는 본인인증결과값(CI) 등의 사항에 의하여 당해 개인을 식별할 수 있는 정보(당해 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는 것을 포함합니다)를 말합니다.

              <br />
              <br />

              2.일렉트로룩스 코리아 주식회사(이하 “회사”라 함)는 회원의 개인정보보호를 매우 중요시하며 개인정보를 적극적으로 보호하기 위하여 “일렉트로룩스 개인정보처리방침(이하 “개인정보처리방침”이라 함)”을 제정하고 이를 준수하고 있습니다. “회사”는 “개인정보처리방침”을 통해 회원의 어떤 개인정보 항목을, 어떤 목적으로 수집되고 있으며, 어떻게 보호조치가 되고 있는지에 대해 알려 드리며, 이는 관련 법령 및 지침, “회사” 내부 운영방침의 변경에 따라 변경될 수 있습니다. 만약 변경사항이 발생할 경우에는 관련 법령이 정하는 방법에 따라 고지함을 알려 드립니다.
            </article>
          </div>
        </article>
      </div>
    </div>
  )
}

export default Privacy