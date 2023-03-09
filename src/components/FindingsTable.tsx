import React, { FC } from 'react';
import DataTable from 'react-data-table-component';
import RawFindings from './RawFindingsTable'
import { Finding } from '../interfaces/finding'
import { orderBy } from 'lodash'
import '../styles/tables.scss'

type Severity = 'critical' | 'high' | 'medium' | 'low';

interface Props {
  data: Finding[];
}

interface Item {
  severity: Severity;
}

/**
 * A sorting function that sorts rows by severity in the order 'critical' > 'high' > 'medium' > 'low'.
 * @param {any} rowA - The first row to compare.
 * @param {any} rowB - The second row to compare.
 * @returns {number} - Returns -1 if rowA should come before rowB, 1 if rowB should come before rowA, or 0 if they are equal.
 */
const severitySort = (rowA: any, rowB: any): number => {
  const sortOrder: Severity[] = ['critical', 'high', 'medium', 'low'];
  return orderBy([rowA, rowB], [(item: Item) => sortOrder.indexOf(item.severity)])[0] === rowA ? -1 : 1;
};

// Default column sorting function
const customSort = (rows:any, selector:any, direction:any):any => {
  return orderBy(rows, selector, direction);
};

// Table configure and cell rendering
const columns = [
  {
    name: 'Severity',
    id: 'severity',
    selector: (row: any)=> row.severity,
    width: '105px',
    sortable: true,
    sortFunction: severitySort,
    cell: (row:any) => (
      <div className={`severity ${row.severity}`}>
        {row.severity}
      </div>
		),
  },
  {
    name: 'Time',
    selector: (row: any) => row.grouped_finding_created,
    width: '190px',
    sortable: true,
  },
  {
    name: 'SLA',
    selector: (row: any) => row.sla,
    width: '200px',
    sortable: true,
  },
  {
    name: 'Description',
    selector: (row: any) => row.description,
    width: '540px',
    sortable: true,
  },
  {
    name: 'Analyst',
    selector: (row: any) => row.security_analyst,
    width: '140px',
    sortable: true,
    cell: (row:any) => (
      <div className="flex items-center">
        <img className="w-8 h-8 mr-2 analyst" src={`${row.security_analyst}.png`} alt="analyst" />
        {row.security_analyst}
      </div>
		),
  },
  {
    name: 'Owner',
    selector: (row: any) => row.owner,
    width: '140px',
    sortable: true,
    cell: (row:any) => (
      <div className="flex items-center">
        <img className="w-8 h-8 mr-2 analyst" src={`${row.security_analyst}.png`} alt="owner" />
        {row.security_analyst}
      </div>
		),
  },
  {
    name: 'Workflow',
    selector: (row: any) => row.workflow,
    width: '120px',
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row: any) => row.status,
    width: '120px',
    sortable: true,
    cell: (row:any) => (
      <div className="flex items-center flex-col">
        {row.status.replace('in_progress', 'In Progress')}
         <div className="progress-bar">
           <div className="inner" style={{width: `${row.progress * 100}%`}} />
         </div>
      </div>
		),
  },
  {
    name: '# Of Findings',
    selector: (row: any) => row.raw_findings.length,
    width: '130px',
    sortable: true,
    style: {
      display: 'flex',
      alignIems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    cell: (row:any) => (
      <div className="num-findings flex items-center">
        {row.raw_findings.length}
      </div>
		),
  },
];

const tableCustomStyles = {
  rows: {
		style: {
			fontSize: '10px',
    }
  }
}

/**
 * A React functional component that renders a DataTable with custom styles, columns, data, and sorting behavior.
 * @param {Props} data - An object containing the data to display in the table.
 * @returns {JSX.Element} - Returns a DataTable component with custom properties and expandable rows.
 */
const Table: FC<Props> = ({ data }) => {
  return (
    <DataTable
      className="mt-8"
      customStyles={tableCustomStyles}
      columns={columns}
      data={data}
      striped={false}
      dense={true}
      theme="light"
      expandableRows
      expandableRowsComponent={RawFindings}
      sortFunction={customSort}
      defaultSortFieldId="severity"
    />
  );
};

export default Table;

