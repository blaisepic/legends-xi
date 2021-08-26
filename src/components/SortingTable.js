import React, {Component, useMemo} from 'react';
import {useTable, useGlobalFilter, useFilters, useSortBy} from 'react-table';
import MOCK_DATA from "./MOCK.DATA.json";
import {COLUMNS} from './COLUMNS.js';
import './table.css';
import GlobalFilter from './GlobalFilter';
import ColumnFilter from './ColumnFilter';

function SortingTable(props){
    // constructor(props){
    //     super(props);
    // }

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    let tableInstance = useTable({
        columns,
        data
    }, 
    useFilters,
    useGlobalFilter,
    useSortBy);

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter} = tableInstance;
    const {globalFilter} = state;
    return(
        <>
        {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/> */}
        <div>
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps}>
                                {
                                    headerGroup.headers.map((column) => (
                                        <th width={column.width} headerHeight={column.headerHeight}
                                        {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                            </span>
                                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                                        </th>
                                    ))
                                }
                                
                            </tr>
                        ))
                    }
                </thead>

                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} id={row.original.key} onClick={() => {
                                    props.parentCallback(row.original.full_name, row.original.price, row.original.pos);
                                }}>
                                    {
                                        row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        </>
    );
}

export default SortingTable;