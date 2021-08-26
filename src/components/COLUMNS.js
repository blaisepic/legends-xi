import ColumnFilter from './ColumnFilter';

let COLUMNS = [
    {
        Header: 'Name',
        accessor: 'full_name',
        Filter: ColumnFilter,
        disableFilters: true,
        disableSortBy: true,
        width: '60%',
        headerHeight: 123
    },
    {
        Header: 'Pos',
        accessor: 'pos',
        Filter: ColumnFilter,
        disableSortBy: true,
        width: '20%',
        headerHeight: 123
    },
    {
        Header: 'Price',
        accessor: 'price',
        Filter: ColumnFilter,
        disableFilters: true,
        width: '20%',
        headerHeight: 123
    }
];

export {COLUMNS};