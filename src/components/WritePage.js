import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './WritePage.css';
import axios from 'axios';


const WritePage = ({ postTypeFromHeader }) => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();
    const [postType, setPostType] = useState(postTypeFromHeader || '중고거래');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [transactionMethod, setTransactionMethod] = useState('직거래');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!isLoggedIn) {
            console.log('로그인되지 않은 상태입니다.');
            console.log(user);
            
            navigate('/login');
        } else {
            console.log('로그인 상태:', isLoggedIn);
            console.log('사용자 정보:', user);

        }
    }, [isLoggedIn, user, navigate]);

    const resetForm = () => {
        setTitle('');
        setCategory('');
        setPrice('');
        setDescription('');
        setTransactionMethod('직거래');
        setImages([]);
        setImagePreviews([]);
        setErrorMessage('');
    };

    const handlePostTypeChange = (type) => {
        setPostType(type);
        resetForm();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!isLoggedIn) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }

    
        const formData = new FormData();
        formData.append('post_type', postType);
        formData.append('title', title);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('content', description);
        formData.append('deal_method', transactionMethod);
        images.forEach(image => formData.append('image', image));

        
    
        try {
            const response = await axios.post('http://localhost:5000/write_post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
    
            alert(response.data.message);
            navigate(`/post_detail/${response.data.post_id}`);
            resetForm();
        } catch (error) {
            const message = error.response?.data?.message || '게시글 작성 중 오류가 발생했습니다.';
            setErrorMessage(message);
            console.error('게시글 작성 실패:', error);
        }
    };
    
    

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    useEffect(() => {
        if (postTypeFromHeader) {
            setPostType(postTypeFromHeader);
        }
        resetForm();
    }, [postTypeFromHeader]);

    useEffect(() => {
        return () => {
            imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
        };
    }, [imagePreviews]);

    const isFormValid = title && category && parseFloat(price) > 0 && images.length > 0;

    return (
        <div className="write-page">
            <div className="menu-bar">
                <button
                    className={`post-type-button ${postType === '중고거래' ? 'active' : ''}`}
                    onClick={() => handlePostTypeChange('중고거래')}
                >
                    중고거래
                </button>
                <button
                    className={`post-type-button ${postType === '대리구매' ? 'active' : ''}`}
                    onClick={() => handlePostTypeChange('대리구매')}
                >
                    대리구매
                </button>
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="write-form">
                <div className="form-group">
                    <label>이미지 업로드</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="file-input"
                    />
                </div>

                <div className="image-preview-container">
                    {imagePreviews.length > 0 && (
                        <div className="image-preview">
                            <div className="preview-images">
                                {imagePreviews.map((preview, index) => (
                                    <img key={index} src={preview} alt={`미리보기 ${index + 1}`} className="preview-image" />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label>제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="text-input"
                    />
                </div>

                <div className="form-group">
                    <label>카테고리</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required className="select-input">
                        <option value="">선택하세요</option>
                        <option value="dolls">인형</option>
                        <option value="clothes">의류</option>
                        <option value="stationery">문구류</option>
                        <option value="household-items">생활소품</option>
                        <option value="souvenirs">기념소품</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>{postType === '중고거래' ? '가격' : '수고비'}</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="number-input"
                    />
                </div>

                <div className="form-group">
                    <label>설명 (선택)</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="textarea-input"
                    />
                </div>

                <div className="form-group">
                    <label>거래 방식</label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            value="직거래"
                            checked={transactionMethod === '직거래'}
                            onChange={() => setTransactionMethod('직거래')}
                            className="radio-input"
                        />
                        직거래
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            value="택배"
                            checked={transactionMethod === '택배'}
                            onChange={() => setTransactionMethod('택배')}
                            className="radio-input"
                        />
                        택배
                    </label>
                </div>

                <button type="submit" className="submit-button" disabled={!isFormValid}>저장하기</button>
            </form>
        </div>
    );
};

export default WritePage;
