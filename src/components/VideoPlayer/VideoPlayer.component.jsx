import React, { useState, useEffect, useContext } from 'react';

import { Grid, IconButton } from '@material-ui/core';

import { Star, StarBorder } from '@material-ui/icons';

import { SearchContext } from '../../providers/Search';

import './VideoPlayer.styles.css';

function VideoPlayer({ videoId }) {
  const { getVideo } = useContext(SearchContext);

  const [video, setVideo] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  function favorite() {
    setIsFavorite(!isFavorite);
  }

  useEffect(() => {
    const fetchVideo = async () => {
      setVideo(await getVideo(videoId));
    };
    fetchVideo();
  }, [getVideo, videoId]);

  return (
    <Grid container md={12} direction="column">
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
          <h3>{video.title}</h3>
        </Grid>
        <Grid container item md={2} justify="flex-end">
          <Grid>
            <IconButton onClick={favorite}>
              {isFavorite ? <Star /> : <StarBorder />}
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default VideoPlayer;
