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

export const DataList = ({ onExit, onSubmit, list }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [isList, setIsList] = useState(true);
  const [editValue, setEditValue] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dataTable = useRef(null);

  const editProduct = item => {
    setEditValue({ ...item });
    setIsList(false);
  };

  const confirmDeleteProduct = item => {
    setEditValue(item);
    setConfirmDelete(true);
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
            style={{ fontSize: '14px' }}
          />
        </span>
        <div style={{ width: '100%', display: 'grid' }}>
          <Button
            style={{ width: '150px', justifySelf: 'flex-end' }}
            color="primary"
            variant="contained"
            onClick={() => false}
          >
            Modifica
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

  return (
    <>
      {header()}
      <div className="ag-theme-alpine" style={{ height: '92%', width: '100%' }}>
        <div style={{ height: '100%' }}>
          {isList && (
            <DataTable
              ref={dataTable}
              value={list}
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
              <Column field="nome" header="nome"></Column>
              <Column field="email" className="noWrap" header="email"></Column>
              <Column field="cf" header="Cod. Fisc"></Column>
              <Column field="city" header="Città"></Column>
              <Column body={actionBodyTemplate}></Column>
            </DataTable>
          )}
        </div>
        <ConfirmDialog
          open={confirmDelete}
          setOpen={setConfirmDelete}
          onConfirm={setConfirmDelete}
          title={'sei sicuro di eliminare ' + editValue.nome}
        />
        <br />
      </div>
    </>
  );
};

export function DialogPersonList({ open, onSubmit, ...rest }) {
  const classes = useStyle();
  debugger;
  return (
    <Dialog open={open} fullWidth={true} maxWidth="lg" classes={{ paper: classes.dialogPaper }}>
      <DialogContent>
        <DataList onSubmit={onSubmit} list={dataFake} {...rest} />
      </DialogContent>
    </Dialog>
  );
}
