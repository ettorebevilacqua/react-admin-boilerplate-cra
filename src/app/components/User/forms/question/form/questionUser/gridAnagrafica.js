import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Button from '@material-ui/core/Button';
import { InputText } from 'primereact/inputtext';
import BarTwoColumn from 'app/components/Layout/barTwoColumn';

export default function GridAnagrafica({
  key,
  columns,
  columnsMore,
  showGlobalSearch,
  headerLeft,
  headerRight,
  actionTpl,
  isColactions,
  theme,
  header,
  ...rest
}) {
  const [globalFilter, setGlobalFilter] = useState('');
  const defaultheme = { rows: { fontSize: '14px' } };
  const curTheme = theme || defaultheme;

  const _columns = columns || [
    { field: 'nome', header: 'nome', style: { width: '50px', background: 'red' } },
    { field: 'email', header: 'email' },
    { field: 'cf', header: 'Cod. Fisc' },
  ];

  const myNewTheme = {
    rows: {
      fontSize: '12px',
    },
  };

  const colRender = columnsMore ? [...columns, ...columnsMore] : [];
  const dynamicColumns = colRender.map((col, i) => {
    return <Column key={col.field} {...col} />;
  });

  const _header = () => (
    <div className="table-header">
      <BarTwoColumn>
        {!showGlobalSearch ? (
          <span> </span>
        ) : (
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
        )}
        <div style={{ width: '100%', display: 'grid' }}>
          <Button
            style={{ width: '150px', justifySelf: 'flex-end' }}
            color="primary"
            variant="contained"
            onClick={() => false}
          >
            Modifica
          </Button>
          <span>&nbsp;&nbsp;</span>
          <Button
            style={{ width: '150px', justifySelf: 'flex-end' }}
            color="primary"
            variant="contained"
            onClick={() => false}
          >
            chiudi
          </Button>
        </div>
      </BarTwoColumn>
    </div>
  );

  return (
    <>
      {header && header()}
      <div key={key || 'GridAnag_0'}>
        <DataTable
          emptyMessage="Lista docenti vuota"
          globalFilter={globalFilter || ''}
          showGridlines
          stripedRows
          autoLayout
          className="p-datatable-sm"
          bodyStyle={{ fontSize: '14px', height: '100%' }}
          scrollable
          customTheme={theme || myNewTheme}
          {...rest}
        >
          {dynamicColumns}
        </DataTable>
      </div>
    </>
  );
}
