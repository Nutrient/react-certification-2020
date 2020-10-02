import { CONTENT_USER_FAVORITES_KEY } from '../utils/constants';
import { storage } from '../utils/storage';

const API_URL = 'https://www.googleapis.com/youtube/v3';

const { REACT_APP_YOUTUBE_API_KEY } = process.env;

export const getCategoryFeed = async (category) => {
  const res = await fetch(
    `${API_URL}/videos?key=${REACT_APP_YOUTUBE_API_KEY}&part=snippet&maxResults=10&chart=mostPopular&videoCategoryId=${category.id}&regionCode=mx`
  );
  const categoryFeed = await res.json();
  return {
    id: category.id,
    category: category.key,
    videos: categoryFeed.items.map((item) => ({ id: item.id, info: item.snippet })),
  };
};

export const getVideo = async (videoId) => {
  const res = await fetch(
    `${API_URL}/videos?key=${REACT_APP_YOUTUBE_API_KEY}&part=snippet&id=${videoId}`
  );
  const video = await res.json();

  return {
    title: video.items[0].snippet.title,
    description: video.items[0].snippet.description,
  };
};

export const getRelatedVideos = async (videoId) => {
  const res = await fetch(
    `${API_URL}/search?part=snippet&relatedToVideoId=${videoId}&type=video&key=${REACT_APP_YOUTUBE_API_KEY}&maxResults=15`
  );
  const suggestionFeed = await res.json();

  return suggestionFeed.items.map((item) => ({
    id: item.id.videoId,
    info: item.snippet,
  }));
};

export const getVideoSearch = async (query) => {
  const res = await fetch(
    `${API_URL}/search?q=${query}&part=snippet&key=${REACT_APP_YOUTUBE_API_KEY}&maxResults=50&type=video`
  );
  const videoSearch = await res.json();

  return videoSearch.items.map((item) => ({ id: item.id.videoId, info: item.snippet }));
};

export const getFavoriteVideos = async () => {
  const favoriteList = storage.get(CONTENT_USER_FAVORITES_KEY);

  const res = await fetch(
    `${API_URL}/videos?id=${favoriteList.join(
      ','
    )}&part=snippet&key=${REACT_APP_YOUTUBE_API_KEY}&maxResults=50`
  );

  const videoSearch = await res.json();

  return videoSearch.items.map((item) => ({ id: item.id, info: item.snippet }));
};
