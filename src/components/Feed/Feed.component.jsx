import React, { useState, useContext, useEffect } from 'react';

import { Grid } from '@material-ui/core';
import FeedSection from './FeedSection';

import { SearchContext } from '../../providers/Search';

import './Feed.styles.css';

function Feed() {
  const [categoryFeed, setCategoryFeed] = useState([]);
  const { getCategoryFeed } = useContext(SearchContext);

  useEffect(() => {
    const getCategories = async () => {
      const categories = [];
      categories.push(await getCategoryFeed(10));
      categories.push(await getCategoryFeed(20));
      categories.push(await getCategoryFeed(17));
      categories.push(await getCategoryFeed(15));
      setCategoryFeed(categories);
    };

    getCategories();
  }, [getCategoryFeed]);

  return (
    <Grid container style={{ padding: '10px' }}>
      <Grid item md={12}>
        {categoryFeed.map((feed, index) => (
          <FeedSection key={index} feed={feed} />
        ))}
      </Grid>
    </Grid>
  );
}

export default Feed;
