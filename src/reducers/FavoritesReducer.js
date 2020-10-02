import Types from '../utils/actionTypes';
import { storage } from '../utils/storage';
import { CONTENT_USER_FAVORITES_KEY } from '../utils/constants';

export default (state, action) => {
  switch (action.type) {
    case Types.ADD_FAVORITE: {
      const favorites = [...state.favoriteFeed, action.id];
      storage.set(CONTENT_USER_FAVORITES_KEY, favorites);
      return {
        ...state,
        favoriteFeed: favorites,
      };
    }
    case Types.REMOVE_FAVORITE: {
      const favorites = state.favoriteFeed.filter((id) => id !== action.id);
      storage.set(CONTENT_USER_FAVORITES_KEY, favorites);
      return {
        ...state,
        favoriteFeed: favorites,
      };
    }
    default: {
      return state;
    }
  }
};
