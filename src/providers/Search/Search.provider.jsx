import React from 'react';

import { CONTENT_USER_FAVORITES_KEY } from '../../utils/constants';
import { storage } from '../../utils/storage';

const { REACT_APP_YOUTUBE_API_KEY } = process.env;

export const SearchContext = React.createContext();
export const FavoriteContext = React.createContext();

function SearchProvider({ children }) {
  const getCategoryFeed = async (category) => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${REACT_APP_YOUTUBE_API_KEY}&part=snippet&maxResults=10&chart=mostPopular&videoCategoryId=${category.id}&regionCode=mx`
    );
    const categoryFeed = await res.json();
    return {
      id: category.id,
      category: category.key,
      videos: categoryFeed.items.map((item) => ({ id: item.id, info: item.snippet })),
    };
  };

  const getVideo = async (videoId) => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${REACT_APP_YOUTUBE_API_KEY}&part=snippet&id=${videoId}`
    );
    const video = await res.json();

    return {
      title: video.items[0].snippet.title,
      description: video.items[0].snippet.description,
    };
  };

  const getRelatedVideos = async (videoId) => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&key=${REACT_APP_YOUTUBE_API_KEY}&maxResults=15`
    );
    const suggestionFeed = await res.json();

    return suggestionFeed.items.map((item) => ({
      id: item.id.videoId,
      info: item.snippet,
    }));
  };

  const getVideoSearch = async (query) => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?q=${query}&part=snippet&key=${REACT_APP_YOUTUBE_API_KEY}&maxResults=50`
    );
    const videoSearch = await res.json();

    return videoSearch.items.map((item) => ({ id: item.id.videoId, info: item.snippet }));
  };

  const getFavoriteVideos = async () => {
    const favoriteList = storage.get(CONTENT_USER_FAVORITES_KEY);

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${favoriteList.join(
        ','
      )}&part=snippet&key=${REACT_APP_YOUTUBE_API_KEY}&maxResults=50`
    );

    const videoSearch = await res.json();

    return videoSearch.items.map((item) => ({ id: item.id, info: item.snippet }));
  };

  function addFavorite(videoId) {
    const favorites = storage.get(CONTENT_USER_FAVORITES_KEY);
    favorites.push(videoId);
    storage.set(CONTENT_USER_FAVORITES_KEY, favorites);
  }

  function removeFavorite(videoId) {
    const favorites = storage
      .get(CONTENT_USER_FAVORITES_KEY)
      .filter((id) => id !== videoId);

    storage.set(CONTENT_USER_FAVORITES_KEY, favorites);
  }

  function includesFavorite(videoId) {
    return (storage.get(CONTENT_USER_FAVORITES_KEY) || []).includes(videoId);
  }

  return (
    <SearchContext.Provider
      value={{
        getCategoryFeed,
        getVideo,
        getRelatedVideos,
        getVideoSearch,
        getFavoriteVideos,
      }}
    >
      <FavoriteContext.Provider value={{ addFavorite, removeFavorite, includesFavorite }}>
        {children}
      </FavoriteContext.Provider>
    </SearchContext.Provider>
  );
}

export default SearchProvider;
