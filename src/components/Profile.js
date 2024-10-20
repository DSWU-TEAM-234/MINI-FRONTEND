import React, { useRef } from 'react';
import './Profile.css';
import profile_image from './image/기본프로필.jpeg'
import universityLogo from './image/덕성여자대학교_로고.png'

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
        fileInputRef.current.click();
    };

    return (
        <div className="user-info">
            <img 
                src={user.profile_image || profile_image} // 기본 프로필 이미지
                alt="프로필" 
                className="profile-image" 
                onClick={handleProfileClick}
            />
            <h2>{user.user_nickName}</h2>
            <p>{user.university_name}</p> 
            <img 
                src={user.universityLogo || universityLogo} // 기본 학교 로고
                alt="학교 로고" 
                className="university-logo" 
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default Profile;
