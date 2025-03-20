const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    const complaint1 = await prisma.complaint.create({
        data: {
            customer_name: "John Doe",
            title: "Laptop not turning on",
            description: "Laptop won't power on, even when plugged in.",
            attachment: null,
        },
    });

    const complaint2 = await prisma.complaint.create({
        data: {
            customer_name: "Jane Doe",
            title: "WiFi connection issue",
            description: "Internet is slow and frequently disconnecting.",
            attachment: null,
        },
    });

    const engineer1 = await prisma.engineer.create({
        data: { name: "Alice Johnson", expertise: "Networking" },
    });

    const engineer2 = await prisma.engineer.create({
        data: { name: "Bob Smith", expertise: "Hardware" },
    });

    await prisma.ticket.createMany({
        data: [
            {
                customer: "John Doe",
                severity: "High",
                problem_time: new Date("2025-03-20T10:00:00Z"),
                customer_info: "Laptop won't turn on",
                incident_description: "Laptop not responding",
                type: "Incident",
                complaintId: complaint1.id,
                engineerId: engineer1.id,
            },
            {
                customer: "Jane Doe",
                severity: "Low",
                problem_time: new Date("2025-03-21T12:00:00Z"),
                customer_info: "WiFi is slow",
                incident_description: "Internet connection issue",
                type: "Incident",
                complaintId: complaint2.id,
                engineerId: engineer2.id,
            },
        ],
    });

    console.log("Seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });