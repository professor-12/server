const prismaClient = require("../util/prismaClient")




const editProfile = async (req, res, next) => {
      const data = req.body
      try {
            const profile = await prismaClient.profile.update({
                  data,
                  where: {
            userId: req.user.user
                  }
            })
            if (!profile) return res.status(404).json({ "message": "user not found" })
            
            return res.status(200).json({"message": profile})
      } catch (err) {
            console.log(err,"Profile Updating")
            return res.status(500).json({"message": "Error"})
      }
      
}


module.exports = editProfile