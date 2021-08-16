import { render, screen } from '@testing-library/react';
import MovieTable from './movieTable';
import * as MovieCard from '../movieCard/movieCard';
import * as favorites from '../favorites/context';

beforeEach(() => {
  jest.spyOn(MovieCard, 'default').mockReturnValue(<div>movie_card</div>);
  jest.spyOn(favorites, 'useMapOfFavorites').mockReturnValue({});
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders the movie cards', () => {
  render(
    <MovieTable
      movies={[
        {
          Title: 'title1',
          Year: '2000',
          imdbID: '1',
          Poster: 'poster',
        },
        {
          Title: 'title1',
          Year: '2000',
          imdbID: '2',
          Poster: 'poster',
        },
      ]}
      totalResults={10}
      pageNumber={1}
      onPageChange={() => undefined}
    />,
  );
  expect(screen.getAllByText('movie_card').length).toEqual(2);
});
