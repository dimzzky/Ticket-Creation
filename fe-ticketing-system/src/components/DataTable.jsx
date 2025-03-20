import { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import axios from "axios";

export default function DataTable({ columns, endpoint, title }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5001/api/${endpoint}`)
            .then((response) => setData(response.data.data))
            .catch((error) => console.error("Error fetching data:", error));
    }, [endpoint]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="p-5 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="p-2 border border-gray-300">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-100">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="p-2 border border-gray-300">
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