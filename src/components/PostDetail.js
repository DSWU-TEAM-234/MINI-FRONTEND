import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BackButton from './BackButton';
import LikeButton from './LikeButton';
import Profile from './Profile';
import './PostDetail.css';

const API_URL = '/post_detail/';

function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const [postDetails, setPostDetails] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostDetails = async () => {
            if (!id) {
                setError('유효하지 않은 게시글 ID입니다.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_URL}${id}`);
                if (!response.ok) {
                    throw new Error('게시글을 가져오는 데 실패했습니다.');
                }

                const data = await response.json();
                if (data.post) {
                    setPostDetails(data.post);
                    setIsLiked(data.post.isLiked || false);
                } else {
                    setError('게시글을 찾을 수 없습니다.');
                }
            } catch (err) {
                setError(err.message || '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            } finally {
                setLoading(false);
            }
        };

        fetchPostDetails();
    }, [id]);

    const handleLike = async () => {
        if (!isLoggedIn) {
            alert('좋아요 기능을 사용하려면 로그인 해주세요.');
            return;
        }

        try {
            const response = await fetch(`/like_post/${id}`, {
                method: isLiked ? 'DELETE' : 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                setIsLiked(prev => !prev);
            } else {
                alert('좋아요 처리 중 오류가 발생했습니다.');
            }
        } catch (error) {
            alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
    };

    if (loading) {
        return <div className="loading">로딩 중...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="post-detail-container">
            <BackButton />
            <img
                src={postDetails.image ? `/${postDetails.image}` : `${process.env.PUBLIC_URL}/default_image.png`}
                alt={postDetails.title || '게시글 이미지'} 
                className="post-image" 
            />
            <Profile user={{ id: postDetails.user_id, user_nickName: postDetails.user_nickName }} setUser={() => {}} />

            <h2 className="post-title">{postDetails.title}</h2>
            <p className="post-category">카테고리: {postDetails.category}</p>
            <p className="post-description">{postDetails.content}</p>
            

            <div className="footer">
                <LikeButton isLiked={isLiked} handleLike={handleLike} />
                <p className="post-price">{postDetails.price.toLocaleString()}원</p>
                <button 
                    className="chat-button" 
                    onClick={() => {
                        if (!isLoggedIn) {
                            alert('채팅 기능을 사용하려면 로그인 해주세요.');
                        } else {
                            navigate(`/chat/${postDetails.user_id}`);
                        }
                    }}>
                    채팅하기
                </button>
            </div>
        </div>
    );
}

export default PostDetail;
