import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Complaints from "./pages/Complaint";
import Tickets from "./pages/Tickets";
import CreateTicket from "./pages/CreateTicket";

export default function App() {
  return (
    <Router>
      <div className="p-5">
        <nav className="mb-4 flex space-x-4">
          <Link className="text-blue-500 hover:underline" to="/">Complaints</Link>
          <Link className="text-blue-500 hover:underline" to="/tickets">Tickets</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Complaints />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/create-ticket" element={<CreateTicket />} />
        </Routes>
      </div>
    </Router>
  );
}