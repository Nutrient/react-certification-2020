import React, { useState, useContext, useEffect } from 'react';

import { Grid } from '@material-ui/core';
import FeedSection from './FeedSection';

import { SearchContext } from '../../providers/Search';

import { YOUTUBE_API_CATEGORY_VALUES } from '../../utils/constants';

import './Feed.styles.css';

function Feed() {
  const [categoryFeed, setCategoryFeed] = useState([]);
  const { getCategoryFeed } = useContext(SearchContext);

  useEffect(() => {
    const getCategories = async () => {
      const categories = [];
      categories.push(await getCategoryFeed(YOUTUBE_API_CATEGORY_VALUES.MUSIC));
      categories.push(await getCategoryFeed(YOUTUBE_API_CATEGORY_VALUES.GAMING));
      categories.push(await getCategoryFeed(YOUTUBE_API_CATEGORY_VALUES.SPORTS));
      categories.push(
        await getCategoryFeed(YOUTUBE_API_CATEGORY_VALUES.PETS_AND_ANIMALS)
      );
      setCategoryFeed(categories);
    };

    getCategories();
  }, [getCategoryFeed]);

  return (
    <Grid container style={{ padding: '10px' }}>
      <Grid item md={12}>
        {categoryFeed.map((feed) => (
          <FeedSection key={feed.id} feed={feed} />
        ))}
      </Grid>
    </Grid>
  );
}

export default Feed;
