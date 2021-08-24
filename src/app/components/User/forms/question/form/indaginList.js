import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import GridChilds from '../../component/gridChilds';
// import { withRouter } from 'react-router';
import { withRouter, Switch, Route, Link, useParams } from 'react-router-dom';
import { ShowQuestion } from 'app/components/User/forms/question/form/show';

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    maxWidth: '80%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const routeToBase = id => `/app/user/indagini_invio/${id}/0`;
// const routeToBase = id => `/app/user/indagini_question/${id}`;

function IndaginiList(props) {
  const { values, history } = props;
  const [isShow, setIsShow] = React.useState(false);
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const icon = false;

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
    // onEdit(idx);
  };
  const command = () => {};

  return (
    <>
      {isShow ? (
        <>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            onClick={e => setIsShow(false)}
          >
            Indagini
          </Button>

          <ShowQuestion values={{ domande: [] }} />
        </>
      ) : (
        <>
          <GridChilds
            view={[12]}
            style={{
              marginTop: '4px',
              padding: '8px',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <h2>Apri Indagine</h2>
          </GridChilds>
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
                  >
                    <ListItemText id={labelId} primary={`${value.title}`} />
                    <ListItemSecondaryAction>
                      <GridChilds
                        spacing={1}
                        view={[6, 6]}
                        style={{ alignItems: 'center', marginLeft: '12px' }}
                      >
                        <Button
                          color="primary"
                          variant="contained"
                          fullWidth
                          type="submit"
                          onClick={e => setIsShow(true)}
                        >
                          Anteprima
                        </Button>

                        <Button
                          color="primary"
                          variant="contained"
                          fullWidth
                          type="submit"
                          onClick={e =>
                            history.push(routeToBase(value.id), value)
                          }
                        >
                          edit
                        </Button>
                      </GridChilds>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
          </List>
        </>
      )}
    </>
  );
}

export default withRouter(IndaginiList);
