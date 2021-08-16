import React from 'react';
import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

interface Props {
  children: React.ReactNode;
}

const Empty = ({ children }: Props) => {
  return (
    <Alert severity="info">
      <Typography variant="body1">{children}</Typography>
    </Alert>
  );
};

export default Empty;
