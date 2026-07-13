import EmptyTable from "./EmptyTable";
import FixedTableBody from "./FixedTableBody";
import TableBody from "./TableBody";

function TableContent({ columns = [], rows = [], emptyText, empty, fixedColumns = false, ...tableBodyProps }) {
    if (!rows.length) {
        return empty ?? <EmptyTable text={emptyText} />;
    }

    const Body = fixedColumns ? FixedTableBody : TableBody;

    return <Body columns={columns} rows={rows} {...tableBodyProps} />;
}

export default TableContent;
