const express = require("express");
const cors = require("cors");

const ticketRoutes = require("./routes/tickets");
const engineerRoutes = require("./routes/engineers");
const complaintRoutes = require("./routes/complaints");

const app = express();
const PORT = 5001;

app.use(cors({ origin: "http://localhost:5173" }));
// app.use(cors());
app.use(express.json());


app.use("/api/tickets", ticketRoutes);
app.use("/api/engineers", engineerRoutes);
app.use("/api/complaints", complaintRoutes);

app.get("/", (req, res) => {
    res.json({ status: 200, message: "Server is running!" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});