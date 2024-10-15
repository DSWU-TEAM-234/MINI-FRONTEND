import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        nick_name: '',
        university_classification: '', // 선택 사항
        profile_image: null, // 선택 사항
    });
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false); // 약관 동의 상태 추가

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value,
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
            case 'university_classification':
                newErrors.university_classification = 
                    value && /^.+대학교$/.test(value) ? '' : '대학교 이름은 "00대학교" 형식이어야 합니다.';
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) return;

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:5000/signup', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data.message);
            alert(response.data.message); // 성공 메시지 표시
            
            // 가입 성공 시 처리
            setFormData({
                name: '',
                email: '',
                password: '',
                nick_name: '',
                university_classification: '',
                profile_image: null,
            });
            setErrors({});
            setShowModal(false);
            setIsTermsAccepted(false);
        } catch (error) {
            console.error('가입 오류:', error);
            alert(error.response?.data?.message || '가입 중 오류가 발생했습니다.'); // 실패 메시지 표시
        }
    };

    const isFormValid = () => {
        return (
            formData.name &&
            formData.email &&
            formData.password &&
            formData.nick_name &&
            isTermsAccepted && // 약관 동의 여부 확인
            !errors.university_classification // 대학교 유효성 검사 통과 여부 확인
        );
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleAcceptTerms = () => {
        setIsTermsAccepted(true); // 약관 동의 상태 변경
        toggleModal(); // 모달 닫기
    };

    return (
        <div className="signup-container">
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label>이름: *</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className={`form-input ${errors.name ? 'error' : ''}`} 
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label>이메일: *</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className={`form-input ${errors.email ? 'error' : ''}`} 
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>비밀번호: *</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className={`form-input ${errors.password ? 'error' : ''}`} 
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <label>닉네임: *</label>
                    <input 
                        type="text" 
                        name="nick_name" 
                        value={formData.nick_name} 
                        onChange={handleChange} 
                        className={`form-input ${errors.nick_name ? 'error' : ''}`} 
                    />
                    {errors.nick_name && <span className="error-message">{errors.nick_name}</span>}
                </div>
                <div className="form-group">
                    <label>소속 대학교: (선택사항)</label>
                    <input 
                        type="text" 
                        name="university_classification" 
                        value={formData.university_classification} 
                        onChange={handleChange} 
                        className={`form-input ${errors.university_classification ? 'error' : ''}`} 
                    />
                    {errors.university_classification && <span className="error-message">{errors.university_classification}</span>}
                </div>
                <div className="form-group">
                    <label>프로필 이미지: (선택사항)</label>
                    <input 
                        type="file" 
                        name="profile_image" 
                        onChange={handleChange} 
                        className="form-input" 
                    />
                </div>
                <div className="form-group">
                    <button 
                        type="button" 
                        onClick={toggleModal} 
                        className="terms-button"
                    >
                        약관 동의
                    </button>
                </div>
                
                <button type="submit" className="signup-button" disabled={!isFormValid()}>가입하기</button>
            </form>

            {showModal && (
                <div style={modalStyle}>
                    <div style={modalContentStyle}>
                        <h2>약관 동의</h2>
                        <p>여기에 약관 내용을 작성하세요.</p>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={isTermsAccepted} 
                                onChange={(e) => setIsTermsAccepted(e.target.checked)} 
                            />
                            동의합니다
                        </label>
                        <button onClick={handleAcceptTerms} className="close-modal-button">확인</button>
                        <button onClick={toggleModal} className="close-modal-button">닫기</button>
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
