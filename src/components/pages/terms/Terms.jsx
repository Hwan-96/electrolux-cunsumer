import React from 'react'
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';
const Terms = () => {
  return (
    <div id="sub-container">
      <PathNav 
        prevPage="Home" 
        currentPage="이용약관"
      />
      <div id="contents">
        <article className="sub-article">
          <SubTitleBox
            title="이용약관"
          />

          <div className="site-rule-wrap">
            <article className="inner">
              <h1>제 1조. 목적</h1>
						  이 약관은 일렉트로룩스 회원이 일렉트로룩스 코리아 주식회사(이하 “회사”라 함)가 운영하는 사이트에서 제공하는 인터넷 관련 서비스(이하 합하여 “서비스”라 합니다)에 이용함에 있어 “회사”와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

              <br />
              <br />

              <h1>제 2조. 정의</h1>
              1.[일렉트로룩스 고객센터 사이트]란 “회사”가 재화 또는 용역(이하 “재화 등”이라 함)을 이용자에게 제공하기 위하여 컴퓨터 등 정보 통신설비를 이용하여 구매한 재화 등을 확인 및 관리할 수 있도록 설정한 인터넷 사이트를 말하며 아울러 “회사”를 운영하는 사업자의 의미로도 사용합니다.
              2.[일렉트로룩스 캠페인 사이트]란 캠페인사이트란 일렉트로룩스 마케팅을 목적으로 제품정보, 컨텐츠 노출, 캠페인, 이벤트 진행 등 다양한 디지털 활동을 진행하는 사이트 입니다.
              3.[일렉트로룩스 통합회원가입 사이트]란 [일렉트로룩스 고객센터 사이트]와 [일렉트로룩스 캠페인 사이트]의 아이디와 비밀번호를 통합하여 이용하도록 회원으로 등록할 수 있는 인터넷 사이트를 말합니다.
            </article>
          </div>
        </article>
      </div>
    </div>
  )
}

export default Terms