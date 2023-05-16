let express = require('express');
let bodyparser = require('body-parser');
let cors = require('cors');
const dotenv = require("dotenv")
dotenv.config()

let app = express();
app.use(cors());
app.use(bodyparser.json({ extended: false }));

const http = require('http')
const socketIO = require('socket.io')

const server = http.createServer(app)
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
})

const User = require('./models/user');
const Message = require('./models/message');
const Groups = require('./models/groups');
const userGroups = require('./models/userGroups');
const sequelize = require('./utills/database');


let userInfo = require('./routers/user');
let messages = require('./routers/messages');
let groups = require('./routers/groups');
let adminPower = require('./routers/adminPower');


app.use('/user', userInfo);
app.use('/messages', messages);
app.use('/groups', groups);
app.use('/admin', adminPower)

app.use('/frontend', express.static('frontend'))
app.get("/", (req, res) => {
  res.redirect("/frontEnd/login-signup/login-signup.html");
})

User.hasMany(Message);
Message.belongsTo(User);

Groups.hasMany(Message);
Message.belongsTo(Groups);

// User.belongsToMany(Groups, { through: Message });
// Groups.belongsToMany(User, { through: Message });

User.hasMany(userGroups);
userGroups.belongsTo(User);

Groups.hasMany(userGroups);
userGroups.belongsTo(Groups);

// User.belongsToMany(Groups, { through: userGroups });
// Groups.belongsToMany(User, { through: userGroups });

sequelize
  // .sync({ force: true })
  .sync()
  .catch(err => console.log(err))


// app.listen(4000);
io.on('connection', socket => {
  console.log('a user connected')

  socket.on('new-chat', (message) => {
    io.emit('send-new-msg', message)
  })

})

server.listen(4000, () => {
  console.log(`server started on port`)
})

