const prisma = require("../util/prismaClient")


const getAllUsers = async (req, res) => {
      try {
            const alluser = await prisma.user.findMany({
                  select: {
                        id: true,
                        name: true,
                        password: false,
                        email: true,
                        contacts: false,
                        _count: false,
                        profile: true
                  }
            })

            return res.status(200).json({'message': alluser})
      }
      catch (err) {
            console.log(err)
            return res.status(400).json({"message":"An error occured"})
      }
}

module.exports = getAllUsers