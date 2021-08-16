import { render, screen } from '@testing-library/react';
import Favorites from './favorites';
import * as context from './context';
import * as movieTable from '../movieTable/movieTable';

beforeEach(() => {
  jest.spyOn(movieTable, 'default').mockReturnValue(<div>movie_table</div>);
});

afterEach(() => {
  jest.clearAllMocks();
});

test('should not render movie table when no favorites exist', () => {
  jest.spyOn(context, 'useMapOfFavorites').mockReturnValueOnce({});
  render(<Favorites />);
  expect(screen.queryByText('movie_table')).not.toBeInTheDocument();
});

test('should render movie table when favorites exist', () => {
  jest.spyOn(context, 'useMapOfFavorites').mockReturnValueOnce({
    '1': {
      Title: 'title',
      Year: '1999',
      Poster: 'poster',
      imdbID: '1',
    },
  });
  render(<Favorites />);
  expect(screen.getByText('movie_table')).toBeInTheDocument();
});
