import { render, screen } from '@testing-library/react';
import MovieCard from './movieCard';

test('renders the movie title when no poster', () => {
  render(
    <MovieCard
      movie={{ Title: 'title1', Year: '1998', imdbID: '1', Poster: 'N/A' }}
      isFavorite={false}
      onFavoriteClick={() => undefined}
    />,
  );
  expect(screen.getByText('title1')).toBeInTheDocument();
});

test('renders the movie Year when no poster', () => {
  render(
    <MovieCard
      movie={{ Title: 'title1', Year: '1998', imdbID: '1', Poster: 'N/A' }}
      isFavorite={false}
      onFavoriteClick={() => undefined}
    />,
  );
  expect(screen.getByText('1998')).toBeInTheDocument();
});

test('renders the movie poster', () => {
  render(
    <MovieCard
      movie={{
        Title: 'title1',
        Year: '1998',
        imdbID: '1',
        Poster: 'https://something.jpg',
      }}
      isFavorite={false}
      onFavoriteClick={() => undefined}
    />,
  );
  expect(screen.getByRole('img')).toHaveAttribute(
    'src',
    'https://something.jpg',
  );
});

test('renders the button as Favorite when not favorited', () => {
  render(
    <MovieCard
      movie={{
        Title: 'title1',
        Year: '1998',
        imdbID: '1',
        Poster: 'N/A',
      }}
      isFavorite={false}
      onFavoriteClick={() => undefined}
    />,
  );
  expect(screen.getByRole('button')).toHaveTextContent('Favorite');
});

test('renders the button as Unfavorite when favorited', () => {
  render(
    <MovieCard
      movie={{
        Title: 'title1',
        Year: '1998',
        imdbID: '1',
        Poster: 'N/A',
      }}
      isFavorite={true}
      onFavoriteClick={() => undefined}
    />,
  );
  expect(screen.getByRole('button')).toHaveTextContent('Unfavorite');
});

test('should trigger the onFavorite function when button clicked', () => {
  const onFavoriteClick = jest.fn();
  render(
    <MovieCard
      movie={{
        Title: 'title1',
        Year: '1998',
        imdbID: '1',
        Poster: 'N/A',
      }}
      isFavorite={false}
      onFavoriteClick={onFavoriteClick}
    />,
  );
  screen.getByRole('button').click();
  expect(onFavoriteClick).toHaveBeenCalledTimes(1);
});

test('should render the view details link', () => {
  render(
    <MovieCard
      movie={{
        Title: 'title1',
        Year: '1998',
        imdbID: '1',
        Poster: 'N/A',
      }}
      isFavorite={false}
      onFavoriteClick={() => undefined}
    />,
  );
  expect(screen.getByRole('link')).toHaveAttribute(
    'href',
    'https://www.imdb.com/title/1',
  );
});
