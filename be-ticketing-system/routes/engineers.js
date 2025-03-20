const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const engineers = await prisma.engineer.findMany();
        res.json({ status: 200, message: "Engineers fetched successfully", data: engineers });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;