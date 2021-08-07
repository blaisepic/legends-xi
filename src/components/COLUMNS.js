import ColumnFilter from './ColumnFilter';

let COLUMNS = [
    {
        Header: 'Name',
        accessor: 'full_name',
        Filter: ColumnFilter,
        disableFilters: true
    },
    {
        Header: 'Pos',
        accessor: 'pos',
        Filter: ColumnFilter,
    },
    {
        Header: 'Ovr',
        accessor: 'ovr',
        Filter: ColumnFilter,
        disableFilters: true
    }
];

export {COLUMNS};