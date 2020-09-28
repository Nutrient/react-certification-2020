import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
} from '@material-ui/core';
import './FavoriteFeed.styles.css';

import { Star } from '@material-ui/icons';

import { SearchContext, FavoriteContext } from '../../providers/Search';

function FavoriteFeed() {
  const [favorites, setFavorites] = useState([]);

  const { getFavoriteVideos } = useContext(SearchContext);
  const { removeFavorite } = useContext(FavoriteContext);

  useEffect(() => {
    const search = async () => {
      setFavorites(await getFavoriteVideos());
    };

    search();
  }, [getFavoriteVideos]);

  return (
    <Grid container item md={12} className="SearchFeedGrid">
      <Grid item md={12}>
        <h3>Favorites</h3>
      </Grid>
      <Grid container item md={12} direction="row">
        <GridList cellHeight={180} cols={5} spacing={20}>
          {favorites.map((video) => (
            <Link to={`/watch/${video.id}`} className="SearchFeedGridLink">
              <GridListTile cols={1} key={video.id} className="SearchFeedGridTile">
                <img src={`${video.info.thumbnails.high.url}`} alt="" />
                <GridListTileBar
                  title={video.info.title}
                  actionIcon={
                    <IconButton onClick={() => removeFavorite(video.id)}>
                      <Star style={{ fill: 'white' }} />
                    </IconButton>
                  }
                />
              </GridListTile>
            </Link>
          ))}
        </GridList>
      </Grid>
    </Grid>
  );
}

export default FavoriteFeed;
