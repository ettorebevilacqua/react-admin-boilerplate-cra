import React from 'react';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { elemStyle } from '../stylesElement';
import GridChilds from '../component/gridChilds';
import Switch from '@material-ui/core/Switch';

import { setMenuList } from 'app/slice/layoutSlice';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import 'font-awesome/css/font-awesome.min.css';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import { moduliSliceCrud } from 'app/slice';

const dataSelector = moduliSliceCrud.selects.dataSelector;

// import { Email } from '@material-ui/icons';

export default function QuestionModuli({ formProp: { data, saved }, saveData }) {
  const dataModuli = useSelector(dataSelector);
  const location = useLocation();
  const moduli = dataModuli && dataModuli.results; // || (location.state && location.state.data);
  const history = useHistory();
  const [values, setValues] = React.useState();
  const [moduloToAdd, setModuloToAdd] = React.useState();
  const [isModuliChoise, setIsModuliChoise] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [currentIdxQuestion, setCurrentIdxQuestion] = React.useState();

  const classes = elemStyle();
  if (!moduli) {
    // history.push('app/user/moduli');
  }
  const loadData = () => {
    data &&
      setMenuList([
        { link: '/app/user/moduli', label: 'Moduli' },
        { link: '/app/user/questionModuli', label: 'Questionari' },
      ]);
    data && setValues(data.results ? data.resulta : data);
  };
  React.useEffect(loadData, [data]);

  React.useEffect(() => {
    moduliSliceCrud.actions.query({}, true);
  }, []);
  // React.useEffect(dataUpdate, [data]);
  console.log('ModuliFormContainer', data);

  const findModulo = (id, key) => {
    const mod = moduli && moduli.find(mod => mod.id === id);
    return !mod ? null : key ? mod[key] : mod;
  };

  const getNewValues = list => list.map(item => item);

  const moduliToId = val => {
    const _moduli = val.moduli;
    const modulListId = _moduli.map(item => item.id);
    return { ...val, moduli: modulListId };
  };

  const save = idx => {
    const newValues = getNewValues(values);
    const _moduli = newValues && newValues[idx] && getNewValues(newValues[idx].moduli);
    const modulListId = _moduli.map(item => item.id);
    newValues[idx] = { ...newValues[idx], moduli: modulListId };
    saveData(newValues[idx]);
  };
  const onPublish = (val, idx) => {
    const newValues = values.map(elem => elem);
    const isPublic = newValues && newValues[idx] && newValues[idx].isPublic;
    const toSave = moduliToId({ ...newValues[idx], isPublic: !isPublic });
    newValues[idx] = { ...newValues[idx], isPublic: !isPublic };
    setValues(newValues);
    saveData(toSave);
  };

  const onChangeTitle = (valTitle, idx) => {
    const newValues = getNewValues(values);
    newValues[idx] = { ...newValues[idx], title: valTitle };
    setValues(newValues);
  };

  const addQuestion = () => {
    const newValues = getNewValues(values);
    const dataToSave = { title: '', isPublic: false, moduli: [] };
    newValues.push(dataToSave);
    setValues(newValues);
  };

  const editQuestion = idxQuestion => {
    if (!values || !values[idxQuestion] || !values[idxQuestion].moduli) return false;
    setIsModuliChoise(true);
    setSelected(values[idxQuestion].moduli.map(mod => mod.id));
    setCurrentIdxQuestion(idxQuestion);
  };

  const renderList = () => (dataTo, index) => (
    <div key={index}>
      <Paper className={`${classes.paperRow}`} key={'paper_' + index}>
        <GridChilds justify="space-between" style={{ alignItems: 'center' }} view={[5, 1, 2, 2, 1, 1]}>
          <TextField fullWidth value={dataTo.title || ''} onChange={e => onChangeTitle(e.target.value, index)} />

          <span style={{ color: dataTo.isPublic ? 'black' : 'red' }}>Pubblicato :</span>
          <Switch
            checked={dataTo.isPublic}
            onChange={e => onPublish(e.target.value, index)}
            name="isPublic"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => history.push({ pathname: '/app/user/show/', state: { data: values[index] } })}
          >
            Anteprima
          </Button>
          <Button color="primary" variant="contained" onClick={() => editQuestion(index)}>
            Moduli
          </Button>
          {dataTo && dataTo.id ? (
            <Button
              onClick={() => {
                const editQuestion = { ...values[index] };
                const editQuestionNew = { ...editQuestion, _deleted: true, moduli: [] };
                saveData(editQuestionNew);
                const _values = values.map(val => val);
                _values.splice(index, 1);
                setValues(_values);
              }}
            >
              <DeleteIcon color="secondary" style={{ fontSize: '36px' }} />
            </Button>
          ) : (
            <Button color="primary" variant="contained" onClick={() => save(index)}>
              Salva
            </Button>
          )}
        </GridChilds>
      </Paper>
      <div className={`${classes.paperRow} ${classes.width95}`}>
        {dataTo.moduli &&
          dataTo.moduli.map &&
          dataTo.moduli.map((modulo, idxModulo) => (
            <Chip
              key={idxModulo}
              tabIndex={-1}
              label={findModulo(modulo && modulo.id ? modulo.id : modulo, 'title') || ''}
              className={classes.chip}
            />
          ))}
      </div>
    </div>
  );

  const renderTitle = () => (
    <div className={classes.paperTitle}>
      <GridChilds justify="space-between" style={{ alignItems: 'center' }} view={[9, 3]}>
        <div>
          <span className={classes.texth4}>Questionari :</span>
          <span className={`${classes.colorRed} ${classes.texth5}`}>
            {saved && saved.isError && saved.errorMessage}
          </span>
        </div>
        <Button onClick={() => addQuestion()} variant="contained" color="primary">
          Nuovo
        </Button>
      </GridChilds>
    </div>
  );

  const renderHeaderList = (fields, sizes) => {
    return (
      <Paper className={`${classes.paperRow} ${classes.width95}`} key={'headerFields'}>
        <GridChilds justify="space-between" style={{ alignItems: 'center' }} view={sizes}>
          {fields.map(field => (
            <div className={`${classes.fieldTitle} ${classes.texth5}`}>{field}</div>
          ))}
        </GridChilds>
      </Paper>
    );
  };

  const moduliChange = moduli => {
    if (!values || !values[currentIdxQuestion]) return false;
    setSelected(moduli);
    const newValues = values.map(el => el);
    const question = { ...newValues[currentIdxQuestion] };
    const moduliFull = moduli.reduce((acc, idmodulo) => {
      const mod = findModulo(idmodulo);
      mod && acc.push(mod);
      return acc;
    }, []);
    const questionNew = { ...question, moduli: moduliFull };
    newValues[currentIdxQuestion] = questionNew;
    setValues(newValues);

    console.log('onChange', moduli);
  };

  const closeModal = () => {
    setIsModuliChoise(false);
    save(currentIdxQuestion);
  };

  return (
    <div className={classes.root}>
      {renderTitle()}
      {1 == 0 && renderHeaderList(['Titolo', 'Pubblicato'], [4, 2])}
      <Dialog open={isModuliChoise} onEnter={console.log('Hey.')} fullWidth={true} maxWidth="lg">
        <DialogTitle>Moduli</DialogTitle>
        <DialogContent>
          <DualListBox
            selected={selected}
            onSelected={setSelected}
            onChange={moduliChange}
            options={!moduli ? [] : moduli.map(mod => ({ label: mod.title, value: mod.id }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeModal()}>Chiudi</Button>
        </DialogActions>
      </Dialog>

      {!!values && values.map && values.map(renderList(['title'], [4]))}
    </div>
  );
}
