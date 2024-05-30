const prisma = require("../util/prismaClient");

const getAllContact = async (req, res) => {
      try {
            const userContact = await prisma.contact.findMany({
                  where: {
                        userId: req.user.user
                  },
                  include: {
                        user: {
                              include: {
                                    profile: true
                              }
                        }
                  }
            })
            return res.status(200).json({ "message": userContact})
          
      }
      catch (err) {
            console.log(err)
            return res.status(500)
      }

}


module.exports = getAllContact