import { UseQueryOptions, useQuery } from 'react-query';
import qs from 'query-string';
import Movie from '../types/movie';

const API_KEY = 'dba3547c';

interface RequestOptions {
  search: string;
  page?: number;
}

interface ApiResponseProps {
  Search: Movie[];
  totalResults: string;
}

export interface FormattedResponseProps {
  movies: Movie[];
  totalResults: number;
}

const findMoviesFetch = async ({
  search,
  page = 1,
}: RequestOptions): Promise<FormattedResponseProps> => {
  const query = qs.stringify({
    apikey: API_KEY,
    s: search,
    type: 'movie',
    page,
  });

  const response = await fetch(`https://www.omdbapi.com/?${query}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  const apiResponseProps: ApiResponseProps = await response.json();
  const formattedResponseProps: FormattedResponseProps = {
    movies: apiResponseProps.Search,
    totalResults: parseInt(apiResponseProps.totalResults, 10),
  };
  return formattedResponseProps;
};

const useQueryMovies = (
  requestOptions: RequestOptions,
  overrides: UseQueryOptions<FormattedResponseProps> = {},
) => {
  return useQuery<FormattedResponseProps>({
    queryKey: ['movies', requestOptions],
    queryFn: () => findMoviesFetch(requestOptions),
    retry: false,
    refetchOnWindowFocus: false,
    ...overrides,
  });
};

export default useQueryMovies;
