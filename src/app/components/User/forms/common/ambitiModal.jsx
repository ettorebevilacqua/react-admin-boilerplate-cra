import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/redux-injectors';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';
import DialogContent from '@material-ui/core/DialogContent';
import { Button as ButtonPrime } from 'primereact/button';

import { InputText } from 'primereact/inputtext';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// import GridChilds from 'app/components/User/forms/component/gridChilds';
import BarTwoColumn from 'app/components/Layout/barTwoColumn';
import { ambitiSlice } from 'app/slice';

const myNewTheme = {
  rows: {
    fontSize: '12px',
  },
};

const renderBtClose = closeFunz => (
  <Button
    style={{ width: '150px', justifySelf: 'flex-end' }}
    color="primary"
    variant="contained"
    onClick={() => {
      closeFunz();
    }}
  >
    Chiudi
  </Button>
);

export const DataList = ({ ambitiSelected, closeModal, onSelect, onSubmit, list }) => {
  const [listData, setListData] = useState(list);
  const [isList, setIsList] = useState(true);
  const [editValueForm, setEditValueForm] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selected, setSelected] = useState(list.filter(el => el.ambito && ambitiSelected.indexOf(el.ambito) > -1));
  const [editingRows, setEditingRows] = useState(null);

  const dataTable = useRef(null);
  let originalRow = null;
  let originalRowIndex = null;

  const saveData = data => {
    setEditValueForm(null);
    setIsList(false);
    ambitiSlice.actions.save(data).then(res => {
      if (!res || !res.payload) return false;
      const savedData = res.payload;
      const datatmp = [...listData];
      /* crea un doppione if (!data.id) {
        const newData = [...datatmp, savedData];
        return setListData(newData);
      } */
      ambitiSlice.actions.query({}, true);
      const idx = datatmp.findIndex(item => item.id === data.id);
      if (idx < 0) return false;
      if (data._deleted) {
        datatmp.splice(idx, 1);
      } else datatmp[idx] = savedData;

      setListData(datatmp);
    });
  };

  const beforeClose = () => {
    if (!!editingRows) {
      saveData(editingRows);
    }
    closeModal();
  };

  const onChangeValue = (props, field, val) => {
    // console.log('edit ambiti EditingRows ', editingRows);
    const _listData = [...listData];
    const rowEdit = _listData[props.rowIndex];
    const _rowEdit = { ...rowEdit, [field]: val };
    _listData[props.rowIndex] = _rowEdit;
    setListData(_listData);
  };

  const onRowEditSave = event => {
    saveData(event.data);
  };

  const onRowEditChange = event => {
    setEditingRows(event.data);
  };

  const onRowEditInit = event => {
    originalRow = { ...listData[event.index] };
    originalRowIndex = event.index;
  };

  const onRowEditCancel = event => {
    originalRow = null;
    originalRowIndex = null;
  };

  const deleteItem = item => {
    const toSave = { ...item, _deleted: true };
    if (editingRows && editingRows.id === item.id) {
      setEditingRows(null);
    }
    saveData(toSave);
  };

  const actionBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <ButtonPrime
          icon="pi pi-save"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => saveData(rowData)}
          style={{ height: '2rem', width: '2rem' }}
        />
        <span>&nbsp;&nbsp;</span>
        <ButtonPrime
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => deleteItem(rowData)}
          style={{ height: '2rem', width: '2rem' }}
        />
        <span>&nbsp;&nbsp;</span>
      </React.Fragment>
    );
  };

  const AmbitoTextEd = (props, field) => (
    <InputText type="text" value={props.rowData[field]} onChange={e => onChangeValue(props, field, e.target.value)} />
  );
  const renderDataTable = () => (
    <DataTable
      ref={dataTable}
      value={listData}
      globalFilter={globalFilter}
      emptyMessage="Lista ambiti vuota"
      showGridlines
      autoLayout
      className="p-datatable-sm"
      bodyStyle={{ fontSize: '14px', height: '100%' }}
      scrollHeight="98%"
      scrollable
      selectionMode="single"
      customTheme={myNewTheme}
      editMode="row"
      editingRows={editingRows}
      onRowEditSave={onRowEditSave}
      onRowEditChange={onRowEditChange}
      onRowEditInit={onRowEditInit}
      onRowEditCancel={onRowEditCancel}
      selection={selected}
      onSelectionChange={e => setSelected(e.value)}
      dataKey="id"
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>

      <Column style={{ width: '70%' }} field="ambito" header="Ambito" editor={props => AmbitoTextEd(props, 'ambito')} />
      <Column style={{ width: '28px' }} rowEditor></Column>
      <Column style={{ width: '56px' }} body={actionBodyTemplate} bodyStyle={{ textAlign: 'center', width: '126px' }} />
    </DataTable>
  );

  const renderForm = () => <h3>No form </h3>;

  return (
    <div className="ag-theme-alpine" style={{ height: '580px', width: '100%' }}>
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
            onClick={() => {
              const _listData = [...listData];
              _listData.push({ ambito: '', descr: '' });
              setListData(_listData);
            }}
          >
            Nuovo
          </Button>
          <span>&nbsp; &nbsp; </span>
          {renderBtClose(beforeClose)}
        </div>
      </BarTwoColumn>
      <div className={``}>
        <Button
          style={{ width: '150px', justifySelf: 'flex-end' }}
          color="primary"
          variant="contained"
          onClick={() => {
            onSelect(selected.map(el => el.ambito));
            beforeClose();
          }}
        >
          Inserisci
        </Button>
        {selected.map((ambito, idxModulo) => (
          <Chip style={{ marginLeft: '6px' }} key={idxModulo} tabIndex={-1} label={ambito.ambito} />
        ))}
      </div>
      <br />
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        <div style={{ height: '100%' }}> {isList || !editValueForm ? renderDataTable() : renderForm()}</div>
        <br />
      </div>
    </div>
  );
};

export default function AmbitiDialg({ ambitiSelected, open, close, onSelect, onSubmit, ...rest }) {
  useInjectReducer({ key: ambitiSlice.name, reducer: ambitiSlice.slice.reducer });
  const ambitiSelector = useSelector(ambitiSlice.selects.dataSelector);
  const [ambiti, setAmbiti] = useState(null);

  useEffect(() => {
    console.log('sss');
    open && ambitiSlice.actions.query({}, true);
  }, [open]);

  useEffect(() => {
    !!ambitiSelector &&
      ambitiSelector.results &&
      setAmbiti(
        [...ambitiSelector.results].sort(
          (a, b) => a && a.ambito && b && b.ambito && a.ambito.localeCompare(b.ambito) < b.ambito,
        ),
      );
  }, [ambitiSelector]);

  return (
    <Dialog open={open} fullWidth={true} maxWidth="lg" style={{ height: '100%', width: '80%', margin: 'auto' }}>
      <DialogContent style={{ height: '100%' }}>
        {!ambiti ? (
          <>
            <h3>Loading...</h3>
            {renderBtClose(close)}
          </>
        ) : (
          <DataList
            ambitiSelected={ambitiSelected}
            style={{ height: '100%' }}
            onSubmit={onSubmit}
            onSelect={onSelect}
            closeModal={close}
            list={ambiti}
            {...rest}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
