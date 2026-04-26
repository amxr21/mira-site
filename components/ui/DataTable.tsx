interface Column<T> {
  key: keyof T | string;
  header: string;
  mono?: boolean;
  render?: (row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  minWidth?: string;
  rowHighlight?: (row: T, i: number) => boolean;
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  minWidth = "400px",
  rowHighlight,
}: DataTableProps<T>) {
  return (
    <div className="table-wrap">
      <table style={{ minWidth }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key as string} style={col.width ? { width: col.width } : {}}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={rowHighlight?.(row, i) ? { background: "rgba(201,74,24,0.04)" } : i % 2 === 1 ? { background: "rgba(201,74,24,0.03)" } : {}}
            >
              {columns.map((col) => (
                <td key={col.key as string} className={col.mono ? "mono" : ""}>
                  {col.render ? col.render(row) : (row[col.key as string] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
