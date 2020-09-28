import React from 'react';

import './Favorites.styles.css';
import FavoriteFeed from '../../components/FavoriteFeed';

function FavoritePage() {
  return (
    <section className="favorites">
      <FavoriteFeed />
    </section>
  );
}

export default FavoritePage;
