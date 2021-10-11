import React, { useCallback } from 'react';

import { Field, useFormikContext, FieldArray } from 'formik';

import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';
import { Button as ButtonPrime } from 'primereact/button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { TextField } from 'formik-material-ui';
import { Box, MenuItem } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogActions from '@material-ui/core/DialogActions';

import GridChilds from '../../../component/gridChilds';
import { elemStyle } from '../../../stylesElement';

// import { CrudButton, ButtonType } from '../../../component/crudButtons';
import { Email, PlaylistAddCheck } from '@material-ui/icons';
import { AnagraficaForm } from 'app/components/User/forms/common/anagrafica';

import { empityAnagrafica } from 'app/data/schema/anagrafica';
import { setTimeout } from 'timers';
import { DialogPersonList } from './docentiModal';

const renderField = (props = {}, name, component, label, type) => {
  return (
    <div>
      <Field
        {...props}
        name={name}
        style={{ width: '100%' }}
        type={type || 'text'}
        component={component}
        label={label}
      />
    </div>
  );
};

// const partecipantiFilled = list => isItemsFieldEmpity(list);

const getPartecipantiByNum = (list, val) => {
  // const val = e.target.value;

  const partecipanti = !list ? [empityAnagrafica] : [...list];
  const valToNum = !val ? 1 : Number(val);
  const valNum = isNaN(valToNum) ? partecipanti.length : valToNum;
  const newVal = valNum > 99 ? 99 : valNum < 1 ? 1 : valNum;

  if (partecipanti.length === newVal) return partecipanti;

  const empityList = partecipanti.length < newVal ? Array(newVal - partecipanti.length).fill(empityAnagrafica) : [];
  const refList = [...(partecipanti || []), ...empityList];
  const partecipantiNew = refList.length > newVal ? refList.slice(0, newVal) : refList;
  partecipantiNew.length === 0 && partecipantiNew.push(empityAnagrafica);
  // setValue();
  return partecipantiNew;
  // s
  // propsFormik.setFieldValue('', partecipantiNew);
  // setTimeout(() => propsFormik.setFieldTouched('partecipanti.1.nome', true));
};

