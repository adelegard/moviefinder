import Movie from '../../types/movie';

interface DisplayEmptyProps {
  isFetched: boolean;
  isError: boolean;
  isLoading: boolean;
  searchValue: string;
  movies?: Movie[];
}

export const shouldDisplayEmptyState = ({
  isFetched,
  isError,
  isLoading,
  searchValue,
  movies,
}: DisplayEmptyProps) => {
  return (
    isFetched &&
    !isError &&
    !isLoading &&
    searchValue.length > 0 &&
    !movies?.length
  );
};
