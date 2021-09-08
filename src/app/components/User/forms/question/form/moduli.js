import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CommentIcon from '@material-ui/icons/Comment';
import GridChilds from '../../component/gridChilds';
// import { HistoryRounded } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export function Moduli({ onEdit, values, command }) {
  const history = useHistory();
  const classes = useStyles();
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [checked, setChecked] = React.useState([0]);
  const icon = false;

  React.useEffect(() => isFirstTime && setIsFirstTime(false), [isFirstTime]);
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

  const handleEditBt = idx => {
    onEdit(idx);
  };

  return (
    <>
      <GridChilds view={[10, 2]} style={{ marginTop: '16px', width: '100%', alignItems: 'center' }}>
        <h3>Moduli</h3>
        <Button
          variant="contained"
          color="primary"
          style={{ height: '42px', width: '180px' }}
          onClick={() => history.push('/app/user/moduli/' + 0)}
        >
          Nuovo modulo
        </Button>
      </GridChilds>
      <br />
      <List className={classes.root}>
        {values &&
          values.map((value, idxModulo) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={idxModulo}
                role={undefined}
                dense
                button
                onClick={handleToggle(value)}
                style={{ width: '100%', maxWidth: '100%', marginTop: '6px' }}
              >
                {/* <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                */}
                <ListItemText id={labelId} primary={`${value.title}`} />
                <ListItemSecondaryAction>
                  <GridChilds
                    spacing={1}
                    view={[4, 4, 4]}
                    style={{
                      alignItems: 'center',
                      marginLeft: '12px',
                    }}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      type="submit"
                      onClick={() => history.push({ pathname: '/app/user/moduli/' + value.id, state: value })}
                    >
                      Edit
                    </Button>
                    <Box>
                      <Button onClick={() => command('remove', idxModulo)}>
                        <DeleteIcon color="secondary" style={{ fontSize: '36px' }} />
                      </Button>
                    </Box>
                    {icon && (
                      <IconButton edge="end" aria-label="comments">
                        <CommentIcon />
                      </IconButton>
                    )}
                  </GridChilds>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
      </List>
    </>
  );
}
