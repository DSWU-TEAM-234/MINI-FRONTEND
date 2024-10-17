import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/MyPosts', {
                    withCredentials: true // withCredentials와 같은 역할
                });

                setPosts(response.data.created_posts);
            } catch (err) {
                setError(err.response ? err.response.data.message : '오류가 발생했습니다.');
                console.error('Error fetching posts:', err);
            }
        };

        fetchPosts();
    }, []);

    if (error) {
        return <div>오류가 발생했습니다: {error}</div>;
    }

    return (
        <div>
            <h1>내 게시글</h1>
            {posts.length > 0 ? (
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>{post.title}</li> // 게시글 제목을 표시
                    ))}
                </ul>
            ) : (
                <p>작성한 게시글이 없습니다.</p>
            )}
        </div>
    );
};

export default MyPosts;
