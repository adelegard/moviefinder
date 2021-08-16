import { ImdbIDsToMovie as ImdbIDsToMovieProxy } from './context';

export { default } from './favorites';
export {
  useAddFavoriteMovie,
  useRemoveFavoriteMovie,
  useMapOfFavorites,
  FavoritesProvider,
} from './context';
export type ImdbIDsToMovie = ImdbIDsToMovieProxy;
