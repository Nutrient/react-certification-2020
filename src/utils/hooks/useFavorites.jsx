import { CONTENT_USER_FAVORITES_KEY } from '../constants';
import { storage } from '../storage';

function useAddFavorite(videoId) {
  const favorites = storage.get(CONTENT_USER_FAVORITES_KEY);
  favorites.push(videoId);
  storage.set(CONTENT_USER_FAVORITES_KEY, favorites);
}

function useRemoveFavorite(videoId) {
  const favorites = storage
    .get(CONTENT_USER_FAVORITES_KEY)
    .filter((id) => id !== videoId);

  storage.set(CONTENT_USER_FAVORITES_KEY, favorites);
}

export { useAddFavorite, useRemoveFavorite };
