import React, { useState, useContext } from 'react';

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

import { FavoriteContext } from '../../../providers/Search';

function FeedSection({ feed }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addFavorite, removeFavorite, includesFavorite } = useContext(FavoriteContext);

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
              <GridListTile key={video.id}>
                <Link to={`/watch/${video.id}`} className="FeedSectionTile">
                  <img src={`${video.info.thumbnails.high.url}`} alt="" />
                </Link>
                <GridListTileBar
                  title={video.info.title}
                  className="FeedCardTileBar"
                  actionIcon={
                    <IconButton onClick={favorite}>
                      {includesFavorite(video.id) ? (
                        <Star
                          style={{ fill: 'white' }}
                          onClick={() => removeFavorite(video.id)}
                        />
                      ) : (
                        <StarBorder
                          style={{ fill: 'white' }}
                          onClick={() => addFavorite(video.id)}
                        />
                      )}
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FeedSection;
