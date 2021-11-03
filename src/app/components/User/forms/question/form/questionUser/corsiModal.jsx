import React, { useState, useRef, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
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

import { useSelector } from 'react-redux';
import { corsiSlice } from 'app/slice';

export const DataList = ({ closeModal, onSelect, onSubmit, list }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
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
        setIsList(true);
        return setListData(newData);
      }
      const idx = datatmp.findIndex(item => item.id === data.id);
      if (idx < 0) return false;
      if (data._deleted) {
        datatmp.splice(idx, 1);
      } else datatmp[idx] = savedData;
      setIsList(true);
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

    setTimeout(() => setConfirmDelete(true), 30);
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
        <span>&nbsp;&nbsp;</span>
        <ButtonPrime
          label="Inserisci"
          onClick={() => {
            onSelect(rowData);
            closeModal();
          }}
          style={{ height: '2rem', width: '6rem' }}
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
          <span>&nbsp;&nbsp;</span>
          <Button
            style={{ width: '150px', justifySelf: 'flex-end' }}
            color="primary"
            variant="contained"
            onClick={() => {
              closeModal();
            }}
          >
            Chiudi
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
      <Column field="codice" className="noWrap" header="ID corso" sortable />
      <Column field="titolo" className="noWrap" header="Titolo" sortable />
      <Column field="dataInizio" header="Data" sortable />
      <Column field="ambito" header="ambito" body={ambitoTemplate} sortable />
      <Column body={actionBodyTemplate} />
    </DataTable>
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
      {header()}
      <div className="ag-theme-alpine" style={{ height: '92%', width: '100%' }}>
        <div style={{ height: '100%' }}> {isList || !editValueForm ? renderDataTable() : renderAnagrafica()}</div>
        <ConfirmDialog
          open={confirmDelete}
          setOpen={setConfirmDelete}
          onConfirm={onConfirmDelete}
          title={'sei sicuro di eliminare ' + !editValue ? '' : editValue.titolo}
        />
        <br />
      </div>
    </>
  );
};

export function DialogCorsi({ open, close, onSelect, onSubmit, ...rest }) {
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
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth="lg"
      classes={{ paper: classes.dialogPaper }}
      style={{ height: '690px', overflow: 'hidden' }}
    >
      <DialogContent style={{ overflow: 'hidden' }}>
        {!corsi ? (
          <h3>Loading...</h3>
        ) : (
          <DataList onSubmit={onSubmit} onSelect={onSelect} closeModal={close} list={corsi} {...rest} />
        )}
      </DialogContent>
    </Dialog>
  );
}
