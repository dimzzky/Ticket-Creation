const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const tickets = await prisma.ticket.findMany({
            include: {
                complaint: true,
                engineer: true,
            },
        });

        res.json({
            status: 200,
            message: "Tickets fetched successfully",
            data: tickets,
        });
    } catch (error) {
        console.error("Error fetching tickets:", error);
        res.status(500).json({
            status: 500,
            message: error.message,
            data: null,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { complaintId, customer, severity, problem_time, type, assigned_engineer } = req.body;

        if (!customer && !complaintId) {
            return res.status(400).json({
                status: 400,
                message: "Either customer or complaintId is required",
                data: null,
            });
        }

        let customerName = customer;

        // Fetch complaint if complaintId is provided
        if (complaintId) {
            const complaint = await prisma.complaint.findUnique({
                where: { id: complaintId },
            });

            if (!complaint) {
                return res.status(404).json({
                    status: 404,
                    message: "Complaint not found",
                    data: null,
                });
            }

            customerName = complaint.customer_name;
        }


        const engineerId = assigned_engineer || null;


        const ticket = await prisma.ticket.create({
            data: {
                customer: customerName,
                severity,
                problem_time: problem_time ? new Date(problem_time) : null,
                incident_description: req.body.incident_description || null,
                type,
                complaintId: complaintId || null,
                engineerId,
            },
            include: { engineer: true, complaint: true },
        });

        res.json({ status: 201, message: "Ticket created successfully", data: ticket });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message, data: null });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { engineerId } = req.body;

        const updatedTicket = await prisma.ticket.update({
            where: { id: req.params.id },
            data: {
                engineerId: engineerId || null,
            },
            include: { engineer: true },
        });

        res.json({ status: 200, message: "Engineer assigned successfully", data: updatedTicket });
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message, data: null });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.ticket.delete({ where: { id } });

        res.json({
            status: 200,
            message: "Ticket deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting ticket:", error);
        res.status(400).json({
            status: 400,
            message: "Bad Request",
            error: error.message,
        });
    }
});

module.exports = router;