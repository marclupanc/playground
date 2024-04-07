const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const postUserData = async (data) => {
    const { id } = data;
    const existingUser = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
    if (existingUser) {
        throw new Error('User with the same ID already exists');
    } else {
        const newUser = await prisma.user.create({
            data: data,
        });
        return newUser;
    }
}

const getAllUserData = async () => {
    return prisma.user.findMany()
}

const getSingleUser = async (id) => {
    return prisma.user.findUnique({
        where: {
            id: id,
        },
    })
}

const deleteUser = async (id) => {
    return  prisma.user.delete({
        where: {
            id: id,
        },
    })
}

module.exports = {
    postUserData,
    getAllUserData,
    getSingleUser,
    deleteUser
};