const QuestionUsersFields = ({ propsFormik, numPartecipanti, ...rest }) => {
  const classes = elemStyle();
  const { values, setFieldValue } = useFormikContext();
  const [isDialogAnag, setIsDialogAnag] = React.useState(false);
  const [isDialogDocenti, setIsDialogDocenti] = React.useState(false);
  const [idxPartecipante, setIdxPartecipante] = React.useState(-1);
  const propValue = propsFormik?.values || {};

  const getPartecipanti = useCallback(values => getPartecipantiByNum(values, numPartecipanti || 1), [numPartecipanti]);

  const [partecipanti, setPartecipanti] = React.useState(getPartecipanti(propValue?.partecipanti));

  const init = () => {
    // setPartecip anti(getPartecipanti());
  };

  React.useEffect(init, []);
  React.useEffect(() => {
    if (numPartecipanti !== partecipanti.length) {
      setPartecipanti(getPartecipanti(propValue?.partecipanti));
      // propsFormik.setFieldValue('partecipanti', partecipanti);
    }
  }, [numPartecipanti, getPartecipanti, partecipanti.length, propValue.partecipanti]);

  const anagSubmit = (arrayHelper, index) => anagVal => {
    setIsDialogAnag(false);
    // setTimeout(() => setIsDialogAnag(false), 30);
    const _partecipanti = partecipanti.map((el, idx) => (idx === index ? anagVal : el));
    setPartecipanti(_partecipanti);
    setIsDialogAnag(false);
    setTimeout(
      () => arrayHelper.replace(index, anagVal),
      // Object.keys(anagVal).map(field => propsFormik.setFieldValue(`partecipanti.${index}.${field}`, anagVal[field])),
      30,
    );
    // propsFormik.setFieldValue(`partecipanti.${index}`, anagVal);
  };

  const docentiSubmit = index => docenteVal => {
    setIsDialogDocenti(false);
    setTimeout(() => setIsDialogDocenti(false), 30);
    Object.keys(docenteVal).map(field => propsFormik.setFieldValue(`docenti.${index}.${field}`, docenteVal[field]));
    // propsFormik.setFieldValue(`partecipanti.${index}`, anagVal);
  };

  const closeDocenti = () => {
    setIsDialogDocenti(false);
    setTimeout(() => setIsDialogDocenti(false), 30);
  };

  const DocentiForm = arrayHelper => {
    const _docenti = !propsFormik.values.docenti
      ? []
      : propsFormik.values.docenti.map(el => ({ ...el, nome: (el.nome || '') + ' ' + (el.cognome || '') }));

    const onSelectDocente = docente => {
      arrayHelper.push(docente);
      setTimeout(() => setIsDialogDocenti(false), 30);
    };

    const actionBodyTemplate = rowData => {
      const idxDocente = propsFormik.values.docenti.findIndex(el => el.email === rowData.email);
      return (
        <React.Fragment>
          <ButtonPrime
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning"
            onClick={() => idxDocente > -1 && arrayHelper.remove(idxDocente)}
            style={{ height: '2rem', width: '2rem' }}
          />
        </React.Fragment>
      );
    };

    const myNewTheme = {
      rows: {
        fontSize: '12px',
      },
    };
    const renderList = () => (
      <DataTable
        value={_docenti}
        emptyMessage=""
        showGridlines
        stripedRows
        autoLayout
        className="p-datatable-sm"
        bodyStyle={{ fontSize: '14px', height: '100%' }}
        scrollHeight="100%"
        scrollable
        customTheme={myNewTheme}
      >
        <Column field="nome" header="Nome"></Column>
        <Column field="email" className="noWrap" header="Email"></Column>
        <Column field="cf" header="Cod. Fisc"></Column>
        <Column field="phone" header="Tel"></Column>
        <Column field="ambito" header="Ambito"></Column>
        <Column body={actionBodyTemplate}></Column>
      </DataTable>
    );

    return (
      <Paper
        onClick={() => setIsDialogDocenti(true)}
        className={`${classes.paperTitle} ${classes.width95}`}
        key={'docentiList'}
        style={{ height: '500px' }}
      >
        <DialogPersonList open={isDialogDocenti} onSelect={onSelectDocente} close={closeDocenti} />
        {renderList()}
      </Paper>
    );
  };

  const PartecipanteForm = (elem, index) => {
    const renderButtonActionRecord = token => (
      <GridChilds
        justify="space-between"
        alignItems="center"
        spacing={1}
        style={{
          flexDirection: 'row',
          textAlign: 'end',
        }}
        view={[3, 6, 3]}
        key={'gridPart' + index}
      >
        <Box style={{ width: '100%' }}>
          <Tooltip title="Vai alle domande">
            <span>
              <IconButton
                style={{ fontSize: '48px' }}
                color="primary"
                aria-label="domande"
                onClick={() => {
                  rest.history.push('/guest/' + token);
                }}
              >
                <PlaylistAddCheck />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
        <Box style={{ width: '100%' }}>
          <Tooltip title="Edit">
            <Button color="primary" variant="contained" onClick={() => setIsDialogAnag(true)}>
              Modifica
            </Button>
          </Tooltip>
        </Box>
        <Box style={{ width: '100%' }}>
          <Tooltip title="invia mail">
            <span>
              <IconButton
                style={{ fontSize: '36px' }}
                color="primary"
                aria-label="delete"
                disabled={!token}
                onClick={() => {
                  rest.history.push('/guest/' + token);
                }}
              >
                <Email />
                <span style={{ fontSize: '18px', whiteSpace: 'nowrap' }}>
                  {elem.sendCount ? ' (' + elem.sendCount + ') ' : ''}
                </span>
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </GridChilds>
    );
    return (
      <div key={index}>
        <Paper
          onClick={() => {
            setIdxPartecipante(index);
            setIsDialogAnag(true);
          }}
          className={`${classes.paperTitle} ${classes.width95}`}
          key={index}
        >
          {partecipanti && partecipanti[index] && (
            <GridChilds view={[3, 3, 3, 3]} spacing={3} style={{ width: '100%' }}>
              <span>
                {partecipanti[index].nome || ''} {partecipanti[index].cognome || ''}
              </span>
              <span> {partecipanti[index].email || ''} </span>
              <span> {partecipanti[index].phone || ''} </span>

              {renderButtonActionRecord(elem.token)}
            </GridChilds>
          )}
        </Paper>
      </div>
    );
  };

  return (
    <>
      <Paper
        style={{
          marginTop: '18px',
          marginLeft: '5%',
          padding: '8px',
          paddingBotton: '18px',
          width: '95%',
        }}
      >
        <GridChilds view={[8, 4]} spacing={3} style={{ marginTop: '16px', width: '100%' }}>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={propValue.corso || ''}
            style={{ width: '100%' }}
            onChange={e => propsFormik.setFieldValue('corso', e.target.value)}
          >
            {['corso1', 'corso2', 'corso3'].map((item, idx) => (
              <MenuItem key={idx} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>

          {renderField({}, 'idcorso', TextField, 'Id Corso')}
          {renderField({}, 'titolo', TextField, 'Titolo')}
        </GridChilds>

        <GridChilds view={[4, 4, 4]} spacing={3} style={{ marginTop: '16px', width: '100%' }}>
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            {''}{' '}
          </Typography>
          {renderField(
            { max: 99, min: 1, onKeyUp: e => e },
            'numPartecipanti',
            TextField,
            'Num. Partecipanti',
            'number',
          )}
        </GridChilds>
      </Paper>

      <Typography variant="h4" style={{ marginTop: '12px' }}>
        Docenti
      </Typography>

      <FieldArray
        name="docenti"
        render={arrayHelper => (
          <>
            {/* value.partecipanti &&
                !value.partecipanti[0] &&
              addPartecipante(propsFormik, arrayHelper, value) */}

            {propsFormik?.values?.docenti && DocentiForm(arrayHelper)}

            <GridChilds
              view={[10, 2]}
              justify="space-between"
              spacing={2}
              style={{ textAlign: 'end', marginTop: '16px', width: '100%' }}
            >
              <span> </span>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={() => {
                  setIsDialogDocenti(true);
                  setTimeout(() => setIsDialogDocenti(true), 30);
                }}
              >
                Nuovo Docente
              </Button>
            </GridChilds>
          </>
        )}
      />

      <Typography variant="h4" style={{ marginTop: '12px' }}>
        Partecipanti
      </Typography>

      <GridChilds view={[12]} spacing={1}>
        <FieldArray
          name="partecipanti"
          render={arrayHelper => (
            <>
              {/* value.partecipanti &&
                !value.partecipanti[0] &&
              addPartecipante(propsFormik, arrayHelper, value) */}

              <Dialog open={isDialogAnag} fullWidth={true} maxWidth="lg">
                <DialogContent>
                  <>
                    <div>
                      <h3>Partecipante</h3>
                    </div>
                    <AnagraficaForm
                      value={values.partecipanti[idxPartecipante]}
                      onExit={() => {
                        setIsDialogAnag(false);
                        setTimeout(() => setIsDialogAnag(false), 30);
                      }}
                      onSubmit={anagSubmit(arrayHelper, idxPartecipante)}
                    />
                  </>
                </DialogContent>
              </Dialog>

              {partecipanti && partecipanti.map((elem, index) => PartecipanteForm(elem, index, classes))}
              <GridChilds view={[4, 2]} spacing={3} style={{ marginTop: '16px', width: '100%' }}>
                <span> </span>
                {/* <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={e =>
                    addPartecipante(propsFormik, arrayHelper, value)
                  }
                >
                  Aggiungi Partecipante
                </Button> */}
              </GridChilds>
            </>
          )}
        />
      </GridChilds>
    </>
  );
};

export default QuestionUsersFields;
