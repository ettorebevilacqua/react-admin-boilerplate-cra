import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import GridChilds from '../../component/gridChilds';
// import { withRouter } from 'react-router';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { elemStyle } from '../../stylesElement';
import { setMenuList } from 'app/slice/layoutSlice';

// const routeToBase = id => `/app/user/indagini_invio/${id}/0`;
// const routeToBase = id => `/app/user/indagini_question/${id}`;

function IndaginiListForm(props) {
  const { data } = props.formProp;
  const history = useHistory();
  const classes = elemStyle();

  const getDataPublic = React.useCallback(() => (data && data.filter ? data.filter(item => item.isPublic) : []), [
    data,
  ]);
  const [values, setValues] = React.useState(getDataPublic());

  // React.useEffect(() => props.actions.load(), []);
  React.useEffect(() => setValues(getDataPublic()), [data, getDataPublic]);

  React.useEffect(() => setMenuList([{ link: '/app/user/moduli/app/user/indagini', label: 'Questionari' }]), []);
  /* const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  }; */

  const renderIndagine = (value, index) => (
    <Paper className={`${classes.paperRow}`} key={'paper_' + index}>
      <GridChilds style={{ alignItems: 'center' }} justify="space-between" view={[8, 4]}>
        <div className={classes.paperRowElem}>
          <h4>{value.title}</h4>
        </div>

        <GridChilds spacing={1} view={[6, 6]} justify="space-between" style={{ alignItems: 'center', padding: '0px' }}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => history.push({ pathname: '/app/user/show/', state: { data: values[index] } })}
          >
            Anteprima
          </Button>

          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => history.push('/app/user/indagini_invio/' + values[index].id)}
          >
            Crea
          </Button>
        </GridChilds>
      </GridChilds>
    </Paper>
  );

  return (
    <>
      <h2>Crea Indagine</h2>
      {values && values.map(renderIndagine)}
    </>
  );
}

export default withRouter(IndaginiListForm);
