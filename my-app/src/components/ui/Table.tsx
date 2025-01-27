import React from 'react';
import { useTable, useSortBy } from 'react-table';

interface TableProps {
  columns: any[];
  data: any[];
  clickAction?: (row: any) => void;
  buttonWord?: string;
  className?: string;
}

const Table: React.FC<TableProps> = ({ columns = [], data = [], clickAction, buttonWord = '', className='' }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  }, useSortBy);

  return (
    <div style={{ overflowX: 'auto' }} className={`${className}`}>
      <table {...getTableProps()} className={`border-collapse w-full ${className}`}>
        <thead>
          {headerGroups.map(headerGroup => {
            const { key, ...rest } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...rest} style={{ borderBottom: '1px solid black' }}>
                {headerGroup.headers.map(column => {
                  const { key, ...rest } = column.getHeaderProps(column.getSortByToggleProps());
                  return (
                    <th key={key} {...rest} style={{ padding: '10px', cursor: 'pointer', textAlign: 'left' }}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
                  );
                })}
            </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            const { key, ...rest } = row.getRowProps();
            return (
              <tr key={key} {...rest} className="border-b border-black">
                {row.cells.map(cell => {
                  const { key, ...rest } = cell.getCellProps();
                  return (
                    <td key={key} {...rest} style={{ padding: '10px', textAlign: 'left' }}>{cell.render('Cell')}</td>
                  );
                })}
                {clickAction && (
                  <td>
                    <button onClick={() => clickAction(row.original)}>{buttonWord}</button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;