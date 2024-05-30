const prismaClient = require("../util/prismaClient")

const getProfile = async (req, res, next) => {
      try {
            const profile = await prismaClient.profile.findUnique({
                  where: {
                        userId: req.user.user
                  }
            })
            
            if (profile) return res.status(200).json({ "message": profile })
            
            return res.status(404).json({"message":"Not Found"})
      }
      catch (err) {
            console.log(err)

            return res.status(500)

      }
}


module.exports = getProfile