const { PrismaClient } = require("@prisma/client");

const cache = {};

const generatePrismaClient = () => {
    if (!cache.prisma) {
        cache.prisma = new PrismaClient();
    }
    return cache.prisma;
};

module.exports = generatePrismaClient;
