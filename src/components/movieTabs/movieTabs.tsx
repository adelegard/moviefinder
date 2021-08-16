import React from 'react';
import { Box, Tabs, Tab, Typography, makeStyles } from '@material-ui/core';
import Search from '../search';
import Favorites, { useMapOfFavorites } from '../favorites';
import Footer from '../footer';

const useStyles = makeStyles((theme) => ({
  flexFullHeight: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}));

const MovieTabs = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const imdbIdsToMovie = useMapOfFavorites();
  const numFavorites = React.useMemo(
    () => Object.keys(imdbIdsToMovie).length,
    [imdbIdsToMovie],
  );

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.flexFullHeight}>
      <Box px={3} pt={3}>
        <Typography variant="h1">Movie Finder</Typography>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Search" />
          <Tab
            label={`Favorites${numFavorites > 0 ? ` (${numFavorites})` : ''}`}
          />
        </Tabs>
      </Box>
      <div hidden={value !== 0}>
        <Search />
      </div>
      {value === 1 && (
        <div className={classes.flexFullHeight}>
          <Footer>
            <Favorites />
          </Footer>
        </div>
      )}
    </div>
  );
};

export default MovieTabs;
