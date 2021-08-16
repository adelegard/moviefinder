import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Alert, Pagination } from '@material-ui/lab';
import Movie from '../../types/movie';
import MovieCard from '../movieCard';
import { useAddMovie, useRemoveMovie, useImdbIdsToMovie } from '../favorites';

const onPageChangeNoOp = () => undefined;

interface Props {
  emptyText: string;
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
  emptyText,
  isLoading,
  movies,
  totalResults = 0,
  pageNumber = 1,
  onPageChange,
}: Props) => {
  const imdbIDsToMovie = useImdbIdsToMovie();
  const addFavorite = useAddMovie();
  const removeFavorite = useRemoveMovie();
  const onFavoriteClick = (movie: Movie) => {
    const isFavorite = Boolean(imdbIDsToMovie[movie.imdbID]);
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
          const isFavorite = Boolean(imdbIDsToMovie[movie.imdbID]);
          return (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorite={isFavorite}
              onFavoriteClick={onFavoriteClick}
            />
          );
        })}
      {movies.length === 0 && emptyText && (
        <Grid item xs={12}>
          <Alert severity="info">
            <Typography variant="body1">{emptyText}</Typography>
          </Alert>
        </Grid>
      )}
      {pagination}
    </Grid>
  );
};

export default MovieTable;
