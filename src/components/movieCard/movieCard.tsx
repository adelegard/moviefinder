import React from 'react';
import {
  Box,
  Grid,
  Link,
  makeStyles,
  Paper,
  Typography,
  Button,
} from '@material-ui/core';
import Movie from '../../types/movie';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    alignItems: 'center',
    flexDirection: 'column',
  },
  container: {
    overflow: 'hidden',
  },
  containerInner: {
    height: '340px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  detailsLink: {
    marginTop: theme.spacing(1),
  },
  image: {
    width: '100%',
  },
  poster: {
    height: '100%',
    padding: theme.spacing(2),
  },
}));

interface Props {
  movie: Movie;
  isFavorite?: boolean;
  onFavoriteClick: (movie: Movie) => void;
}

const MovieCard = ({ movie, isFavorite, onFavoriteClick }: Props) => {
  const classes = useStyles();
  const onClick = () => {
    onFavoriteClick(movie);
  };
  return (
    <Grid item xs={12} sm={6} md={4} lg={2}>
      <Paper className={classes.container}>
        {movie.Poster === 'N/A' ? (
          <div className={classes.containerInner}>
            <div className={classes.poster}>
              <Typography variant="h6">{movie.Title}</Typography>
              <Typography variant="body1">{movie.Year}</Typography>
            </div>
          </div>
        ) : (
          <div className={classes.containerInner}>
            <img
              src={movie.Poster}
              alt={movie.Title}
              className={classes.image}
            />
          </div>
        )}
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color={isFavorite ? 'secondary' : 'primary'}
            onClick={onClick}
          >
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </Button>
          <Link
            className={classes.detailsLink}
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography variant="body2">View Details</Typography>
          </Link>
        </div>
      </Paper>
    </Grid>
  );
};

export default MovieCard;
