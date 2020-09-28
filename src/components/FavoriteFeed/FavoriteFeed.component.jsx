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

import { Star, StarBorder } from '@material-ui/icons';

import { SearchContext, FavoriteContext } from '../../providers/Search';

function FavoriteFeed() {
  const [favorites, setFavorites] = useState([]);

  const { getFavoriteVideos } = useContext(SearchContext);
  const { addFavorite, removeFavorite, includesFavorite } = useContext(FavoriteContext);

  function favorite(videoId) {
    setFavorites(favorites.filter((fav) => fav.id !== videoId));
  }

  useEffect(() => {
    const search = async () => {
      setFavorites(await getFavoriteVideos());
    };

    search();
  }, [getFavoriteVideos]);

  return (
    <Grid container item md={12} className="FavoriteFeedGrid">
      <Grid item md={12}>
        <h3>Favorites</h3>
      </Grid>
      <Grid container item md={12} direction="row">
        <GridList cellHeight={180} cols={5} spacing={20} className="FavoriteFeedGridList">
          {favorites.map((video) => (
            <GridListTile cols={1} key={video.id} className="FavoriteFeedGridTile">
              <Link to={`/watch/${video.id}`} className="FavoriteFeedGridLink">
                <img
                  src={`${video.info.thumbnails.high.url}`}
                  alt=""
                  className="FavoriteFeedVideoImg"
                />
              </Link>
              <GridListTileBar
                title={video.info.title}
                actionIcon={
                  <IconButton onClick={() => favorite(video.id)}>
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
  );
}

export default FavoriteFeed;
