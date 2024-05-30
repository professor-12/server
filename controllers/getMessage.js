const { v4 } = require("uuid")
const prismaClient = require("../util/prismaClient")

const getMessage = async (req,res,next) => {
      const id = req.params.id
      try {
            const profile = await prismaClient.profile.findUnique({where: { userId: id }})
            if (!profile) return res.status(404).json({"message": "Not found!"})
            
            const message = await prismaClient.message.findMany({
                  where: {
                        OR: [
                              {
                                    AND: {
                                         recieverId: req.user.user,
                                         senderId: id
                                 }
                              },
                              {
                                    AND: {
                                          recieverId: id,
                                          senderId:  req.user.user
                                    }
                              }
                     ]
                  },
                  include: {
                        reciever: true,
                        sender: true
                  }
            })
            return res.status(200).json({ "message": message , friend_profile: profile})
      }
      catch (err) {
            console.log(err, "Message_get")
            
            return res.status(500).json({"message": 'An error occured'})
      }
}


module.exports = getMessage