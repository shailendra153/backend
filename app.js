const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const userRouter = require('./router/user.router');
const categoryRouter = require('./router/category.router');
const cors = require('cors')

const app = express();
mongoose.connect("mongodb+srv://root:root@cluster0.gffjq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => {
        console.log("Database Connection SuccessFully Estabilished");
    })
    .catch(err => {
        console.log(err);
    });
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/category", categoryRouter)
app.use(userRouter)
app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));