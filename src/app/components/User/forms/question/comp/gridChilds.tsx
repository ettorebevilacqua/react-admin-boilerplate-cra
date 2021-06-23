import React from 'react';
import Button from '@material-ui/core/Button';
import { Box, MenuItem } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const GridLayout = props => {
  const { children, view } = props;

  const render = (child, i) =>
    child && (
      <Grid id={'subGridLay' + i} item xs={view && view[i] ? view[i] : 12}>
        {child}
      </Grid>
    );

  const childs = children && children.map ? children : [children];
  return (
    children && (
      <Grid container style={{ height: '100%' }} spacing={3}>
        {childs.map(render)}
      </Grid>
    )
  );
};

export default GridLayout;
