let express = require('express');
let bodyparser = require('body-parser');
let cors = require('cors');
const dotenv = require("dotenv")
dotenv.config()

let app = express();
app.use(cors());
app.use(bodyparser.json({ extended: false }));

const User = require('./models/user');
const Message = require('./models/message');
const Groups = require('./models/groups');
const userGroups = require('./models/userGroups');
const sequelize = require('./utills/database');


let userInfo = require('./routers/user');
let messages = require('./routers/messages');
let groups = require('./routers/groups');


app.use('/user', userInfo);
app.use('/messages', messages);
app.use('/groups', groups);


User.hasMany(Message);
Message.belongsTo(User);

// User.belongsToMany(Groups, { through: Message });
// Groups.belongsToMany(User, { through: Message });

Groups.hasMany(Message);
Message.belongsTo(Groups);

User.hasMany(userGroups);
userGroups.belongsTo(User);

Groups.hasMany(userGroups);
userGroups.belongsTo(Groups);

sequelize
  // .sync({ force: true })
  .sync()
  .catch(err => console.log(err))


app.listen(4000);