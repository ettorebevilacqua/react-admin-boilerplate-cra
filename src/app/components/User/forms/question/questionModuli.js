import React from 'react';
import Paper from '@material-ui/core/Paper';
import { MenuItem, TextField, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { elemStyle } from '../stylesElement';
import GridChilds from '../component/gridChilds';
import Switch from '@material-ui/core/Switch';

// import { Email } from '@material-ui/icons';

export default function QuestionModuli({
  formProp: { data, saved },
  moduli,
  saveData,
}) {
  const [values, setValues] = React.useState();
  const [moduloToAdd, setModuloToAdd] = React.useState();
  const classes = elemStyle();

  const loadData = () => data && setValues(data.results ? data.resulta : data);
  React.useEffect(loadData, [data]);

  // React.useEffect(init, []);
  // React.useEffect(dataUpdate, [data]);
  console.log('ModuliFormContainer', data);

  const getNewValues = list => list.map(item => item);

  const onPublish = (val, idx) => {
    const newValues = values.map(elem => elem);
    const isPublic = newValues && newValues[idx] && newValues[idx].isPublic;
    newValues[idx] = { ...newValues[idx], isPublic: !isPublic };
    setValues(newValues);
  };

  const onChangeTitle = (valTitle, idx) => {
    const newValues = getNewValues(values);
    newValues[idx] = { ...newValues[idx], title: valTitle };
    setValues(newValues);
  };

  const addModulo = idx => {
    if (!moduloToAdd) return false;
    const moduloFound = moduli.find(item => item.id === moduloToAdd);
    if (!moduloFound) return false;

    const newValues = getNewValues(values);
    const _moduli =
      newValues && newValues[idx] && getNewValues(newValues[idx].moduli);
    const _moduliFound = _moduli.find(item => item.id === moduloToAdd);
    if (!_moduliFound) {
      _moduli.push(moduloFound);
      newValues[idx] = { ...newValues[idx], moduli: _moduli };
      setValues(newValues);
      setModuloToAdd(null);
      const modulListId = _moduli.map(item => item.id);
      newValues[idx] = { ...newValues[idx], moduli: modulListId };
      saveData(newValues[idx]);
    }
  };

  const addQuestion = () => {
    const newValues = getNewValues(values);
    const dataToSave = { title: '', isPublic: false, moduli: [] };
    newValues.push(dataToSave);
    setValues(newValues);
  };

  const deleteModulo = (id, idxquestion) => {
    if (!values) return false;
    const newValues = getNewValues(values);
    const _moduli =
      newValues[idxquestion] &&
      getNewValues(newValues[idxquestion].moduli).filter(
        item => item.id !== id,
      );
    newValues[idxquestion] = {
      ...newValues[idxquestion],
      moduli: _moduli,
    };
    setValues(newValues);
    const modulListId = _moduli.map(item => item.id);
    newValues[idxquestion] = { ...newValues[idxquestion], moduli: modulListId };
    saveData(newValues[idxquestion]);
  };

  const onModuloChange = () => e => {
    const val = e.target.value;
    setModuloToAdd(val);
  };

  const renderList = () => (dataTo, index) => (
    <div key={index}>
      <Paper className={`${classes.paperRow}`} key={'paper_' + index}>
        <GridChilds
          justify="space-between"
          style={{ alignItems: 'center' }}
          view={[8, 2, 2]}
        >
          <TextField
            value={dataTo.title || ''}
            onChange={e => onChangeTitle(e.target.value, index)}
          />
          <span style={{ color: dataTo.isPublic ? 'black' : 'red' }}>
            Pubblicato :
          </span>
          <Switch
            checked={dataTo.isPublic}
            onChange={e => onPublish(e.target.value, index)}
            name="isPublic"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </GridChilds>
      </Paper>
      <div className={`${classes.paperRow} ${classes.width95}`}>
        <GridChilds
          justify="space-between"
          style={{ alignItems: 'center' }}
          view={[4, 6, 2]}
        >
          <span>Moduli :</span>

          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={moduloToAdd || ''}
            style={{ width: '100%' }}
            onChange={onModuloChange(index)}
          >
            {moduli &&
              moduli.map &&
              moduli.map((item, idx) => (
                <MenuItem key={idx} value={item.id}>
                  {item.title}
                </MenuItem>
              ))}
          </Select>
          <Button
            onClick={() => addModulo(index)}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </GridChilds>
        {dataTo.moduli &&
          dataTo.moduli.map &&
          dataTo.moduli.map((modulo, idxModulo) => (
            <Paper
              className={`${classes.paperRow} ${classes.width95}`}
              key={idxModulo}
            >
              <GridChilds
                justify="space-between"
                style={{ alignItems: 'center' }}
                view={[10, 2]}
              >
                <div className={classes.paperRowElem}>{modulo.title || ''}</div>
                <IconButton
                  style={{ fontSize: '36px' }}
                  color="secondary"
                  aria-label="delete"
                  disabled={false}
                  onClick={() => deleteModulo(modulo.id, index, idxModulo)}
                >
                  <DeleteIcon />
                </IconButton>
              </GridChilds>
            </Paper>
          ))}
      </div>
    </div>
  );

  const renderTitle = () => (
    <div className={classes.paperTitle}>
      <GridChilds
        justify="space-between"
        style={{ alignItems: 'center' }}
        view={[9, 3]}
      >
        <div>
          <span className={classes.texth4}>Questionari :</span>
          <span className={`${classes.colorRed} ${classes.texth5}`}>
            {saved && saved.isError && saved.errorMessage}
          </span>
        </div>
        <Button
          onClick={() => addQuestion()}
          variant="contained"
          color="primary"
        >
          Nuovo
        </Button>
      </GridChilds>
    </div>
  );

  const renderHeaderList = (fields, sizes) => {
    return (
      <Paper
        className={`${classes.paperRow} ${classes.width95}`}
        key={'headerFields'}
      >
        <GridChilds
          justify="space-between"
          style={{ alignItems: 'center' }}
          view={sizes}
        >
          {fields.map(field => (
            <div className={`${classes.fieldTitle} ${classes.texth5}`}>
              {field}
            </div>
          ))}
        </GridChilds>
      </Paper>
    );
  };

  return (
    <div className={classes.root}>
      {renderTitle()}
      {1 == 0 && renderHeaderList(['Titolo', 'Pubblicato'], [4, 2])}
      {!!values && values.map && values.map(renderList(['title'], [4]))}
    </div>
  );
}
