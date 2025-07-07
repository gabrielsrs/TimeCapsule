module.exports = {
    async getUserByIdRepository({ id }){
        const user = await prisma.user.findUnique({
            where: { id },
        })

        return user
    },
    async newUserRepository({ userId }){
        const user = await prisma.user.create({
            data: {userId},
        })

        return user
    }
}