import React, { useState, useRef } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Button as ButtonPrime } from 'primereact/button';

import createRowData from './fakeDocentiData';

import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// import GridChilds from 'app/components/User/forms/component/gridChilds';
import { ConfirmDialog } from 'app/components/dialogs/dialogMenu';
import BarTwoColumn from 'app/components/Layout/barTwoColumn';
import { AnagraficaForm } from 'app/components/User/forms/common/anagrafica';
import { empityAnagrafica } from 'app/data/schema/anagrafica';

// import { AnagraficaForm } from 'app/components/User/forms/common/anagrafica';
import useStyle from './style';

const dataFake = createRowData(100);

const BtnCellRenderer = ({ value, context, node }) => {
  const invokeParentMethod = () => {
    context.methodFromParent(value, node.rowIndex);
  };

  return (
    <Button color="primary" variant="contained" onClick={invokeParentMethod}>
      Modifica
    </Button>
  );
};

export const DataList = ({ closeModal, onSelect, onSubmit, list }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const listData = list.map(el => ({ ...el, _nome: el.nome + ' ' + el.cognome }));
  const [isList, setIsList] = useState(true);
  const [editValue, setEditValue] = useState(true);
  const [editValueForm, setEditValueForm] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dataTable = useRef(null);

  const editProduct = item => {
    const editItem = { ...item };
    delete editItem._nome;
    setEditValueForm({ ...editItem });
    setIsList(false);
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
          onClick={() => editProduct(rowData)}
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
            style={{ fontSize: '14px' }}
          />
        </span>
        <div style={{ width: '100%', display: 'inline' }}>
          <Button
            style={{ width: '150px', justifySelf: 'flex-end' }}
            color="primary"
            variant="contained"
            onClick={() => editProduct(empityAnagrafica)}
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

  const renderDataTable = () => (
    <DataTable
      ref={dataTable}
      value={listData}
      globalFilter={globalFilter}
      emptyMessage="Lista docenti vuota"
      showGridlines
      stripedRows
      autoLayout
      className="p-datatable-sm"
      bodyStyle={{ fontSize: '14px', height: '100%' }}
      scrollHeight="98%"
      scrollable
      customTheme={myNewTheme}
    >
      <Column field="_nome" header="Nome"></Column>
      <Column field="email" className="noWrap" header="Email"></Column>
      <Column field="cf" header="Cod. Fisc"></Column>
      <Column field="phone" header="Tel"></Column>
      <Column field="ambito" header="Ambito"></Column>
      <Column body={actionBodyTemplate}></Column>
    </DataTable>
  );
  const renderAnagrafica = () => (
    <AnagraficaForm
      value={editValueForm}
      onExit={() => {
        setEditValueForm(null);
        setIsList(false);
      }}
      onSubmit={() => {
        setEditValueForm(null);
        setIsList(false);
      }}
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
          onConfirm={setConfirmDelete}
          title={'sei sicuro di eliminare ' + !editValue ? '' : editValue._nome}
        />
        <br />
      </div>
    </>
  );
};

export function DialogPersonList({ open, close, onSelect, onSubmit, ...rest }) {
  const classes = useStyle();
  return (
    <Dialog open={open} fullWidth={true} maxWidth="lg" classes={{ paper: classes.dialogPaper }}>
      <DialogContent>
        <DataList onSubmit={onSubmit} onSelect={onSelect} closeModal={close} list={dataFake} {...rest} />
      </DialogContent>
    </Dialog>
  );
}
