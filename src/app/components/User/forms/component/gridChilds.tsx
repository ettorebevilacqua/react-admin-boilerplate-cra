// DEBUG: gridChild
import React from 'react';
import Button from '@material-ui/core/Button';
import { Box, MenuItem } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const GridLayout = props => {
  const { children, view, style, spacing, childProps, ...cardProps } = props;

  const render = (child, i) =>
    child && (
      <Grid
        key={'subGridLay' + i}
        {...childProps}
        item
        xs={view && view[i] ? view[i] : 12}
      >
        {child}
      </Grid>
    );

  const childs = children && children.map ? children : [children];
  const styleTo = style || { height: '100%' };
  return (
    children && (
      <Grid container style={styleTo} {...cardProps} spacing={spacing || 1}>
        {childs.map(render)}
      </Grid>
    )
  );
};

export default GridLayout;
