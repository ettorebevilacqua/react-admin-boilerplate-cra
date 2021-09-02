import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import GridChilds from '../../component/gridChilds';
// import { withRouter } from 'react-router';
import { withRouter } from 'react-router-dom';
import { ShowQuestion } from 'app/components/User/forms/question/form/show';
import Paper from '@material-ui/core/Paper';
import { elemStyle } from '../../stylesElement';

import { AutoTabs, getParamTab } from 'app/components/Layout/autoTabs';

import { QuestionTo } from 'app/components/User/forms/question/questionTo';

// const routeToBase = id => `/app/user/indagini_invio/${id}/0`;
// const routeToBase = id => `/app/user/indagini_question/${id}`;

function IndaginiListForm(props) {
  const { data } = props.formProp;
  const history = useHistory();
  const location = useLocation();
  const intiTab = getParamTab(location, 'tabs1');
  const [tabValue, setTabValue] = React.useState(intiTab);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const classes = elemStyle();

  const getDataPublic = React.useCallback(() => (data && data.filter ? data.filter(item => item.isPublic) : []), [
    data,
  ]);
  const [values, setValues] = React.useState(getDataPublic());

  // React.useEffect(() => props.actions.load(), []);
  React.useEffect(() => setValues(getDataPublic()), [data, getDataPublic]);

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

  const onRowClick = (idx, action, par) => {
    setCurrentQuestion(idx);
    action(par);
  };

  const renderIndagine = (value, index) => (
    <Paper className={`${classes.paperRow}`} key={'paper_' + index}>
      <GridChilds style={{ alignItems: 'center' }} justify="space-between" view={[8, 4]}>
        <div className={classes.paperRowElem}>
          <h4>{value.title}</h4>
        </div>

        <GridChilds spacing={1} view={[6, 6]} justify="space-between" style={{ alignItems: 'center', padding: '0px' }}>
          <Button color="primary" variant="contained" fullWidth onClick={() => onRowClick(index, setTabValue, 2)}>
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

  const questionariRender = () => (
    <>
      <h2>Crea Indagine</h2>
      {values && values.map(renderIndagine)}
    </>
  );

  const renderSwow = () => <ShowQuestion values={values[currentQuestion]} risposte={[]} />;
  const questinToProps = () => {
    return {
      saveData: props.saveData,
      formProp: {
        data: { questions: values[currentQuestion] },
      },
    };
  };

  const tabsElem = [
    { label: 'Questionari', comp: questionariRender },
    {
      label: 'Edit',
      comp: () => <QuestionTo {...questinToProps()} />,
    },
    { label: 'Anteprima', comp: renderSwow },
  ];

  const visibleTabs = [[0], [0, 2], [0]];
  return (
    <div>
      <AutoTabs
        tabsName="tabs1"
        value={tabValue}
        onChange={newValue => setTabValue(newValue)}
        tabs={tabsElem}
        visibles={visibleTabs}
      />
    </div>
  );
}

export default withRouter(IndaginiListForm);
