import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

export default function EngineerModal({ ticket, isOpen, onClose, onUpdate }) {
    const [engineers, setEngineers] = useState([]);
    const [selectedEngineer, setSelectedEngineer] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5001/api/engineers")
            .then((response) => setEngineers(response.data.data))
            .catch((error) => console.error("Error fetching engineers:", error));
    }, []);

    useEffect(() => {
        if (ticket && ticket.assigned_engineer) {
            setSelectedEngineer(ticket.assigned_engineer.id ? { value: ticket.assigned_engineer.id, label: ticket.assigned_engineer.name } : null);
        } else {
            setSelectedEngineer(null);
        }
    }, [ticket]);

    const handleChange = (selectedOption) => {
        setSelectedEngineer(selectedOption);
    };

    const handleSubmit = () => {
        if (!selectedEngineer) {
            alert("Please select an engineer.");
            return;
        }

        const confirmation = window.confirm(
            `Are you sure you want to assign ${selectedEngineer.label} to this ticket?`
        );

        if (!confirmation) return;

        axios.put(`http://localhost:5001/api/tickets/${ticket.id}`, { engineerId: selectedEngineer.value })
            .then(() => {
                onUpdate();
                onClose();
            })
            .catch((error) => console.error("Error updating ticket:", error));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Assign Engineer</h2>

                <Select
                    options={engineers.map((eng) => ({ value: eng.id, label: eng.name }))}
                    value={selectedEngineer}
                    onChange={handleChange}
                    className="mb-4"
                />

                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
                </div>
            </div>
        </div>
    );
}