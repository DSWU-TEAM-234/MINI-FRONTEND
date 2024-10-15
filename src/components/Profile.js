import React, { useRef } from 'react';
// import './Profile.css';

const Profile = ({ user, setUser }) => {
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUser(prevUser => ({
                    ...prevUser,
                    profileImage: reader.result
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
                src={user.profileImage || 'default-profile.png'} // 기본 프로필 이미지
                alt="프로필" 
                className="profile-image" 
                onClick={handleProfileClick}
            />
            <h2>{user.nickname}</h2>
            <p>{user.university_name}</p> {/* 학교 이름 추가 */}
            <img 
                src={user.universityLogo || 'default-logo.png'} // 기본 학교 로고
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
