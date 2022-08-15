const {
    PrismaClient
} = require('./generated/client')

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    errorFormat: 'pretty',
})

module.exports = {
    users: prisma.users,
    comments: prisma.comments,
    tickets: prisma.tickets,
    projects: prisma.projects,
    query: prisma.$queryRawUnsafe,
    transactions: prisma.$transaction,
    middleware: prisma.$use
};