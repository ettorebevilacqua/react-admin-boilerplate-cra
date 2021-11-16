import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/redux-injectors';

import Button from '@material-ui/core/Button';
import { Button as ButtonPrime } from 'primereact/button';

import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// import GridChilds from 'app/components/User/forms/component/gridChilds';
import { ConfirmDialog } from 'app/components/dialogs/dialogMenu';
import BarTwoColumn from 'app/components/Layout/barTwoColumn';
import { CorsiForm } from 'app/components/User/forms/common/corsi';
import { empityCorso } from 'app/data/schema/corsiSchema';
// import { AnagraficaForm } from 'app/components/User/forms/common/anagrafica';
import useStyle from './style';

import { corsiSlice } from 'app/slice';

export const DataList = ({ list }) => {
  const [listData, setListData] = useState(list);
  const [isList, setIsList] = useState(true);
  const [editValue, setEditValue] = useState(true);
  const [editValueForm, setEditValueForm] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dataTable = useRef(null);

  const saveData = data => {
    setEditValueForm(null);
    setIsList(false);
    corsiSlice.actions.save(data).then(res => {
      if (!res || !res.payload) return false;
      const savedData = res.payload;
      const datatmp = [...listData];
      if (!data.id) {
        const newData = [...datatmp, savedData];
        return setListData(newData);
      }
      const idx = datatmp.findIndex(item => item.id === data.id);
      if (idx < 0) return false;
      if (data._deleted) {
        datatmp.splice(idx, 1);
      } else datatmp[idx] = savedData;

      setListData(datatmp);
    });
  };

  const editItem = item => {
    const editItem = { ...item };
    delete editItem._nome;
    setEditValueForm({ ...editItem });
    setIsList(false);
  };

  const onConfirmDelete = val => {
    if (!editValue) return false;
    const deleteValue = { ...editValue, _deleted: true };
    saveData(deleteValue);
    console.log(val);
  };

  const confirmDeleteProduct = item => {
    setEditValue({ ...item });

    setTimeout(() => setConfirmDelete(true), 60);
  };

  const actionBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <ButtonPrime
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editItem(rowData)}
          style={{ height: '2rem', width: '2rem' }}
        />
        <span>&nbsp;&nbsp;</span>
        <ButtonPrime
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
          style={{ height: '2rem', width: '2rem' }}
        />
      </React.Fragment>
    );
  };

  const reset = () => {
    setGlobalFilter('');
    dataTable.current.reset();
  };

  const header = () => (
    <div className="table-header">
      <BarTwoColumn>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Cerca"
            style={{ fontSize: '14px', width: '100%' }}
          />
        </span>
        <div style={{ width: '100%', display: 'inline' }}>
          <Button
            style={{ width: '150px', justifySelf: 'flex-end' }}
            color="primary"
            variant="contained"
            onClick={() => editItem(empityCorso)}
          >
            Nuovo
          </Button>
        </div>
      </BarTwoColumn>
      <br />
    </div>
  );

  const myNewTheme = {
    rows: {
      fontSize: '12px',
    },
  };
  const ambitoTemplate = rowData =>
    rowData && rowData.ambito && rowData.ambito.filter((ambito, idx) => idx < 3).map(el => <span>{el + ' '}</span>);

  const renderDataTable = () => (
    <div style={{ height: '100%' }}>
      {header()}
      <DataTable
        ref={dataTable}
        value={listData}
        globalFilter={globalFilter}
        emptyMessage="Lista corsi vuota"
        showGridlines
        stripedRows
        autoLayout
        className="p-datatable-sm"
        bodyStyle={{ fontSize: '14px', height: '100%' }}
        scrollHeight="98%"
        scrollable
        customTheme={myNewTheme}
      >
        <Column field="codice" className="noWrap" header="ID corso" sortable style={{ width: '160px' }} />
        <Column field="titolo" className="noWrap" header="Titolo" sortable style={{ width: '50%' }} />
        <Column field="dataInizio" header="Data" sortable style={{ width: '160px' }} />
        <Column field="tipologia" header="ambito" sortable />
        {<Column field="ambito" header="ambito" body={ambitoTemplate} sortable />}
        <Column body={actionBodyTemplate} style={{ textAlign: 'center', width: '110px' }} />
      </DataTable>
    </div>
  );

  const renderAnagrafica = () => (
    <CorsiForm
      value={editValueForm}
      onExit={() => {
        setEditValueForm(null);
        setIsList(false);
      }}
      onSubmit={data => saveData(data)}
    />
  );

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: '92%', width: '100%' }}>
        <div style={{ height: '100%' }}> {isList || !editValueForm ? renderDataTable() : renderAnagrafica()}</div>
        <ConfirmDialog
          open={confirmDelete}
          setOpen={setConfirmDelete}
          onConfirm={onConfirmDelete}
          title={
            <p>
              Sei sicuro di eliminare <br /> {!editValue ? '' : editValue.titolo} ?
            </p>
          }
        />
        <br />
      </div>
    </>
  );
};

export function CorsiList(props) {
  useInjectReducer({ key: corsiSlice.name, reducer: corsiSlice.slice.reducer });
  const corsiSelector = useSelector(corsiSlice.selects.dataSelector);
  const [corsi, setCorsi] = useState(null);
  const classes = useStyle();

  useEffect(() => {
    corsiSlice.actions.query({}, true);
  }, []);

  useEffect(() => {
    !!corsiSelector && setCorsi(corsiSelector.results);
  }, [corsiSelector]);

  return (
    <div className={classes.root}>
      <br />
      {!corsi ? <h3>Loading...</h3> : <DataList list={corsi} />}
    </div>
  );
}
