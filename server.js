
const express = require('express');
const app = express();
const cors = require('cors');
const connect = require('./config/db');
const passport = require('./config/passport');

const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.router');

//cors
app.use(cors());
app.use(express.json())

app.use(passport.initialize());

passport.serializeUser(function (user,done){
    done(null,user);
})

passport.deserializeUser(function(user,done){
    done(null,user);
})

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/posts", postRouter);

const start = async () =>{
    await connect();

    app.listen(5000, ()=>{
        console.log("Listening on port 5000");
    })
}

module.exports = start;