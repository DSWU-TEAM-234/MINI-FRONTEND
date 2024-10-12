import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        nick_name: '',
        isAccepted: false,
    });
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let newErrors = { ...errors };
        switch (name) {
            case 'name':
                newErrors.name = value ? '' : '이름을 입력하세요.';
                break;
            case 'email':
                newErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : '유효한 이메일 주소를 입력하세요.';
                break;
            case 'password':
                newErrors.password = value.length >= 6 ? '' : '비밀번호는 6자 이상이어야 합니다.';
                break;
            case 'nick_name':
                newErrors.nick_name = value ? '' : '닉네임을 입력하세요.';
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) return;

        try {
            const response = await axios.post('http://localhost:5000/signup', formData);
            console.log(response.data);
            // 성공적으로 가입되었을 때의 처리
            // 폼 초기화
            setFormData({
                name: '',
                email: '',
                password: '',
                nick_name: '',
                isAccepted: false,
            });
            setErrors({});
            setShowModal(false); // 모달 닫기
        } catch (error) {
            console.error('가입 오류:', error);
            // 오류 처리
        }
    };

    const isFormValid = () => {
        return (
            formData.name &&
            formData.email &&
            formData.password &&
            formData.nick_name &&
            formData.isAccepted &&
            Object.values(errors).every(error => !error)
        );
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleAcceptTerms = () => {
        setFormData({ ...formData, isAccepted: true });
        toggleModal();
    };

    return (
        <div>
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이름:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                </div>
                <div>
                    <label>이메일:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                </div>
                <div>
                    <label>닉네임:</label>
                    <input type="text" name="nick_name" value={formData.nick_name} onChange={handleChange} />
                    {errors.nick_name && <span style={{ color: 'red' }}>{errors.nick_name}</span>}
                </div>
                <div>
                    <button type="button" onClick={toggleModal}>약관 동의</button>
                </div>
                <button type="submit" disabled={!isFormValid()}>가입하기</button>
            </form>

            {showModal && (
                <div style={modalStyle}>
                    <div style={modalContentStyle}>
                        <h2>약관 동의</h2>
                        <p>여기에 약관 내용을 작성하세요.</p>
                        <button onClick={handleAcceptTerms}>동의하기</button>
                        <button onClick={toggleModal}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// 모달 스타일
const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
};

export default SignUp;
