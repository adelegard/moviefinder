import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    flex: '1 0 auto',
  },
  footer: {
    padding: theme.spacing(3),
    flexShrink: 0,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
}));

interface Props {
  children: React.ReactNode;
}

const Footer = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.content}>{children}</div>
      <div className={classes.footer}>My favorite color is blue</div>
    </>
  );
};

export default Footer;
