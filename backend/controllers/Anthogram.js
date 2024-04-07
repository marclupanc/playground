const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getCharts = async() => {
        return prisma.anthogram.findMany()
    }

const createChart = async(body) => {
        return prisma.anthogram.create({
            data: body,
        })
}

module.exports = {
    getCharts,
    createChart
};
