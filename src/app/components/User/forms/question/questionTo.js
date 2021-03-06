import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useInjectReducer } from 'utils/redux-injectors';

import { Formik } from 'formik';
import FormikOnChange from '../lib/FormikOnChange';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { QuestionUsersFields } from './form/questionUser';
import { empityQuestion, schema } from 'app/data/schema/questionSchema';

import GridChilds from '../component/gridChilds';
import { elemStyle } from '../stylesElement';
import { corsiSlice, docentiSlice, ambitiSlice } from 'app/slice';

const _VERIFICHE = 'verifiche';

const MquestionTo = ({ formProp: { data, saved }, saveData, actions, ...props }) => {
  useInjectReducer({ key: corsiSlice.name, reducer: corsiSlice.slice.reducer });
  useInjectReducer({ key: docentiSlice.name, reducer: docentiSlice.slice.reducer });
  useInjectReducer({ key: ambitiSlice.name, reducer: ambitiSlice.slice.reducer });

  const history = useHistory();
  const location = useLocation();
  const _TIPO_MODULO = location.pathname.indexOf('/app/user/verifiche/indagini_invio') > -1 ? _VERIFICHE : null;
  const { id, idquestion } = useParams();
  const [error, setError] = React.useState(null);
  const idParam = id;
  const questionModulo = location.state && location.state.data;
  const questions = data;

  const loadData = () => {
    const dataToValue = idParam
      ? questions
      : {
          ...empityQuestion,
          idquestion: questionModulo && questionModulo.id,
          titoloQuestion: questionModulo && questionModulo.title ? questionModulo.title : '',
        };

    /* if ((!dataToValue && !dataToValue.docenti) || !dataToValue.docenti[0]) {
        dataToValue.docenti = [empityParteipante];
      } */
    const _docenti = dataToValue?.docenti?.filter && dataToValue.docenti.filter(el => !!el.id);
    const _dataToValue = { ...dataToValue, docenti: _docenti };
    return _dataToValue;
  };

  const [value, setValue] = React.useState();
  const [numPartecipanti, setNumPartecipanti] = React.useState(null);
  const classes = elemStyle();

  const dataUpdate = () => {
    if (data) {
      const quest = loadData();
      /*  if (!data.id && !questionModulo) {
        return props.history.push('/app/user/indagini');
      } */
      setValue(quest);
      setNumPartecipanti(quest?.numPartecipanti || 1);
    }
  };

  React.useEffect(dataUpdate, []);

  const save = values => {
    setError(null);
    const valToSave = { ...values, id: value.id };
    saveData(valToSave)
      .then((res, error) => {
        if (res.error) {
          return setError(res.error.message ? res.error.message : res.error);
        }
        const idnew = res && res.payload && res.payload?.id;
        res &&
          res.payload &&
          res.payload.id &&
          window.history.replaceState(null, null, `/app/user/indagini_edit/${idnew}`);
        if (!value.id && idnew) {
          history.replace(`/reload`);
          setTimeout(() => {
            history.replace(`/app/user/indagini_edit/${idnew}`);
          });
        }
        setValue(res.payload);
        setTimeout(() => setValue(res.payload), 50);
        console.log('error ', error);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onSubmitBefore = (values, actions) => {
    actions.setSubmitting(false);
    setTimeout(() => {
      save(values);
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
      <Button
        color="primary"
        variant="contained"
        fullWidth
        disabled={!propsFormik.dirty || !propsFormik.isValid}
        onClick={() => {
          propsFormik.submitForm();
          propsFormik.setSubmitting(false);
        }}
      >
        <span className={classes.buttonAction}>Salva</span>
      </Button>
      <Button
        disabled={!propsFormik.isValid || !value.id || propsFormik.dirty}
        variant="contained"
        color="primary"
        onClick={() =>
          value &&
          value.id &&
          actions.sendEmail(value.id).then(res => {
            // setTimeout(() => dataUpdate(), 50);
            history.replace(`/reload`);
            setTimeout(() => {
              history.replace(`/app/user/indagini_edit/${value.id}`);
            });
            // history.go(0);
            // window.location.reload(false); // `/app/user/indagini_edit/${value.id}`);
          })
        }
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
            Indagine : {value.titoloQuestion}
          </Typography>
          <Typography variant="h4" color="error">
            {error}
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

  if (history.location.pathname.indexOf('indagini_invio') > -1 && !questionModulo) {
    history.push('/app/user/indagini');
  }

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
            </>
          )}
        />
      )}
      <br />
      <br />
      <br />
    </div>
  );
};

export const QuestionTo = MquestionTo;
