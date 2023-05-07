let express = require('express');
let bodyparser = require('body-parser');
let cors = require('cors');
const dotenv = require("dotenv")
dotenv.config()

let app = express();
app.use(cors());
app.use(bodyparser.json({ extended: false }));

let User = require('./models/user');
let Message = require('./models/message');
const sequelize = require('./utills/database');

let userInfo = require('./routers/user');
let messages = require('./routers/messages');


app.use('/user', userInfo);
app.use('/messages', messages);


User.hasMany(Message);
Message.belongsTo(User);

sequelize
  // .sync({ force: true })
  .sync()
  .catch(err => console.log(err))


app.listen(4000);