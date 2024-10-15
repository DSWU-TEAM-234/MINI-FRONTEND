import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let newErrors = { ...errors };
        switch (name) {
            case 'email':
                newErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : '유효한 이메일 주소를 입력하세요.';
                break;
            case 'password':
                newErrors.password = value.length >= 6 ? '' : '비밀번호는 6자 이상이어야 합니다.';
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) return;

        setIsLoading(true);
        setLoginError('');
        try {
            const response = await axios.post('http://localhost:5000/login', credentials, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // 로그인 성공 시 사용자 정보를 로컬 스토리지에 저장
            const userData = {
                user_id: response.data.user_id,
                user_nickName: response.data.user_nickName,
                profile_image: response.data.profile_image,
                university_name: response.data.university_name,
            };
            localStorage.setItem('user', JSON.stringify(userData));

            // 로그인 성공 알림창
            alert('로그인 성공! 환영합니다!');

            // 홈 페이지로 리다이렉션
            navigate('/mypage');
        } catch (error) {
            console.error('로그인 오류:', error);
            setLoginError(error.response?.data?.message || '로그인 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = () => {
        return (
            credentials.email &&
            credentials.password &&
            Object.values(errors).every(error => !error)
        );
    };

    return (
        <div className="login-container">
            <h1>로그인</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">이메일:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={credentials.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={credentials.password}
                        onChange={handleChange}
                        className={`form-input ${errors.password ? 'error' : ''}`}
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                {loginError && <span className="error-message">{loginError}</span>}
                <button type="submit" className="login-button" disabled={!isFormValid() || isLoading}>
                    {isLoading ? '로딩...' : '로그인'}
                </button>
            </form>
            <div className="signup-link">
                <span>아직 회원이 아니신가요?</span>
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                    <button className="signup-button">회원가입</button>
                </Link>
            </div>
        </div>
    );
};

export default Login;
