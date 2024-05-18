const express = require("express")
const dotenv = require("dotenv")
const app = express()
dotenv.config()


const port = process.env.PORT


app.get("/", (req, res) => {
      res.status(200).json({"hey":"Emmanuel"})
})



app.listen(port, () => {
      console.log(`Magic happens at port ${port}`)
})