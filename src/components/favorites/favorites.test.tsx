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

test('renders our movie table', () => {
  jest.spyOn(context, 'useMapOfFavorites').mockReturnValue({});
  render(<Favorites />);
  expect(screen.getByText('movie_table')).toBeInTheDocument();
});
