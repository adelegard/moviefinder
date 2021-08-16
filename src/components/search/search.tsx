import React from 'react';
import { Grid, TextField, makeStyles } from '@material-ui/core';
import useQueryMovies, {
  FormattedResponseProps,
} from '../../service/useQueryMovies';
import MovieTable from '../movieTable';
import Empty, { shouldDisplayEmptyState } from '../empty';
import Error from '../error';

const SEARCH_TEXT_DEBOUNCE_MS = 500;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Search = () => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = React.useState('');
  const [searchValueApi, setSearchValueApi] = React.useState('');
  const [pageNumber, setPageNumber] = React.useState(1);
  const [cachedResponse, setCachedResponse] =
    React.useState<FormattedResponseProps>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  let timeout = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (searchValue === '') {
      setSearchValueApi('');
      return;
    }
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setSearchValueApi(searchValue);
    }, SEARCH_TEXT_DEBOUNCE_MS);
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [searchValue]);

  const onPageChange = (
    _event: React.ChangeEvent<unknown> | null,
    page: number,
  ) => {
    setPageNumber(page);
  };
  const queryMovies = useQueryMovies(
    {
      search: searchValueApi,
      page: pageNumber,
    },
    {
      enabled: searchValueApi.length > 0,
    },
  );

  React.useEffect(() => {
    if (queryMovies.data) {
      setCachedResponse(queryMovies.data);
    }
  }, [queryMovies.data]);

  const displayEmpty = shouldDisplayEmptyState({
    ...queryMovies,
    searchValue,
    movies: cachedResponse?.movies,
  });

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <TextField
          autoFocus
          variant="outlined"
          value={searchValue}
          onChange={onChange}
          placeholder="Search for a movie"
        />
      </Grid>
      <Grid item xs={12}>
        {queryMovies.isError ? (
          <Error />
        ) : displayEmpty ? (
          <Empty>No movies found. Try changing your search.</Empty>
        ) : (
          <MovieTable
            movies={cachedResponse?.movies ?? []}
            pageNumber={pageNumber}
            onPageChange={onPageChange}
            totalResults={cachedResponse?.totalResults}
            isLoading={queryMovies.isLoading}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Search;
