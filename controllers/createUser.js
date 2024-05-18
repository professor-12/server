const createUser = (req, res) => {
      const user = req.body
      console.log(user)


      res.status(200).json({"message":"success"})
}



module.exports = createUser