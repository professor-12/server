const express = require("express")
const dotenv = require("dotenv")
const app = express()
const router = require('./routes/signup')
dotenv.config()



app.use(express.json())
const port = process.env.PORT




app.use("/api/v1", router)

app.get("/", (req, res) => {
      console.log(req)
      res.status(200).json({"hey":"Emmanuel"})
})



// listen to server
app.listen(port, () => {
      console.log(`Magic happens at port ${port}`)
})