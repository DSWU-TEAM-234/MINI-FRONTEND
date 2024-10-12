import React, { useState } from 'react';
import Profile from './Profile'; 
import Wishlist from './Wishlist'; 
import TransactionHistory from './TransactionHistory';
import './MyPage.css';

const MyPage = () => {
    const [user, setUser] = useState({
        nickname: '홍길동',
        email: 'hong@example.com',
        profileImage: 'https://via.placeholder.com/100'
    });

    const transactionHistory = {
        secondHand: [
            { id: 1, orderNumber: '001', productName: '스니커즈', price: 50000, date: '2023-10-01' },
        ],
        agencyPurchase: [
            { id: 2, orderNumber: '002', productName: '가방', price: 30000, date: '2023-09-20' },
        ],
    };

    const [wishlist, setWishlist] = useState([
        { id: 1, productName: '모자', price: 15000 },
    ]);

    const [showDetails, setShowDetails] = useState({
        secondHand: false,
        agencyPurchase: false,
    });

    const handleRemoveFromWishlist = (id) => {
        setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== id));
    };

    const toggleDetails = (section) => {
        setShowDetails(prevState => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    return (
        <div className="my-page">
            <Profile user={user} setUser={setUser} /> 
            <div className="content-container">
                <div className="transaction-container">
                    <Wishlist wishlist={wishlist} onRemove={handleRemoveFromWishlist} />
                    <TransactionHistory 
                        title="중고 거래"
                        transactions={transactionHistory.secondHand}
                        showDetails={showDetails.secondHand}
                        toggleDetails={() => toggleDetails('secondHand')}
                    />
                    <TransactionHistory 
                        title="대리 구매"
                        transactions={transactionHistory.agencyPurchase}
                        showDetails={showDetails.agencyPurchase}
                        toggleDetails={() => toggleDetails('agencyPurchase')}
                    />
                </div>
            </div>            
        </div>
    );
};

export default MyPage;
