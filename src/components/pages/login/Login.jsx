import React, { useState } from 'react';
import PathNav from '@/components/common/PathNav';
import Loading from '@/components/common/Loading';
import useAuthStore from '@/stores/authStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { sanitizeInput } from '@/utils/security';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    acnt_id: '',
    acnt_pw: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 이전 페이지 경로 가져오기
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await login(formData.acnt_id, formData.acnt_pw);
      console.log('로그인 결과:', result);
      if (result.success) {
        // 사용자 정보 가져오기
        const { userInfo } = useAuthStore.getState();
        
        // 관리자인 경우 관리자 페이지로 이동
        if (userInfo?.type === 'admin') {
          navigate('/mng');
        } else {
          // 일반 사용자인 경우 이전 페이지 또는 홈으로 이동
          navigate(from);
        }
      } else {
        setError(result.message || '로그인에 실패했습니다.');
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div id="sub-container">
      <PathNav prevPage="Home" currentPage="로그인"/>

      <div id="contents">
        <article className="sub-article">
          <div className="login-wrap">
            <form method="post" name="formLogin" id="formLogin" onSubmit={handleSubmit}>
              <input type="hidden" name="rurl" value="" />
              <div className="login-box">
                <h2 className="tit">로그인</h2>

                <div className="login-fm">
                  {error && <div className="error-message" style={{color: 'red', margin: '10px 0'}}>{error}</div>}
                  
                  <ul className="ipbox">
                    <li>
                      <label htmlFor="acnt_id">
                        <input
                          type="text"
                          name="acnt_id"
                          id="acnt_id"
                          className="ip01"
                          placeholder="아이디 입력"
                          value={formData.acnt_id}
                          onChange={handleChange}
                          title="ID"
                          disabled={loading}
                          required
                        />
                      </label>
                    </li>
                    <li>
                      <label htmlFor="acnt_pw">
                        <input
                          type="password"
                          name="acnt_pw"
                          id="acnt_pw"
                          className="ip01"
                          placeholder="비밀번호 입력"
                          value={formData.acnt_pw}
                          onChange={handleChange}
                          onKeyUp={handleEnterKey}
                          title="Password"
                          autoComplete="off"
                          disabled={loading}
                          required
                        />
                      </label>
                    </li>
                  </ul>

                  <button type="submit" className="hgbtn blue02 btn-login" disabled={loading}>
                    {loading ? <Loading text="로그인 중" showText={true} /> : '로그인'}
                  </button>

                  <ul className="mem-menu">
                    <li>
                      <a href="" rel="noopener noreferrer" onClick={() => navigate('/join/agreement')}>
                        회원가입
                      </a>
                    </li>
                    <li>
                      <a href="" rel="noopener noreferrer" onClick={() => navigate('/find/id')}>
                        아이디찾기
                      </a>
                    </li>
                    <li>
                      <a href="" rel="noopener noreferrer" onClick={() => navigate('/find/pw')}>
                        비밀번호 찾기
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Login;