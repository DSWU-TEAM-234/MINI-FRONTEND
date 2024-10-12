import React from 'react';
import Posts from './Posts'; 

function Home() {
  return (
    <div>
      <div className="banner">
          <h2>배너</h2>
        </div>
        <div className="category">
          <h3>카테고리</h3>
        </div>
        <Posts />
    </div>
  );
}

export default Home;