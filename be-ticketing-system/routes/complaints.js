const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const complaints = await prisma.complaint.findMany();
        res.json({ status: 200, message: "Complaints fetched successfully", data: complaints });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const complaint = await prisma.complaint.findUnique({ where: { id } });

        if (!complaint) {
            return res.status(404).json({ status: 404, message: "Complaint not found" });
        }

        res.json({ status: 200, message: "Complaint fetched successfully", data: complaint });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { customer_name, title, description, attachment } = req.body;
        const complaint = await prisma.complaint.create({
            data: { customer_name, title, description, attachment },
        });

        res.status(201).json({ status: 201, message: "Complaint created successfully", data: complaint });
    } catch (error) {
        res.status(400).json({ status: 400, message: "Bad Request", error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { customer_name, title, description, attachment } = req.body;
        const updatedComplaint = await prisma.complaint.update({
            where: { id },
            data: { customer_name, title, description, attachment },
        });

        res.json({ status: 200, message: "Complaint updated successfully", data: updatedComplaint });
    } catch (error) {
        res.status(400).json({ status: 400, message: "Bad Request", error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.complaint.delete({ where: { id } });

        res.json({ status: 200, message: "Complaint deleted successfully" });
    } catch (error) {
        res.status(400).json({ status: 400, message: "Bad Request", error: error.message });
    }
});

module.exports = router;