import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ModuliboxList({ values }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const isChecked = id => {
    const val = checked.indexOf(id) > -1;
    return val ? 'blue' : 'white';
  };

  return (
    <List className={classes.root}>
      {values.map((item, idx) => {
        const labelId = `checkbox-list-label-${item.title}`;

        return (
          <ListItem key={idx} role={undefined} dense button onClick={handleToggle(item.id)}>
            <p id={labelId} style={{ color: 'black', backGround: isChecked(item.id) }}>
              {item.title}
            </p>
          </ListItem>
        );
      })}
    </List>
  );
}
