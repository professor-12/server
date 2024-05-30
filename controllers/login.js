const jwt = require("jsonwebtoken")
const prismaClient = require("../util/prismaClient")
const bcryptjs = require("bcryptjs")
const jst_secret = process.env.JWT_SECRET
const login = async (req, res, next) => {
      const { email, password } = req.body
      console.log(req.body)
      if (!email || !password) return res.status(400).json({ "message": "All fields are required.." })
      try {
            const user = await prismaClient.user.findUnique({ where: { email } , include:  {profile: true} })
            if (!user) return res.status(400).status({ "message": "Incorrect credentials" })
            const checkPassword = await bcryptjs.compare(password, user.password)
            
            if (!checkPassword) return res.status(400).status({ "message": "Incorrect credentials" })
            
            const token = jwt.sign({ user: user.id }, jst_secret, { expiresIn: "1h" })
           
            return res.status(200).json({ "user": { ...user , token }, "message": "Created Successfully"  })
      }
      catch (err) {
            console.log(err, "LOGIN")
            return res.status(500).json({'message': "An error occured"})
      }
}



module.exports = login