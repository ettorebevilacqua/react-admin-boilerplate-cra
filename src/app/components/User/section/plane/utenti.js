import React, { useState, useRef } from 'react';
import { Button as ButtonPrime } from 'primereact/button';

import Typography from '@material-ui/core/Typography';
import GridChilds from 'app/components/User/forms/component/gridChilds';
import { elemStyle } from '../stylesElement';

import { setMenuList } from 'app/slice/layoutSlice';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import AmbitiDialg from './ambitiModal';

const tipologiaEnte = [
  { id: 1, label: 'formazione' },
  { id: 2, label: 'altro' },
];
const listData = [{ nome: 'paolo', cognome: ' datteri', user: 'datteri' }];

export const UtentiForm = props => {
  const { value, personaleTipo, onSubmit, onExit, saved } = props;
  const classes = elemStyle();
  const [editValue, setEditValue] = useState({});
  const dataTable = useRef(null);

  setMenuList([{ link: '/app/user/moduli', label: 'Valutazione Annuale' }]);

  React.useEffect(() => {
    // value && value.tipologia && setIsAmbito(getIsAmbito(value?.tipologia));
  }, [value]);

  const onSubmitBefore = (valFormik, actions) => {
    actions.setSubmitting(false);
    onSubmit && onSubmit(valFormik);
  };

  const onSelectAmbiti = propsFormik => ambiti => {
    propsFormik.setFieldValue('ambito', ambiti);
  };

  const tipologiaOnChange = formikProps => (e, value) => {
    if (!value && value !== '') return false;
    formikProps.setFieldValue('tipologia', value);
  };

  const renderTitle = () => (
    <div className={classes.paperTitle}>
      <GridChilds justify="space-between" style={{ alignItems: 'center' }} view={[9, 3]}>
        <div>
          <Typography variant="h4" color="error">
            {saved?.isError && saved?.errorMessage}
          </Typography>
        </div>
      </GridChilds>
    </div>
  );
  const actionBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <ButtonPrime
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          style={{ height: '2rem', width: '2rem' }}
        />
        <span>&nbsp;&nbsp;</span>
        <ButtonPrime
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          style={{ height: '2rem', width: '2rem' }}
        />
      </React.Fragment>
    );
  };

  const header = () => (
    <div>
      <h3>Lista Utenti</h3>
      <p>Piano XXX utenti disponibili 3</p>
    </div>
  );

  const renderDataTable = () => (
    <div style={{ height: '100%' }}>
      {header()}
      <DataTable
        ref={dataTable}
        value={listData}
        emptyMessage="Lista utenti vuota"
        showGridlines
        stripedRows
        autoLayout
        className="p-datatable-sm"
        bodyStyle={{ fontSize: '14px', height: '100%' }}
        scrollHeight="98%"
        scrollable
      >
        <Column field="codice" className="noWrap" header="ID" sortable style={{ width: '160px' }} />
        <Column field="nome" className="noWrap" header="Nome" sortable style={{ width: '50%' }} />
        <Column field="cognome" className="noWrap" header="Cognome" sortable style={{ width: '50%' }} />
        <Column field="user" className="noWrap" header="user" sortable style={{ width: '50%' }} />
        <Column body={actionBodyTemplate} style={{ textAlign: 'center', width: '110px' }} />
      </DataTable>
    </div>
  );

  return <div className={classes.root}>{!!listData && renderDataTable()}</div>;
};
