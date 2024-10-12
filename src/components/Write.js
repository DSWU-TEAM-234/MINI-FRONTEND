import React, { useState, useEffect } from 'react';
import './Write.css';


const Write = ({ postTypeFromHeader }) => {
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
        console.log({
            postType,
            title,
            category,
            price,
            description,
            transactionMethod,
            images,
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    useEffect(() => {
        // postTypeFromHeader가 변경될 때만 실행
        if (postTypeFromHeader) {
            setPostType(postTypeFromHeader);
            resetForm();
        } else {
            setPostType('중고거래'); // 기본값 설정
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

            <button type="submit" className="submit-button">작성하기</button>

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
            </form>
        </div>
    );
};

export default Write;
