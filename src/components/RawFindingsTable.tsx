import React from 'react';
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';
import { Finding } from '../interfaces/finding'


// Column configuration and cell rendering
const columns = [
  {
    name: 'Severity',
    selector: (row: any)=> row.severity,
    width: '90px',
    cell: (row:any) => (
      <div className={`severity ${row.severity}`}>
        {row.severity}
      </div>
		),
  },
  {
    name: 'Time',
    selector: (row: any)=> row.finding_created,
    width: '230px'
  },
  {
    name: 'Source',
    selector: (row: any)=> row.source_security_tool_name,
    width: '180px',
    cell: (row:any) => (
			<div className="flex items-center">
        <img className="source-logo mr-2" src={`${row.source_security_tool_name.replace(/\s/g, '')}.png`} alt="security tool" />
        <div>{row.source_security_tool_name}</div>
			</div>
		),
  },
  {
    name: 'Description',
    selector: (row: any)=> row.description,
    width: '340px',
  },
  {
    name: 'Asset',
    selector: (row: any)=> row.asset,
    width: '550px',
  },
  {
    name: 'Status',
    selector: (row: any)=> row.status,
    minWidth: '100px'
  },
];

const tableCustomStyles = {
  rows: {
		style: {
			fontSize: '11px',
    }
  }
}

/**
 * A component that displays the raw findings of an investigation in a DataTable.
 * @param {ExpanderComponentProps<Finding>} data - The data prop containing an array of raw findings to display.
 * @returns {JSX.Element} - Returns a div containing a heading and a DataTable displaying the raw findings.
 */
const RawFindings: React.FC<ExpanderComponentProps<Finding>> = ({ data }) => {
  return (
    <div className="p-4 border-b-2 border-t-2 border-gray-300">
      <h3 className="text-xl">Raw Findings</h3>
      <DataTable
        customStyles={tableCustomStyles}
        columns={columns}
        data={data.raw_findings}
        striped={true}
        dense={true}
      />
    </div>
  )
};

export default RawFindings;

