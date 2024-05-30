const prisma = require("../util/prismaClient")


const userAlreadyExist = async (email) => {
      const user = await prisma.user.findUnique({ where: { email } })
      return user
}


module.exports = userAlreadyExist