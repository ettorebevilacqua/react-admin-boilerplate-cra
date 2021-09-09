import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Formik, Form } from 'formik';
import FormikOnChange from '../lib/FormikOnChange';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import QuestionUsersFields from './form/questionUser';
import { empityQuestion, empityParteipante, schema } from 'app/data/schema/questionSchema';

import GridChilds from '../component/gridChilds';
import { elemStyle } from '../stylesElement';

const MquestionTo = ({ formProp: { data, saved }, saveData, actions, ...props }) => {
  const history = useHistory();
  const location = useLocation();
  const idParam = data && data.id;
  const questionModulo = location.state && location.state.data;

  const idquestion = questionModulo && questionModulo.id;
  const questions = data;
  debugger;

  const loadData = React.useCallback(() => {
    const questionData = questions && questions.results && questions.results[0];
    const dataToValue = idParam
      ? questionData
      : {
          ...empityQuestion,
          idquestion,
        };
    if ((!dataToValue && !dataToValue.docenti) || !dataToValue.docenti[0]) {
      dataToValue.docenti = [empityParteipante];
    }

    return dataToValue;
  }, [idParam, idquestion, questions]);

  const [value, setValue] = React.useState();
  const [numPartecipanti, setNumPartecipanti] = React.useState(null);
  const classes = elemStyle();

  const init = () => {
    loadData();
    // !value && setValue(dataValueState || empityQuestion);
  };

  const dataUpdate = () => {
    if (data) {
      const quest = loadData();
      setValue(quest);
      setNumPartecipanti(quest?.numPartecipanti || 1);
    }
  };

  React.useEffect(init, [idquestion, loadData]);
  React.useEffect(dataUpdate, [data, loadData]);

  if (data && !idquestion) {
    props.history.push('/app/user/indagini');
    // return <span> </span>;
  }

  /*
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
*/

  const onSubmitBefore = values => {
    saveData(values).then(res => {
      const idnew = res && res.payload && res.payload.id;
      res && res.payload && res.payload.id && history.push('/app/user/indagini_edit/' + idnew);
    });
  };

  const onChangeForm = propsFormik => (valuesNew, isFirstTime) => {
    if (isFirstTime) return;
    const numPart = valuesNew.numPartecipanti || 1;
    numPartecipanti !== numPart && setNumPartecipanti(numPart);
    console.log(propsFormik);
    // valuesNew.partecipanti.length !== numPart && onChangeNumPartecipanti(propsFormik, numPart);
  };
  const renderButtonActionRecord = propsFormik => (
    <GridChilds style={{ textAlign: 'end' }} view={[6, 6]}>
      <Button color="primary" variant="contained" fullWidth disabled={!propsFormik.dirty} type="submit">
        <span className={classes.buttonAction}>Salva</span>
      </Button>
      <Button
        disabled={!propsFormik.isValid}
        variant="contained"
        color="primary"
        onClick={() => value && value.id && actions.sendEmail(value.id) && actions.reload()}
      >
        <span className={classes.buttonAction}>Invia mail</span>
      </Button>
    </GridChilds>
  );

  const renderTitle = () => (
    <div className={classes.paperTitle}>
      <GridChilds justify="space-between" style={{ alignItems: 'center' }} view={[9, 3]}>
        <div>
          <Typography variant="h3" color="textSecondary">
            Indagine : {questionModulo?.title}
          </Typography>
          <Typography variant="h4" color="error">
            {saved?.isError && saved?.errorMessage}
          </Typography>
        </div>
        {
          // renderButtonActionRecord(propsFormik)
        }
      </GridChilds>
    </div>
  );

  /*  const formHtmlSub = (formikProp, hamdle) => aa => {
    console.log('ffff', formikProp, hamdle);
  }; */

  return (
    <div className={classes.root}>
      {!!value && (
        <Formik
          initialValues={value}
          onSubmit={onSubmitBefore}
          validationSchema={schema}
          children={propsFormik => (
            <>
              {renderTitle(propsFormik)}
              <Form onSubmit={propsFormik.handleSubmit}>
                <FormikOnChange delay={500} onChange={onChangeForm(propsFormik)} />

                {
                  <QuestionUsersFields
                    propsFormik={propsFormik}
                    numPartecipanti={numPartecipanti}
                    parentValue={propsFormik.values}
                    {...props}
                  />
                }
                <GridChilds
                  view={[9, 3]}
                  justify="space-between"
                  spacing={3}
                  style={{ marginTop: '16px', width: '100%' }}
                >
                  <div>{propsFormik.errors.submit} </div>
                  {renderButtonActionRecord(propsFormik)}
                </GridChilds>
              </Form>
            </>
          )}
        />
      )}
    </div>
  );
};

export const QuestionTo = MquestionTo;
