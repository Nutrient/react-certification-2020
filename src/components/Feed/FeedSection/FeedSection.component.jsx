import React, { useState } from 'react';

import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
} from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';

import { Link } from 'react-router-dom';

import './FeedSection.styles.css';

function FeedSection({ feed }) {
  const [isFavorite, setIsFavorite] = useState(false);

  function favorite() {
    setIsFavorite(!isFavorite);
  }
  return (
    <Grid container>
      <Grid container item md={12} justify="flex-start">
        <h2>{feed.category}</h2>
      </Grid>

      <Grid container item md={12}>
        <Grid item md={12} className="FeedSectionCarrousel">
          <GridList md={12} className="FeedSectionCarrouselGrid" cols={4}>
            {feed.videos.map((video) => (
              <Link to={`/watch/${video.id}`} className="FeedSectionTile">
                <GridListTile key={video.id}>
                  <img src={`${video.info.thumbnails.high.url}`} alt="" />
                  <GridListTileBar
                    title={video.info.title}
                    className="FeedCardTileBar"
                    actionIcon={
                      <IconButton onClick={favorite}>
                        {isFavorite ? (
                          <Star style={{ fill: 'white' }} />
                        ) : (
                          <StarBorder style={{ fill: 'white' }} />
                        )}
                      </IconButton>
                    }
                  />
                </GridListTile>
              </Link>
            ))}
          </GridList>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FeedSection;
