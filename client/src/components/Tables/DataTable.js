import React from "react";
import { Table } from "reactstrap";

//TODO: implement this component with all datatables

function DataTable({ data }) {
  const columns = data[0] && Object.keys(data[0]);

  return (
    <Table>
      <thead>
        <tr>{data[0] && columns.map((heading) => <th>{heading}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr>
            {columns.map((column) => (
              <td>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DataTable;
