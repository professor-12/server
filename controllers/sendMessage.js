const pusher = require("../lib/pusher");
const prismaClient = require("../util/prismaClient");

const sendMessage = async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;

    if (!data) {
        return res.status(400).json({ "message": "All fields are required." });
    }

      try {
            const user = await prismaClient.user.findFirst({
                  where: {
                        profile: {
                      id
                    },

                }, include: {
              profile: true
          }})
          if (!user) return res.status(404).json("Not Found")
        const message = await prismaClient.message.create({
            data: {
                    reciever: {
                    connect: {
                        id: user.id
                    }
                },
                sender: {
                    connect: {
                        id: req.user.user
                    }
                },
                ...data,
            }            
        });

        if (!message) {
            return res.status(400).json({ "message": "Message not sent" });
          }  
          const identity = user.id + req.user.user
          
            pusher.trigger(identity, "message", {
  message
});

        return res.status(200).json({ "status": "Sent", "message": message });
    } catch (err) {
        console.error(err, "SEND MESSAGE");
        return res.status(500).json({ "message": "Internal Server Error" });
    }
};

module.exports = sendMessage;
