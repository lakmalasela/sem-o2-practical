const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Category = require('./src/model/category');
const User = require('./src/model/user');

const app = express();
const port = 4000;

app.use(bodyParser.json());

const routes = require('./src/controllers/index');
routes.forEach(([name,handler]) => app.use(`/${name}`,handler));

app.use(bodyParser.urlencoded({ extended: false }));


const connectionURI = 'mongodb+srv://asela:TzJfLeUjVyBaclex@cluster0.9snvyq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(connectionURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); //established the connection

//check the if have any error
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB Connected');

});

let items = [];

//test api get method
// app.get('/', function(req, res) {
//     res.send('Hello World')
// });

//post method
//post method



 



//delete method
// app.delete("/:id", async(req, res) => {

//     try {
//         const {id} = req.params; //param eken ena name eka
//         // console.log(name);
//         // await Category.updateOne({_id:id},{isDelete:true});
//         await Category.deleteOne({ _id: id });

//         res.sendStatus(200);

//     } catch (error) {
//         console.log("Error ", error);

//         res.sendStatus(500);
//     }
// });





app.listen(port, () => {
    console.log("Server Started");
  });

// username: lakmalasela
// password: yzAaziDmh4JYriqY

//connction string: mongodb+srv://lakmalasela:yzAaziDmh4JYriqY@cluster0.wevgtk5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0