import Types from '../utils/actionTypes';

export default (state, action) => {
  switch (action.type) {
    case Types.MAIN_FEED: {
      return {
        ...state,
        feed: action.feed,
      };
    }
    case Types.SEARCH_FEED: {
      return {
        ...state,
        searchFeed: action.searchFeed,
      };
    }
    case Types.GET_VIDEO: {
      return {
        ...state,
        currentVideo: action.video,
      };
    }
    case Types.RELATED_FEED: {
      return {
        ...state,
        relatedVideos: action.relatedVideos,
      };
    }
    default: {
      return state;
    }
  }
};
