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
                src={user.profileImage} 
                alt="프로필" 
                className="profile-image" 
                onClick={handleProfileClick}
            />
            <h2>{user.nickname}</h2>
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
