import { useNavigate } from "react-router-dom";
import DataTable from "../components/DataTable";

const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Customer Name", accessorKey: "customer_name" },
    { header: "Title", accessorKey: "title" },
    { header: "Description", accessorKey: "description" },
    { header: "Attachment", accessorKey: "attachment" },
    {
        header: "Actions",
        cell: ({ row }) => {
            const navigate = useNavigate();
            return (
                <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => navigate("/create-ticket", { state: row.original })}
                >
                    Create Ticket
                </button>
            );
        },
    },
];

export default function Complaints() {
    return <DataTable columns={columns} endpoint="complaints" title="Customer Complaints" />;
}