import React, { createContext, useContext, useState } from 'react';

// AuthContext 생성
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = sessionStorage.getItem('token'); // 세션 스토리지 사용
        return !!token;
    });
    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const handleLogin = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        sessionStorage.setItem('token', userData.token); // 세션 스토리지에 저장
        sessionStorage.setItem('user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

// AuthContext를 사용할 수 있는 커스텀 훅
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
