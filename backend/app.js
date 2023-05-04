let express = require('express');
let bodyparser = require('body-parser');
let cors = require('cors');
const dotenv = require("dotenv")
dotenv.config()

let app = express();
app.use(cors());
app.use(bodyparser.json({ extended: false }));


let userInfo = require('./routers/user');
const sequelize = require('./utills/database');

app.use('/user', userInfo);


sequelize
  // .sync({ force: true })
  .sync()
  .catch(err => console.log(err))


app.listen(4000);