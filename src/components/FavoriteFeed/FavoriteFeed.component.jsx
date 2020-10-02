import React, { useContext, useEffect } from 'react';
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

import Types from '../../utils/actionTypes';
import { getFavoriteVideos } from '../../api/youtubeApi';

function FavoriteFeed() {
  const { searchState, searchDispatch } = useContext(SearchContext);
  const { includesFavorite, favoriteDispatch } = useContext(FavoriteContext);

  useEffect(() => {
    const search = async () => {
      searchDispatch({ type: Types.SEARCH_FEED, searchFeed: await getFavoriteVideos() });
    };

    search();
  }, []);

  return (
    <Grid container item md={12} className="FavoriteFeedGrid">
      <Grid item md={12}>
        <h3>Favorites</h3>
      </Grid>
      <Grid container item md={12} direction="row">
        <GridList cellHeight={180} cols={5} spacing={20} className="FavoriteFeedGridList">
          {searchState.searchFeed.map((video) => (
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
                  <IconButton>
                    {includesFavorite(video.id) ? (
                      <Star
                        style={{ fill: 'white' }}
                        onClick={() =>
                          favoriteDispatch({
                            type: Types.REMOVE_FAVORITE,
                            id: video.id,
                          })
                        }
                      />
                    ) : (
                      <StarBorder
                        style={{ fill: 'white' }}
                        onClick={() =>
                          favoriteDispatch({ type: Types.ADD_FAVORITE, id: video.id })
                        }
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
