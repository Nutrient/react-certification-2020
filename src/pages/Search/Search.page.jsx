import React from 'react';

import { useParams } from 'react-router-dom';

import SearchFeed from '../../components/SearchFeed';

import './Search.styles.css';

function SearchPage() {
  const { query } = useParams();

  return (
    <section className="Search">
      <SearchFeed query={query} />
    </section>
  );
}

export default SearchPage;
