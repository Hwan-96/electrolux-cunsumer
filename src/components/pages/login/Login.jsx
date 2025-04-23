import React, { useState } from 'react';
import PathNav from '@/components/common/PathNav';
import Loading from '@/components/common/Loading';
import useAuthStore from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { sanitizeInput } from '@/utils/inputValidation';

const Login = () => {
  const navigate = useNavigate();
  const { login, loginAsAdmin } = useAuthStore();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      const result = await login(formData.username, formData.password);
      if (result.success) {
        navigate('/');
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

  const handleAdminLogin = () => {
    loginAsAdmin();
    navigate('/mng');
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
                      <label htmlFor="username">
                        <input
                          type="text"
                          name="username"
                          id="username"
                          className="ip01"
                          placeholder="아이디 입력"
                          value={formData.username}
                          onChange={handleChange}
                          title="ID"
                          disabled={loading}
                          required
                        />
                      </label>
                    </li>
                    <li>
                      <label htmlFor="password">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="ip01"
                          placeholder="비밀번호 입력"
                          value={formData.password}
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

                  <button 
                    className="admin_login_btn"
                    onClick={handleAdminLogin}
                  >
                    관리자 로그인 (테스트)
                  </button>

                  <ul className="mem-menu">
                    <li>
                      <a href="" rel="noopener noreferrer" onClick={() => navigate('/join/agreement')}>
                        회원가입
                      </a>
                    </li>
                    <li>
                      <a href="" rel="noopener noreferrer" onClick={() => navigate('/find-id')}>
                        아이디찾기
                      </a>
                    </li>
                    <li>
                      <a href="" rel="noopener noreferrer" onClick={() => navigate('/find-password')}>
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