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
import { useAuth } from '../../../providers/Auth';

import './FeedSection.styles.css';

import { FavoriteContext } from '../../../providers/Search';

import Types from '../../../utils/actionTypes';

function FeedSection({ feed }) {
  const [isLogged, setIsLogged] = useState(false);

  const { includesFavorite, favoriteDispatch } = useContext(FavoriteContext);
  const { authenticated } = useAuth();

  useEffect(() => {
    setIsLogged(authenticated);
  }, [authenticated]);

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
                  <img
                    src={`${video.info.thumbnails.high.url}`}
                    alt=""
                    className="FeedVideoImg"
                  />
                </Link>
                <GridListTileBar
                  title={video.info.title}
                  className="FeedCardTileBar"
                  actionIcon={
                    isLogged ? (
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
                    ) : (
                      <div />
                    )
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
