const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Connect session
require('./config/session')(app);

// Connect mongodb
require('./config/db')();

app.use(require('./routes'));

app.use((err, req, res, next) => {
  return res.json({
    success: false,
    code: 0,
    error: err
  })
})


// //use the sessions
// app.use(sessions({
//     //trust first proxy
//     secret: 'secret',
//     rolling: true,
//     resave: true, //resave:false,
//     saveUninitialized: true,
//     name:'access_token',
//     cookie: {
//         //one hour
//         maxAge: 1000 * 60 * 60 * 1,

//         secure: false,
//         //can ignore sameSite or uncomment
//         sameSite: true,

//         }

// }));


app.listen(process.env.PORT || 3001, () => console.log('App avaiable on http://localhost:3001'))

