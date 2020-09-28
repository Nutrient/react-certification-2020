import React from 'react';

const { REACT_APP_YOUTUBE_API_KEY } = process.env;

export const SearchContext = React.createContext();

function SearchProvider({ children }) {
  const categories = {
    2: 'Autos & Vehicles',
    1: 'Film & Animation',
    10: 'Music',
    15: 'Pets & Animals',
    17: 'Sports',
    18: 'Short Movies',
    19: 'Travel & Events',
    20: 'Gaming',
    21: 'Videoblogging',
    22: 'People & Blogs',
    23: 'Comedy',
    24: 'Entertainment',
    25: 'News & Politics',
    26: 'Howto & Style',
    27: 'Education',
    28: 'Science & Technology',
    29: 'Nonprofits & Activism',
    30: 'Movies',
    31: 'Anime/Animation',
    32: 'Action/Adventure',
    33: 'Classics',
    34: 'Comedy',
    35: 'Documentary',
    36: 'Drama',
    37: 'Family',
    38: 'Foreign',
    39: 'Horror',
    40: 'Sci:Fi/Fantasy',
    41: 'Thriller',
    42: 'Shorts',
    43: 'Shows',
    44: 'Trailers',
  };

  const getCategoryFeed = async (categoryId) => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${REACT_APP_YOUTUBE_API_KEY}&part=snippet&maxResults=10&chart=mostPopular&videoCategoryId=${categoryId}&regionCode=mx`
    );
    const categoryFeed = await res.json();
    return {
      category: categories[categoryId],
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

  return (
    <SearchContext.Provider
      value={{ getCategoryFeed, getVideo, getRelatedVideos, getVideoSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
