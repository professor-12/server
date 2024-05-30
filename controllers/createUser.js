const prisma = require("../util/prismaClient")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const userAlreadyExist = require("../lib/userAlreadyExist")

const jst_secret = process.env.JWT_SECRET

const createUser = async (req, res) => {
      const { password, name, email } = req.body
      if (!password || !name || !email) {
            return res.status(400).json({ "message": "All fields are required" })
      }
      const hashedPassword = await bcrypt.hash(password,10)
      try {
            const existinguser = await userAlreadyExist(email)
            if (existinguser) {
                  return res.status(200).json({"message": "User Already Exist"})
            }
            const userModel = await prisma.user.create({
                  data: {
                        email , name , password: hashedPassword,
                        profile: {
                              create: {
                                    email,
                                    name
                              }
                        }
                  },
                  select: {
                        password: false,
                        contacts: false,
                        profile: true,
                        id: true,
                        name: true,
                        email: true
                  }
            })
            if (!userModel) {
                  return res.status(500).json({ "message": "Error" })
            }

            const token  = jwt.sign({user: userModel.id},jst_secret,{expiresIn: "1h"})
            return res.status(200).json({ "user": { ...userModel , token }, "message": "Created Successfully"  })
      }
      catch (err) {
            console.log(err, "SIGNUP")
            return res.status(400).json({"message":"An error occured"})
      }
}


module.exports = createUser