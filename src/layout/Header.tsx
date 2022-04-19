import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="header__item">
        react-dnd
      </Link>
      <Link to="/beautiful-dnd" className="header__item">
        react-beautiful-dnd
      </Link>
    </div>
  );
};

export default Header;
