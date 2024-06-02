const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Category = require('./src/model/category');

const app = express();
const port = 4000;

app.use(bodyParser.json());
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
app.post('/item', async(req, res) => {
    try {

        const { name, description } = req.body;
        console.log(name, description);

        const data = new Category(
            {
            name,
            description,
          });
      
        await data.save();

        console.log('req', req.body);
        // items.push(req.body);    
         //success
        res.sendStatus(200);

        // throw new Error();
    } catch (e) {
        //server error
        console.log("Error", e);
        res.sendStatus(500);


    }
});



  //get method
  app.get("/getitem", async(req, res) => {

    try {

        const data = await Category.find();//findall
        console.log("GET CTA ",data);
        res.status(200).json(data); //json wedihata return wenne

    } catch (e) {
        res.sendStatus(500);
    }
});


//update method
app.put("/:id", async(req, res) => {


    try {
        const {id} = req.params;
        const {name} = req.body;
    

        await Category.updateOne({_id:id},{name,name});
        return  res.sendStatus(200); 



    } catch (error) {
        res.sendStatus(500);
    }
});

//delete method
app.delete("/:id", async(req, res) => {

    try {
        const {id} = req.params; //param eken ena name eka
        // console.log(name);
        // await Category.updateOne({_id:id},{isDelete:true});
        await Category.deleteOne({ _id: id });

        res.sendStatus(200);

    } catch (error) {
        console.log("Error ", error);

        res.sendStatus(500);
    }
});





app.listen(port, () => {
    console.log("Server Started");
  });

// username: lakmalasela
// password: yzAaziDmh4JYriqY

//connction string: mongodb+srv://lakmalasela:yzAaziDmh4JYriqY@cluster0.wevgtk5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0