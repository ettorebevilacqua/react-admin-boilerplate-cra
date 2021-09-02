import React from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import classnames from 'classnames';

// styles
var useStyles = makeStyles((theme: Theme) => ({
  dotBase: {
    width: 5,
    height: 5,
    backgroundColor: theme.palette.text.hint,
    borderRadius: '50%',
    transition: theme.transitions.create('background-color'),
  },
  dotLarge: {
    width: 8,
    height: 8,
  },
}));
interface IDot {
  size?: any;
  color: any;
}
export default function Dot({ size, color }: IDot) {
  var classes = useStyles();
  var theme = useTheme();

  return (
    <div
      className={classnames(classes.dotBase, {
        [classes.dotLarge]: size === 'large',
      })}
      style={{
        backgroundColor: color && theme.palette[color] && theme.palette[color].main,
      }}
    />
  );
}
