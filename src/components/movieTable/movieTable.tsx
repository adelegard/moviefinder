import React from 'react';
import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Movie from '../../types/movie';
import MovieCard from '../movieCard';
import {
  useAddFavoriteMovie,
  useRemoveFavoriteMovie,
  useMapOfFavorites,
} from '../favorites';

const onPageChangeNoOp = () => undefined;

interface Props {
  isLoading?: boolean;
  movies: Movie[];
  totalResults?: number;
  pageNumber?: number;
  onPageChange?: (
    event: React.ChangeEvent<unknown> | null,
    page: number,
  ) => void;
}

const MovieTable = ({
  isLoading,
  movies,
  totalResults = 0,
  pageNumber = 1,
  onPageChange,
}: Props) => {
  const movieFavoritesMap = useMapOfFavorites();
  const addFavorite = useAddFavoriteMovie();
  const removeFavorite = useRemoveFavoriteMovie();
  const onFavoriteClick = (movie: Movie) => {
    const isFavorite = Boolean(movieFavoritesMap[movie.imdbID]);
    if (isFavorite) {
      removeFavorite(movie);
    } else {
      addFavorite(movie);
    }
  };
  const hasPagination =
    Boolean(totalResults) &&
    Boolean(pageNumber) &&
    totalResults > movies.length &&
    onPageChange;
  const pagination = hasPagination && (
    <Grid item xs={12}>
      <Pagination
        color="primary"
        siblingCount={0}
        count={Math.ceil(totalResults / 10)}
        page={pageNumber}
        onChange={onPageChange ?? onPageChangeNoOp}
        disabled={isLoading}
      />
    </Grid>
  );
  return (
    <Grid container spacing={3}>
      {pagination}
      {movies.length > 0 &&
        movies.map((movie) => {
          const isFavorite = Boolean(movieFavoritesMap[movie.imdbID]);
          return (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorite={isFavorite}
              onFavoriteClick={onFavoriteClick}
            />
          );
        })}
      {pagination}
    </Grid>
  );
};

export default MovieTable;
