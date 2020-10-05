import React, { useContext, useEffect } from 'react';

import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
} from '@material-ui/core';

import { Star, StarBorder } from '@material-ui/icons';

import { Link } from 'react-router-dom';
import { SearchContext, FavoriteContext } from '../../providers/Search';

import './RecommendationFeed.styles.css';

import Types from '../../utils/actionTypes';

import { getRelatedVideos } from '../../api/youtubeApi';

function RecommendationFeed({ videoId }) {
  const { searchState, searchDispatch } = useContext(SearchContext);
  const { favoriteDispatch, includesFavorite } = useContext(FavoriteContext);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      searchDispatch({
        type: Types.RELATED_FEED,
        relatedVideos: await getRelatedVideos(videoId),
      });
    };
    fetchRelatedVideos();
  }, []);

  return (
    <Grid container item md={12} direction="column">
      <GridList cellHeight={180} cols={1} spacing={20} className="RecommendationFeedList">
        <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
          <h3>Suggestion Feed</h3>
        </GridListTile>
        {searchState.relatedVideos.map((video) => (
          <GridListTile cols={1} key={video.id} className="RecommendationFeedTile">
            <Link to={`/watch/${video.id}`} className="RecommendationFeedLink">
              <img
                src={`${video.info.thumbnails.high.url}`}
                alt=""
                className="RecommendationFeedVideoImg"
              />
            </Link>
            <GridListTileBar
              title={video.info.title}
              actionIcon={
                <IconButton
                  onClick={() =>
                    favoriteDispatch({
                      type: includesFavorite(video.id)
                        ? Types.REMOVE_FAVORITE
                        : Types.ADD_FAVORITE,
                      id: video.id,
                    })
                  }
                >
                  {includesFavorite(video.id) ? (
                    <Star style={{ fill: 'white' }} />
                  ) : (
                    <StarBorder style={{ fill: 'white' }} />
                  )}
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </Grid>
  );
}

export default RecommendationFeed;
