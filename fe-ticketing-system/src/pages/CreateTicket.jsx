import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

export default function CreateTicket() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [engineers, setEngineers] = useState([]);
    const [formData, setFormData] = useState({
        title: state?.title || "",
        customer: state?.customer_name || "",
        severity: "Low",
        problem_time: "",
        customer_info: "",
        incident_description: "",
        assigned_engineer: "",
        type: "Incident",
    });

    useEffect(() => {
        axios.get("http://localhost:5001/api/engineers")
            .then((response) => setEngineers(response.data.data))
            .catch((error) => console.error("Error fetching engineers:", error));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEngineerChange = (selectedOption) => {
        setFormData({ ...formData, assigned_engineer: selectedOption.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:5001/api/tickets", formData)
            .then(() => navigate("/tickets"))
            .catch((error) => console.error("Error creating ticket:", error));
    };

    return (
        <div className="max-w-2xl mx-auto p-5 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Create Ticket</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Ticket Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="Incident">Incident</option>
                        <option value="Project">Project</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Training">Training</option>
                    </select>
                </div>

                {formData.type === "Incident" && (
                    <>
                        <div>
                            <label className="block font-medium">Title</label>
                            <input type="text" name="title" value={formData.title} readOnly className="w-full p-2 border rounded bg-gray-100" required />
                        </div>

                        <div>
                            <label className="block font-medium">Customer Name</label>
                            <input type="text" name="customer" value={formData.customer} readOnly className="w-full p-2 border rounded bg-gray-100" required />
                        </div>

                        <div>
                            <label className="block font-medium">Problem Time</label>
                            <input type="datetime-local" name="problem_time" value={formData.problem_time} onChange={handleChange} className="w-full p-2 border rounded" required />
                        </div>

                        <div>
                            <label className="block font-medium">Customer Info</label>
                            <input type="text" name="customer_info" value={formData.customer_info} onChange={handleChange} className="w-full p-2 border rounded" required />
                        </div>

                        <div>
                            <label className="block font-medium">Incident Description</label>
                            <textarea name="incident_description" value={formData.incident_description} onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
                        </div>
                        <div>
                            <label className="block font-medium">Severity</label>
                            <select name="severity" value={formData.severity} onChange={handleChange} className="w-full p-2 border rounded">
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium">Assign Engineer</label>
                            <Select
                                options={engineers.map((eng) => ({ value: eng.id, label: eng.name }))}
                                onChange={handleEngineerChange}
                                className="w-full"
                                required
                            />
                        </div>
                    </>
                )}

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Create Ticket
                </button>
            </form>
        </div>
    );
}