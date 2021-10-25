import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

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
import { AnagraficaForm } from 'app/components/User/forms/common/anagrafica';
import { ambitiSlice } from 'app/slice';

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
  const [editValue, setEditValue] = useState(true);
  const [editValueForm, setEditValueForm] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selected, setSelected] = useState(list.filter(el => el.ambito && ambitiSelected.indexOf(el.ambito) > -1));

  const dataTable = useRef(null);
  let originalRow = null;

  const saveData = data => {
    setEditValueForm(null);
    setIsList(false);
    ambitiSlice.actions.save(data).then(res => {
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

  const onRowEditInit = event => {
    originalRow = { ...listData[event.index] };
  };

  const onRowEditCancel = event => {
    originalRow = null;
  };

  const deleteItem = item => {
    const toSave = { ...item, _deleted: true };
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

  const myNewTheme = {
    rows: {
      fontSize: '12px',
    },
  };

  const onChangeValue = (props, field, val) => {
    console.log('edit ambiti ', props);
    const _listData = [...listData];
    const rowEdit = _listData[props.rowIndex];
    const _rowEdit = { ...rowEdit, [field]: val };
    _listData[props.rowIndex] = _rowEdit;
    setListData(_listData);
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
      onRowEditInit={onRowEditInit}
      onRowEditCancel={onRowEditCancel}
      selection={selected}
      onSelectionChange={e => setSelected(e.value)}
      dataKey="id"
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>

      <Column
        style={{ width: '60%' }}
        field="ambito"
        header="Ambito"
        sortable
        editor={props => AmbitoTextEd(props, 'ambito')}
      />
      <Column field="descr" className="noWrap" header="Descr" />
      <Column body={actionBodyTemplate} headerStyle={{ width: '7rem' }} bodyStyle={{ textAlign: 'center' }} />
    </DataTable>
  );

  const renderAnagrafica = () => (
    <AnagraficaForm
      value={editValueForm}
      onExit={() => {
        setEditValueForm(null);
        setIsList(false);
      }}
      onSubmit={data => saveData(data)}
    />
  );

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
          {renderBtClose(closeModal)}
        </div>
      </BarTwoColumn>
      <div className={``}>
        <Button
          style={{ width: '150px', justifySelf: 'flex-end' }}
          color="primary"
          variant="contained"
          onClick={() => {
            onSelect(selected.map(el => el.ambito));
            closeModal();
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
        <div style={{ height: '100%' }}> {isList || !editValueForm ? renderDataTable() : renderAnagrafica()}</div>
        <br />
      </div>
    </div>
  );
};

export default function AmbitiDialg({ ambitiSelected, open, close, onSelect, onSubmit, ...rest }) {
  const ambitiSelector = useSelector(ambitiSlice.selects.dataSelector);
  const [ambiti, setAmbiti] = useState(null);

  useEffect(() => {
    console.log('sss');
    ambitiSlice.actions.query({}, true);
  }, []);

  useEffect(() => {
    !!ambitiSelector && setAmbiti(ambitiSelector.results);
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
