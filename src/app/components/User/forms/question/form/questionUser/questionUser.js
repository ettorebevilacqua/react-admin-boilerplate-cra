import React, { useCallback } from 'react';
import { Field, useFormikContext, FieldArray } from 'formik';
import { TextField as FtextField } from 'formik-material-ui';
import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
// import Box from '@material-ui/core/Box';
import { Button as ButtonPrime } from 'primereact/button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

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

import { setTimeout } from 'timers';
import { DialogPersonList } from './docentiModal';
import { DialogCorsi } from './corsiModal';
import BarTwoColumn from 'app/components/Layout/barTwoColumn';

const empityPartecipante = { cognome: '', nome: '', email: '', phone: '' };

const renderField = (props = {}, name, component, label, type, width) => {
  return (
    <Field
      {...props}
      name={name}
      type={type || 'text'}
      component={component}
      label={label}
      style={{ width: width || '100%' }}
    />
  );
};

// const partecipantiFilled = list => isItemsFieldEmpity(list);

const getPartecipantiByNum = (list, val) => {
  // const val = e.target.value;

  const partecipanti = !list ? [empityPartecipante] : [...list];
  const valToNum = !val ? 1 : Number(val);
  const valNum = isNaN(valToNum) ? partecipanti.length : valToNum;
  const newVal = valNum > 99 ? 99 : valNum < 1 ? 1 : valNum;

  if (partecipanti.length === newVal) return partecipanti;

  const empityList = partecipanti.length < newVal ? Array(newVal - partecipanti.length).fill(empityPartecipante) : [];
  const refList = [...(partecipanti || []), ...empityList];
  const partecipantiNew = refList.length > newVal ? refList.slice(0, newVal) : refList;
  partecipantiNew.length === 0 && partecipantiNew.push(empityPartecipante);
  // setValue();
  return partecipantiNew;
  // s
  // propsFormik.setFieldValue('', partecipantiNew);
  // setTimeout(() => propsFormik.setFieldTouched('partecipanti.1.nome', true));
};

