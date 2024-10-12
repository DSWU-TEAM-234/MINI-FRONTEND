import React from 'react';

const ItemDetail = ({ item }) => {
  if (!item) {
    return <div>물품 정보가 없습니다.</div>;
  }

  return (
    <div style={styles.container}>
      <h1>{item.item_name}</h1>
      <img src={item.image} alt={item.item_name} style={styles.image} />
      <p>가격: {item.price} 원</p>
      <p>{item.is_sold_out ? '품절' : '구매 가능'}</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    maxWidth: '400px',
    margin: 'auto',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
  },
};

export default ItemDetail;
