import React, { useReducer } from 'react';

import feedReducer from '../../reducers/FeedReducer';
import favoriteReducer from '../../reducers/FavoritesReducer';

import { storage } from '../../utils/storage';
import { CONTENT_USER_FAVORITES_KEY } from '../../utils/constants';

export const SearchContext = React.createContext();
export const FavoriteContext = React.createContext();

const defaultSearchState = {
  feed: [],
  currentVideo: {},
  relatedVideos: [],
  searchFeed: [],
};

const defaultFavoriteState = {
  favoriteFeed: storage.get(CONTENT_USER_FAVORITES_KEY) || [],
};

function SearchProvider({ children }) {
  const [searchState, searchDispatch] = useReducer(feedReducer, defaultSearchState);
  const [favoriteState, favoriteDispatch] = useReducer(
    favoriteReducer,
    defaultFavoriteState
  );

  const includesFavorite = (videoId) => {
    return favoriteState.favoriteFeed.includes(videoId);
  };

  return (
    <SearchContext.Provider
      value={{
        searchState,
        searchDispatch,
      }}
    >
      <FavoriteContext.Provider
        value={{
          favoriteState,
          favoriteDispatch,
          includesFavorite,
        }}
      >
        {children}
      </FavoriteContext.Provider>
    </SearchContext.Provider>
  );
}

export default SearchProvider;
