import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import GridChilds from '../../component/gridChilds';
// import { withRouter } from 'react-router';
import { withRouter, Switch, Route, Link, useParams } from 'react-router-dom';
import { ShowQuestion } from 'app/components/User/forms/question/form/show';
import Paper from '@material-ui/core/Paper';
import { elemStyle } from '../../stylesElement';

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
  const classes = elemStyle();
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

  const renderIndagine = (value, index) => (
    <Paper className={`${classes.paperRow}`} key={'paper_' + index}>
      <GridChilds
        style={{ alignItems: 'center' }}
        justifyContent="space-between"
        view={[8, 4]}
      >
        <div className={classes.paperRowElem}>
          <h4>{value.title}</h4>
        </div>

        <GridChilds
          spacing={1}
          view={[6, 6]}
          justifyContent="space-between"
          style={{ alignItems: 'center', padding: '0px' }}
        >
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={e => setIsShow(true)}
          >
            Anteprima
          </Button>

          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={e => history.push(routeToBase(value.id), value)}
          >
            edit
          </Button>
        </GridChilds>
      </GridChilds>
    </Paper>
  );
  return (
    <div className={classes.root}>
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

          {values && values.map(renderIndagine)}
        </>
      )}
    </div>
  );
}

export default withRouter(IndaginiList);
