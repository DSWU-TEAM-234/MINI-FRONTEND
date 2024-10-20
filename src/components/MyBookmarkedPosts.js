import React, { useEffect, useState } from 'react';
import axios from 'axios';
const MyBookmarkedPosts = () => {
    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchBookmarkedPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/My_bookmarked_posts', {
                    withCredentials: true // 세션 정보 포함
                });
                // 서버에서 받은 데이터가 있을 경우 상태 업데이트
                if (response.data.bookmarked_posts) {
                    setBookmarkedPosts(response.data.bookmarked_posts);
                } else {
                    setError('찜한 게시글이 없습니다.');
                }
            } catch (err) {
                // 오류 메시지 설정
                setError(err.response ? err.response.data.message : '오류가 발생했습니다.');
                console.error('Error fetching bookmarked posts:', err);
            }
        };
        fetchBookmarkedPosts();
    }, []);
    // 오류가 발생한 경우 메시지 출력
    if (error) {
        return <div>오류가 발생했습니다: {error}</div>;
    }
    return (
        <div>
            <h1>찜한 게시글</h1>
            {bookmarkedPosts.length > 0 ? (
                <ul>
                    {bookmarkedPosts.map(post => (
                        <li key={post.id}>{post.title}</li> // 게시글 제목 표시
                    ))}
                </ul>
            ) : (
                <p>찜한 게시글이 없습니다.</p>
            )}
        </div>
    );
};
export default MyBookmarkedPosts;