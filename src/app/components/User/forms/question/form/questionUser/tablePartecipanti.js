import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function TablePartecipanti({ arrayHelper, onChange }) {
  const [valuesTable, setValuesTable] = useState(arrayHelper.form.values?.partecipanti || []);

  // useEffect(() => valuesTable !== values && setValuesTable(values), [values]);

  const onEditorValueChange = (props, value) => {
    const updatedValues = [...props.value];
    const rowClone = updatedValues[props.rowIndex];
    const _row = { ...rowClone };
    const row = { ..._row, [props.field]: value };
    const toUpdate = updatedValues.map((el, idx) => (idx === props.rowIndex ? row : el));
    setValuesTable(toUpdate);
  };

  const inputTextEditor = (props, field) => (
    <InputText
      type="text"
      placeholder={field}
      value={props.rowData[field]}
      onChange={e => onEditorValueChange(props, e.target.value)}
      onBlur={e => {
        arrayHelper.replace(props.rowIndex, valuesTable[props.rowIndex]);
      }}
    />
  );

  return (
    <DataTable value={valuesTable} editMode="cell" showGridlines className="editable-cells-table">
      <Column field="nome" header="Nome" editor={props => inputTextEditor(props, 'nome')} />
      <Column field="cognome" header="Cognome" editor={props => inputTextEditor(props, 'cognome')} />
      <Column field="email" header="Email" editor={props => inputTextEditor(props, 'email')} />
      <Column field="phone" header="Tel." editor={props => inputTextEditor(props, 'phone')} />
    </DataTable>
  );
}
