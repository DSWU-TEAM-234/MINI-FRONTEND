import React, { useState } from 'react';

const Wishlist = ({ wishlist, onRemove }) => {
    const [showWishlist, setShowWishlist] = useState(false); // 찜 목록 표시 상태

    const toggleWishlist = () => {
        setShowWishlist(prevState => !prevState); // 찜 목록 표시 상태 토글
    };

    return (
        <div className="wishlist">
            <h3 onClick={toggleWishlist} style={{ cursor: 'pointer' }}>
                찜 목록 {showWishlist ? '▲' : '▼'}
            </h3>
            {showWishlist && ( // 찜 목록이 열릴 때만 표시
                wishlist.length === 0 ? (
                    <p>찜 목록이 없습니다.</p>
                ) : (
                    <ul>
                        {wishlist.map((item) => (
                            <li key={item.id}>
                                <h4>{item.productName}</h4>
                                <p>가격: {item.price} 원</p>
                                <button onClick={() => onRemove(item.id)}>삭제</button>
                            </li>
                        ))}
                    </ul>
                )
            )}
        </div>
    );
};

export default Wishlist;
