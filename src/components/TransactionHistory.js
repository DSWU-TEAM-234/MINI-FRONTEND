// TransactionHistory.js
import React from 'react';

const TransactionHistory = ({ title, transactions, showDetails, toggleDetails }) => {
    return (
        <div className="order-history">
            <h3 onClick={toggleDetails} style={{ cursor: 'pointer' }}>
                {title} {showDetails ? '▲' : '▼'}
            </h3>
            {showDetails && (
                transactions.length === 0 ? (
                    <p>{title} 내역이 없습니다.</p>
                ) : (
                    <ul>
                        {transactions.map((order) => (
                            <li key={order.id}>
                                <h4>거래번호: {order.orderNumber}</h4>
                                <p>상품: {order.productName}</p>
                                <p>가격: {order.price} 원</p>
                                <p>거래일: {new Date(order.date).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                )
            )}
        </div>
    );
};

export default TransactionHistory;
