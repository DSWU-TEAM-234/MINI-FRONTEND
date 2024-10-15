import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import './WritePage.css';

const WritePage = ({ postTypeFromHeader }) => {
    const navigate = useNavigate(); // navigate 함수 추가
    const [postType, setPostType] = useState(postTypeFromHeader || '중고거래');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [transactionMethod, setTransactionMethod] = useState('직거래');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const resetForm = () => {
        setTitle('');
        setCategory('');
        setPrice('');
        setDescription('');
        setTransactionMethod('직거래');
        setImages([]);
        setImagePreviews([]);
    };

    const handlePostTypeChange = (type) => {
        setPostType(type);
        resetForm();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 포스트 데이터를 상세 페이지로 전달하며 이동
        const postData = {
            postType,
            title,
            category,
            price,
            description,
            transactionMethod,
            images,
        };
        // 포스트 상세 페이지로 이동
        navigate('/post-detail', { state: postData });
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
            resetForm();
        } else {
            setPostType('중고거래');
            resetForm();
        }
    }, [postTypeFromHeader]);

    return (
        <div>
            <div className="menu-bar">
                <button 
                    className={postType === '중고거래' ? 'active' : ''} 
                    onClick={() => handlePostTypeChange('중고거래')}
                >
                    중고거래
                </button>
                <button 
                    className={postType === '대리구매' ? 'active' : ''} 
                    onClick={() => handlePostTypeChange('대리구매')}
                >
                    대리구매
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>이미지 업로드</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
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

                <div>
                    <label>제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>카테고리</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">선택하세요</option>
                        <option value="전자제품">전자제품</option>
                        <option value="의류">의류</option>
                        <option value="가구">가구</option>
                        <option value="기타">기타</option>
                    </select>
                </div>

                <div>
                    <label>{postType === '중고거래' ? '가격' : '수고비'}</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>설명</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>거래 방식</label>
                    <label>
                        <input
                            type="radio"
                            value="직거래"
                            checked={transactionMethod === '직거래'}
                            onChange={() => setTransactionMethod('직거래')}
                        />
                        직거래
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="택배"
                            checked={transactionMethod === '택배'}
                            onChange={() => setTransactionMethod('택배')}
                        />
                        택배
                    </label>
                </div>

                <button type="submit" className="submit-button">저장하기</button>
            </form>
        </div>
    );
};

export default WritePage;
