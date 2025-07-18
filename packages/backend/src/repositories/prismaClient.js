const { PrismaClient } = require('../../generate/prisma/client');

const prisma = new PrismaClient()

module.exports = {
    prisma,
}