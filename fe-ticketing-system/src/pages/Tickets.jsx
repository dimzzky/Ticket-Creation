import { useState, useEffect } from "react";
import DataTable from "../components/DataTable";
import EngineerModal from "../components/EngineerModal";
import axios from "axios";

export default function Tickets() {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetchTickets();
    }, []);

    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const fetchTickets = () => {
        axios.get("http://localhost:5001/api/tickets")
            .then((response) => setTickets(response.data.data))
            .catch((error) => console.error("Error fetching tickets:", error));
    };

    // Call this after updating a ticket
    const refreshTable = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    // Run fetchTickets when refreshTrigger changes
    useEffect(() => {
        fetchTickets();
    }, [refreshTrigger]);

    const openModal = (ticket) => {
        setSelectedTicket(ticket);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTicket(null);
        setIsModalOpen(false);
    };

    const handleDeleteTicket = (ticketId) => {
        if (window.confirm("Are you sure you want to delete this ticket?")) {
            axios.delete(`http://localhost:5001/api/tickets/${ticketId}`)
                .then(() => refreshTable())
                .catch((error) => console.error("Error deleting ticket:", error));
        }
    };

    const handleCloseTicket = (ticketId) => {
        axios.put(`http://localhost:5001/api/tickets/${ticketId}/close`)
            .then(() => refreshTable())
            .catch((error) => console.error("Error closing ticket:", error));
    };


    const columns = [
        { header: "ID", accessorKey: "id" },
        { header: "Customer", accessorKey: "customer" },
        { header: "Severity", accessorKey: "severity" },
        { header: "Problem Time", accessorKey: "problem_time" },
        { header: "Incident Description", accessorKey: "incident_description" },
        {
            accessorKey: "engineer",
            header: "Assigned Engineers",
            id: "engineers",
            cell: ({ row }) =>
                row.original.engineer
                    ? row.original.engineer.name
                    : "No Engineers Assigned",
        },
        {
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    {row.original.status === "Open" && (
                        <>
                            <button
                                onClick={() => openModal(row.original)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            >
                                Assign Engineer
                            </button>
                        </>
                    )}
                    {row.original.engineer && row.original.status === "Open" && (
                        <button
                            onClick={() => handleCloseTicket(row.original.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                            Close Ticket
                        </button>
                    )}
                    <button
                        onClick={() => handleDeleteTicket(row.original.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            ),
        }
    ];

    return (
        <>
            <DataTable columns={columns} endpoint="tickets" title="Tickets" />
            <EngineerModal
                ticket={selectedTicket}
                isOpen={isModalOpen}
                onClose={closeModal}
                onUpdate={fetchTickets} // Refresh when modal updates data
            />
        </>
    );
}