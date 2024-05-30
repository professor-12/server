const prisma = require("../util/prismaClient")

const addContact = async (req, res) => {
      const id = req.params.id
      try { 
            const user = await prisma.user.findUnique({ where: { email: id } })
      if (!user) return res.status(404).json({ "message": "No user to add" })
            const existiongContact = await prisma.contact.findFirst({
                  where: {
                        AND: {
                              user: { id: req.user.user },
                              email: id
                  }}
            })
            if (existiongContact) return res.status(200).json({ "message": "user already in your contact" })
            
            const contact = await prisma.contact.create({
                  data: {
                        name: user.name,
                        email: user.email,
                        user: {
                              connect: {
                                    id: req.user.user
                              }
                        }
                  }
            })
      if (!contact) return res.status(500).json({ "message": "Error" })   
      return res.status(201).json({"message":"Contact created"})
      }
      catch (err) {
            console.log(err)
            return res.status(400).json({"message":"Unable to can 😂😁"})
      }
      
}

module.exports = addContact