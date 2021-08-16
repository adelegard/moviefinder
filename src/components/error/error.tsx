import React from 'react';
import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const Error = () => {
  return (
    <Alert severity="error">
      <Typography variant="body1">
        Oops. There was a problem. Try again.
      </Typography>
    </Alert>
  );
};

export default Error;
