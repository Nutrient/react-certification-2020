import React, { useState, useContext, useEffect } from 'react';

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

function RecommendationFeed({ videoId }) {
  const { getRelatedVideos } = useContext(SearchContext);
  const { addFavorite, removeFavorite, includesFavorite } = useContext(FavoriteContext);

  const [relatedVideos, setRelatedVideos] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  function favorite() {
    setIsFavorite(!isFavorite);
  }

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      setRelatedVideos(await getRelatedVideos(videoId));
    };
    fetchRelatedVideos();
  }, [getRelatedVideos, videoId]);

  return (
    <Grid container item md={12} direction="column">
      <GridList cellHeight={180} cols={1} spacing={20} className="RecommendationFeedList">
        <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
          <h3>Suggestion Feed</h3>
        </GridListTile>
        {relatedVideos.map((video) => (
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
  );
}

export default RecommendationFeed;
