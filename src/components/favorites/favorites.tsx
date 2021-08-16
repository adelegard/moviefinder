import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import MovieTable from '../movieTable';
import { useMapOfFavorites } from './context';
import Empty from '../empty';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Favorites = () => {
  const classes = useStyles();
  const movieFavoritesMap = useMapOfFavorites();
  const movies = React.useMemo(
    () => Object.values(movieFavoritesMap),
    [movieFavoritesMap],
  );

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        {movies.length > 0 ? (
          <MovieTable movies={movies} />
        ) : (
          <Empty>
            No movies have been favorited. Go to the search tab and find some to
            favorite!
          </Empty>
        )}
      </Grid>
    </Grid>
  );
};

export default Favorites;
