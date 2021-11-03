import React, { useState, useRef, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import { Button as ButtonPrime } from 'primereact/button';

import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// import GridChilds from 'app/components/User/forms/component/gridChilds';
import { ConfirmDialog } from 'app/components/dialogs/dialogMenu';
import BarTwoColumn from 'app/components/Layout/barTwoColumn';
import { AnagraficaForm } from 'app/components/User/forms/common/anagrafica';
import { empityCorso } from 'app/data/schema/corsiSchema';
// import { AnagraficaForm } from 'app/components/User/forms/common/anagrafica';
import useStyle from './style';

import { useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/redux-injectors';
import { docentiSlice, listsSlice } from 'app/slice';

const getNomeFull = el => ({ ...el, _nome: el.cognome + ' ' + el.nome });
const getListFullName = list => (!list ? [] : list.map(getNomeFull));

export const DataList = ({ list, personaleTipo }) => {
  const [listData, setListData] = useState(getListFullName([...list]));
  const [isList, setIsList] = useState(true);
  const [editValue, setEditValue] = useState(true);
  const [editValueForm, setEditValueForm] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dataTable = useRef(null);

  const saveData = data => {
    setEditValueForm(null);
    setIsList(false);
    delete data._nome;
    docentiSlice.actions.save(data).then(res => {
      if (!res || !res.payload) return false;
      const savedData = { ...res.payload, _nome: res.payload.cognome + ' ' + res.payload.nome };
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
    <div>
      {header()}

      <DataTable
        ref={dataTable}
        value={listData}
        globalFilter={globalFilter}
        emptyMessage="Lista docenti vuota"
        showGridlines
        autoLayout
        className="p-datatable-sm"
        bodyStyle={{ fontSize: '14px', height: '100%' }}
        scrollHeight="98%"
        scrollable
        selectionMode="single"
        customTheme={myNewTheme}
      >
        <Column field="_nome" header="Nome" sortable></Column>
        <Column field="email" className="noWrap" header="Email"></Column>
        <Column field="cf" header="Cod. Fisc"></Column>
        <Column field="phone" header="Tel"></Column>
        <Column field="ambito" header="Ambito" sortable></Column>
        <Column body={actionBodyTemplate}></Column>
      </DataTable>
    </div>
  );

  const renderAnagrafica = () => (
    <AnagraficaForm
      value={{ ...editValueForm }}
      personaleTipo={personaleTipo}
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

export function PersonaleList(props) {
  useInjectReducer({ key: docentiSlice.name, reducer: docentiSlice.slice.reducer });
  const personaleSelector = useSelector(docentiSlice.selects.dataSelector);
  const listsSelector = useSelector(listsSlice.selects.dataSelector);
  const [personale, setPersonale] = useState(null);
  const [personaleTipo, setPersonaleTipo] = useState(null);
  const classes = useStyle();

  useEffect(() => {
    docentiSlice.actions.query({}, true);
    listsSlice.actions.query({ name: 'personaleTipo' }, true);
  }, []);

  useEffect(() => {
    !!personaleSelector && personaleSelector.results && setPersonale([...personaleSelector.results]);
  }, [personaleSelector]);

  useEffect(() => {
    if (!!listsSelector && listsSelector.results && listsSelector.results[0] && listsSelector.results[0].list) {
      setPersonaleTipo(listsSelector.results[0].list);
      personaleSelector && personaleSelector.results && setPersonale([...personaleSelector.results]);
    }
  }, [listsSelector]);

  return (
    <div className={classes.root}>
      <br />
      {!personale ? <h3>Loading...</h3> : <DataList list={personale} personaleTipo={personaleTipo} />}
    </div>
  );
}
