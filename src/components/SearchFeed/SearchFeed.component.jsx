import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
} from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';

import { SearchContext, FavoriteContext } from '../../providers/Search';

import './SearchFeed.styles.css';

import Types from '../../utils/actionTypes';

import { getVideoSearch } from '../../api/youtubeApi';

function SearchFeed({ query }) {
  const { searchState, searchDispatch } = useContext(SearchContext);
  const { favoriteDispatch, includesFavorite } = useContext(FavoriteContext);

  useEffect(() => {
    const search = async () => {
      searchDispatch({
        type: Types.SEARCH_FEED,
        searchFeed: await getVideoSearch(query),
      });
    };

    search();
  }, [query]);

  return (
    <Grid container item md={12} className="SearchFeedGrid">
      <Grid item md={12}>
        <h3>Search results for: {query}</h3>
      </Grid>
      <Grid container item md={12} direction="row">
        <GridList cellHeight={180} cols={5} spacing={20}>
          {searchState.searchFeed.map((video) => (
            <GridListTile cols={1} key={video.id} className="SearchFeedGridTile">
              <Link to={`/watch/${video.id}`} className="SearchFeedGridLink">
                <img
                  src={`${video.info.thumbnails.high.url}`}
                  alt=""
                  className="SearchFeedVideoImg"
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

export default SearchFeed;
