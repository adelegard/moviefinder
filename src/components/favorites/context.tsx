import React from 'react';
import Movie from '../../types/movie';

export interface ImdbIDsToMovie {
  [imdbID: string]: Movie;
}

interface Props {
  imdbIdsToMovie: ImdbIDsToMovie;
  addMovie: (movie: Movie) => void;
  removeMovie: (movie: Movie) => void;
}

export const Context = React.createContext<Props>({
  imdbIdsToMovie: {},
  addMovie: () => undefined,
  removeMovie: () => undefined,
});

export const useMapOfFavorites = () => {
  return React.useContext(Context).imdbIdsToMovie;
};

export const useAddFavoriteMovie = () => {
  return React.useContext(Context).addMovie;
};

export const useRemoveFavoriteMovie = () => {
  return React.useContext(Context).removeMovie;
};

interface ProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider = ({ children }: ProviderProps) => {
  const [imdbIdsToMovie, setImdbIdsToMovie] = React.useState<ImdbIDsToMovie>(
    {},
  );
  const addMovie = React.useCallback(
    (movie: Movie) => {
      setImdbIdsToMovie({
        ...imdbIdsToMovie,
        [movie.imdbID]: movie,
      });
    },
    [imdbIdsToMovie],
  );
  const removeMovie = React.useCallback(
    (movie: Movie) => {
      const imdbIdsToMovieNew = { ...imdbIdsToMovie };
      delete imdbIdsToMovieNew[movie.imdbID];
      setImdbIdsToMovie(imdbIdsToMovieNew);
    },
    [imdbIdsToMovie],
  );
  const value = React.useMemo(
    () => ({
      imdbIdsToMovie,
      addMovie,
      removeMovie,
    }),
    [addMovie, removeMovie, imdbIdsToMovie],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