const QuestionUsersFields = ({ propsFormik, numPartecipanti, ...rest }) => {
  const classes = elemStyle();
  const { values, setFieldValue } = useFormikContext();
  const [editValueDocente, setEditValueDocente] = React.useState(null);
  const [isDialogDocenti, setIsDialogDocenti] = React.useState(false);
  const [isDialogAnag, setIsDialogAnag] = React.useState(false);
  const [isDialogCorsi, setIsDialogCorsi] = React.useState(false);
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

  const closeDocenti = selected => {
    setIsDialogDocenti(false);
    setEditValueDocente(null);
    setTimeout(() => setIsDialogDocenti(false), 30);
    if (!selected || !propsFormik.values?.docenti) return false;
    const idx = propsFormik.values.docenti.findIndex(el => selected.id === el.id);
    if (idx > -1) {
      Object.keys(selected).map(field => propsFormik.setFieldValue(`docenti.${idx}.${field}`, selected[field]));
      propsFormik.submitForm();
    }
  };

  const closeCorsi = () => {
    setIsDialogCorsi(false);
    setTimeout(() => setIsDialogCorsi(false), 30);
  };

  const onSelectCorsi = _corso => {
    setIsDialogCorsi(false);
    propsFormik.setFieldValue(`titolo`, _corso.titolo);
    propsFormik.setFieldValue(`idcorso`, _corso.id);
    propsFormik.setFieldValue(`codiceCorso`, _corso.codice);
    // setTimeout(() => setCorso(_corso), 30);
  };

  const DocentiForm = arrayHelper => {
    const _docenti = !propsFormik.values.docenti
      ? []
      : propsFormik.values.docenti.map(el => ({ ...el, nome: (el.nome || '') + ' ' + (el.cognome || '') }));

    const onSelectDocente = docente => {
      const idx = _docenti.findIndex(el => docente.id === el.id);
      if (idx < 0) {
        arrayHelper.push(docente);
      } else {
        arrayHelper.replace(idx, docente);
      }
      setTimeout(() => setIsDialogDocenti(false), 30);
      propsFormik.submitForm();
    };

    const actionBodyTemplate = rowData => {
      const idxDocente = propsFormik.values.docenti.findIndex(el => el._id === rowData._id);
      return (
        <React.Fragment>
          <ButtonPrime
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success p-mr-2"
            onClick={() => {
              setIsDialogDocenti(true);
              setEditValueDocente(rowData);
            }}
            style={{ height: '2rem', width: '2rem' }}
          />
          <span>&nbsp;</span>
          <ButtonPrime
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning"
            onClick={() => {
              if (idxDocente > -1) {
                arrayHelper.remove(idxDocente);
                setIsDialogDocenti(false);
                setTimeout(() => setIsDialogDocenti(false), 30);
                propsFormik.submitForm();
              }
            }}
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
        stripedRows
        className="p-datatable-sm"
        bodyStyle={{ fontSize: '14px', height: '100%' }}
        scrollHeight="100%"
        scrollable
        customTheme={myNewTheme}
      >
        <Column field="nome" className={classes.column} header="Nome"></Column>
        <Column field="email" className={classes.column} header="Email"></Column>
        <Column field="cf" className={classes.column} header="Cod. Fisc"></Column>
        <Column field="phone" className={classes.column} header="Tel"></Column>
        <Column field="tipologia" className={classes.column} header="Tipologia"></Column>
        <Column body={actionBodyTemplate} style={{ width: '120px' }}></Column>
      </DataTable>
    );

    return (
      <Paper className={`${classes.paperTitle} ${classes.width95}`} key={'docentiList'} style={{ height: '500px' }}>
        <DialogPersonList
          open={isDialogDocenti}
          value={editValueDocente}
          onSelect={onSelectDocente}
          close={closeDocenti}
        />
        {!!_docenti && !!_docenti[0] ? (
          renderList()
        ) : (
          <Typography variant="body1" color="primary">
            <span
              onClick={() => {
                setIsDialogDocenti(true);
                setTimeout(() => setIsDialogDocenti(true), 30);
              }}
              style={{ cursor: 'pointer', fontSize: 'large', textDecoration: 'underline' }}
            >
              Inserisci docente
            </span>
          </Typography>
        )}
      </Paper>
    );
  };

  const PartecipanteForm = (elem, index) => {
    const isPartecipanteEmpity = partecipante => (!partecipante ? true : !partecipante.cognome && !partecipante.email);
    const renderButtonActionRecord = token => (
      <div style={{}}>
        <span>&nbsp;&nbsp;</span>
        <span style={{}}>
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
        </span>

        <span style={{}}>
          <span>&nbsp;</span>
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
        </span>
      </div>
    );
    const fieldCustom = (styleField, name, label) => (
      <Field name={name}>
        {({ field, form, meta }) => (
          <div style={{ width: '100%' }}>
            <TextField
              type="text"
              fullWidth
              {...field}
              placeholder={label}
              InputProps={{
                style: { fontSize: '14px', width: '100%' },
              }}
            />
            {(Object.getOwnPropertyNames(propsFormik.errors).length !== 0 || meta.error) && (
              <div style={{ color: 'red', fontSize: '1' }}>{meta.error}</div>
            )}
          </div>
        )}
      </Field>
    );
    return (
      <div key={index}>
        <Paper className={`${classes.paperTitle} ${classes.width95}`} key={index}>
          <BarTwoColumn>
            <Typography variant="body1">
              <GridChilds view={[3, 4, 3, 2]} spacing={0} style={{ fontSize: '14px' }}>
                {fieldCustom({ fontSize: '11px' }, `partecipanti.${index}.nome`, 'Nome')}
                {fieldCustom({ fontSize: '11px' }, `partecipanti.${index}.cognome`, 'Cognome')}
                {fieldCustom({ fontSize: '11px' }, `partecipanti.${index}.email`, 'email')}
                {fieldCustom({ fontSize: '11px' }, `partecipanti.${index}.phone`, 'phone')}
              </GridChilds>
            </Typography>
            {renderButtonActionRecord(elem.token)}
          </BarTwoColumn>
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
        <BarTwoColumn>
          <GridChilds view={[7, 3, 2]} spacing={3} justify="space-between" style={{ width: '100%' }}>
            <div style={{ display: 'inline' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: '134px', float: 'left', fontSize: '12px' }}
                onClick={() => {
                  setIsDialogCorsi(true);
                }}
              >
                <span style={{ fontSize: '11px' }} className={classes.buttonAction}>
                  Seleziona corso
                </span>
              </Button>

              <span style={{ float: 'left' }}>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <div style={{ float: 'left' }}>
                <span style={{ fontSize: '16px' }}>
                  Corso:{' '}
                  <b>
                    {!propsFormik.values?.idcorso ? (
                      <span style={{ color: 'red' }}>Selezionare un corso</span>
                    ) : (
                      propValue?.titolo
                    )}
                  </b>
                </span>
                <br />
                <span style={{ fontSize: '16px' }}>
                  Id Corso: <b>{propValue?.codiceCorso}</b>
                </span>
              </div>
            </div>

            {renderField(
              { max: 99, min: 1, onKeyUp: e => e, style: { with: '100px' } },
              'numPartecipanti',
              FtextField,
              'Num. Partecipanti',
              'number',
              '100px',
            )}

            <span>&nbsp;</span>
          </GridChilds>
          <>
            <span>&nbsp;&nbsp;</span>
          </>
        </BarTwoColumn>
        <DialogCorsi open={isDialogCorsi} onSelect={onSelectCorsi} close={closeCorsi} />
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
                Inserisci Docente
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
              <DialogCorsi open={isDialogCorsi} onSelect={onSelectCorsi} close={closeCorsi} />
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
