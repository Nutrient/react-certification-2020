import React, { useEffect, useContext } from 'react';

import { Grid, IconButton } from '@material-ui/core';

import { Star, StarBorder } from '@material-ui/icons';

import { SearchContext, FavoriteContext } from '../../providers/Search';

import './VideoPlayer.styles.css';
import Types from '../../utils/actionTypes';

import { getVideo } from '../../api/youtubeApi';

function VideoPlayer({ videoId }) {
  const { searchDispatch, searchState } = useContext(SearchContext);
  const { favoriteDispatch, includesFavorite } = useContext(FavoriteContext);

  useEffect(() => {
    const fetchVideo = async () => {
      searchDispatch({ type: Types.GET_VIDEO, video: await getVideo(videoId) });
    };
    fetchVideo();
  }, [videoId]);

  return (
    <Grid container item md={12} direction="column">
      <Grid item md={12}>
        <iframe
          title="video"
          className="VideoPlayer"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Grid>
      <Grid container item md={12} alignItems="center">
        <Grid item md={10}>
          <h3>{searchState.currentVideo.title}</h3>
        </Grid>
        <Grid container item md={2} justify="flex-end">
          <Grid>
            <IconButton
              onClick={() =>
                favoriteDispatch({
                  type: includesFavorite(videoId)
                    ? Types.REMOVE_FAVORITE
                    : Types.ADD_FAVORITE,
                  id: videoId,
                })
              }
            >
              {includesFavorite(videoId) ? <Star /> : <StarBorder />}
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default VideoPlayer;
