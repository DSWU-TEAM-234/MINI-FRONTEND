import React from 'react';
import './BookmarkButton.css'; // CSS 파일 임포트

const BookmarkButton = ({ isBookmarked, onBookmark, onCancelBookmark }) => {
    return (
        <button 
            className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`} 
            onClick={isBookmarked ? onCancelBookmark : onBookmark}
            aria-label={isBookmarked ? '찜 취소하기' : '찜하기'}
        >
            {isBookmarked ? (
                <span role="img" aria-label="찜한 하트">❤️</span>
            ) : (
                <span role="img" aria-label="찜하지 않은 하트">🤍</span>
            )}
        </button>
    );
};

export default BookmarkButton;
