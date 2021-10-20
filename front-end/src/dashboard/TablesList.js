function TablesList({ table }) {
  return (
    <tr key={table.table_id}>
      <td>{table.table_id}</td>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td>{table.table_status}</td>
    </tr>
  );
}

export default TablesList;
