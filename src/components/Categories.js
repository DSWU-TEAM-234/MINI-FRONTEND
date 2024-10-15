import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

const categories = [
  { name: '인형', path: 'dolls' },
  { name: '의류', path: 'clothes' },
  { name: '문구류', path: 'stationery' },
  { name: '생활소품', path: 'household-items' },
  { name: '기념소품', path: 'souvenirs' }
];


function Categories() {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <Link to={`./category/${category.path}`} key={category.path}>
          <button className="category-button">
            <small className="category-name">{category.name}</small>
          </button>
        </Link>
      ))}
    </div>
  );
}

export default Categories;

