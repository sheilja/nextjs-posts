// components/MovieTable.js
import React, { useMemo, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';

import { useSelector, useDispatch } from 'react-redux';
import { updateMovie } from '@/store/movieSlice';

export default function MovieTable() {
    const movies = useSelector((state) => state.movie.movies);
    const dispatch = useDispatch();

    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'title',
                header: 'Title',
                cell: ({ row, getValue }) => (
                    <input
                        value={getValue()}
                        onChange={(e) =>
                            dispatch(updateMovie({ id: row.original.id, updatedData: { title: e.target.value } }))
                        }
                    />
                ),
            },
            {
                accessorKey: 'release_date',
                header: 'Release Date',
                cell: ({ row, getValue }) => (
                    <input
                        value={getValue()}
                        onChange={(e) =>
                            dispatch(updateMovie({ id: row.original.id, updatedData: { release_date: e.target.value } }))
                        }
                    />
                ),
            },
            {
                accessorKey: 'overview',
                header: 'Overview',
                cell: ({ row, getValue }) => (
                    <textarea
                        rows="2"
                        value={getValue()}
                        onChange={(e) =>
                            dispatch(updateMovie({ id: row.original.id, updatedData: { overview: e.target.value } }))
                        }
                    />
                ),
            },
        ],
        [dispatch]
    );

    const table = useReactTable({
        data: movies,
        columns,
        state: {
            globalFilter,
            sorting,
        },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div>
            <input
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search movies..."
                style={{ marginBottom: '10px', width: '100%' }}
            />

            <table border="1" cellPadding="6" cellSpacing="0" width="100%">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() === 'asc' ? ' 🔼' : header.column.getIsSorted() === 'desc' ? ' 🔽' : ''}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
