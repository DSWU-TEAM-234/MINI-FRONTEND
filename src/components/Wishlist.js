import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyFavorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('/api/myfavorites'); // API 엔드포인트
                setFavorites(response.data);
            } catch (err) {
                setError('찜 목록을 가져오는 데 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>내 찜 목록</h2>
            <ul>
                {favorites.map(item => (
                    <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyFavorites;
