// Generic and reusable Table component
const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[]; // Defines table headers and optional classes
  renderRow: (item: any) => React.ReactNode; // Function to render each row dynamically
  data: any[]; // Array of data to display in the table
}) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {/* Render table headers */}
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Render table rows using the provided renderRow function */}
        {data.map((item) => renderRow(item))}
      </tbody>
    </table>
  );
};

export default Table;
