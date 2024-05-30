const prisma = require("../util/prismaClient")

const createProfile = async (req, res) => {
      const data = req.body
      try {
            const profile = await prisma.profile.create({
                  data: {
                        ...data,
                        user: {
                              connect: {
                                    id: req.user.user
                              }
                        }
                  }
            })
            if (profile) {
                  return res.status(201).json({"message": "Profile created"})
            }
      }
      catch (err) {
            console.log(err,"PROFILE")
            return res.status(400).json({"message": "An error occured"})
      }
}


module.exports = createProfile
