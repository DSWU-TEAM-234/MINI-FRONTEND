import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
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
        try {
            const response = await axios.post('http://localhost:5000/login', credentials);
            console.log(response.data);
            // 로그인 성공 시의 처리
        } catch (error) {
            console.error('로그인 오류:', error);
            // 오류 처리
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
        <div>
            <h1>로그인</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이메일:</label>
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                </div>
                <button type="submit" disabled={!isFormValid() || isLoading}>
                    {isLoading ? '로딩...' : '로그인'}
                </button>
            </form>
        </div>
    );
};

export default Login;
