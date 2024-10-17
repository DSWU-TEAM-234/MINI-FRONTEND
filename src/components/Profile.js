import React, { useRef } from 'react';
import './Profile.css';

const Profile = ({ user, setUser }) => {
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUser(prevUser => ({
                    ...prevUser,
                    profile_image: reader.result // 프로필 이미지를 업데이트
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileClick = () => {
        fileInputRef.current.click(); // 파일 입력 클릭
    };

    return (
        <div className="user-info">
            <img 
                src={user.profile_image || '/images/default-profile.png'}  // 기본 프로필 이미지
                alt="프로필" 
                className="profile-image" 
                onClick={handleProfileClick}
            />
            <h2>{user.user_nickName || '닉네임이 없습니다.'}</h2>
            {user.university_name && (
                <img 
                    src={user.university_logo || '/images/default-logo.png'} // 대학 로고
                    alt="학교 로고" 
                    className="university-logo" 
                />
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                style={{ display: 'none' }} // 입력 필드를 숨김
            />
        </div>
    );
};

export default Profile;
