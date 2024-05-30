const express = require("express")
const dotenv = require("dotenv")
const app = express()
const cors = require("cors")
const router = require('./routes/route')
dotenv.config()


app.use(cors({origin: true}))
app.use(express.json())
const port = process.env.PORT


app.use("/api/v1", router)

app.listen(port, () => {
      console.log(`Magic happens at port ${port}`)
})