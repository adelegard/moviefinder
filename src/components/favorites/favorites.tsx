import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import MovieTable from '../movieTable';
import { useImdbIdsToMovie } from './context';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Favorites = () => {
  const classes = useStyles();
  const imdbIdsToMovie = useImdbIdsToMovie();
  const movies = React.useMemo(
    () => Object.values(imdbIdsToMovie),
    [imdbIdsToMovie],
  );

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <MovieTable
          movies={movies}
          emptyText="No movies have been favorited. Go to the search tab and find some to favorite!"
        />
      </Grid>
    </Grid>
  );
};

export default Favorites;
