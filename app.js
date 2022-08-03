const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('dotenv').config();
const cors = require('cors');

const userRouter = require('./routes/userRouter');

const postRouter = require('./routes/posts')

const app = express();



const PORT = process.env.PORT || 3001;

app.use(
  session({
    name: 'sid',
    store: new FileStore(),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', userRouter);
app.use('/posts', postRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});
