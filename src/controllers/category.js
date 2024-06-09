const express = require('express');
const Category = require('../model/category');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');



router.post('/', async(req, res) => {
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
 router.get("/", checkAuth,async(req, res) => {

    try {

        const data = await Category.find();//findall
        console.log("GET CTA ",data);
        res.status(200).json(data); //json wedihata return wenne

    } catch (e) {
        res.sendStatus(500);
    }
});


//update method
router.put("/:id", async(req, res) => {


    try {
        const {id} = req.params;
        const {name} = req.body;
    

        await Category.updateOne({_id:id},{name,name});
        return  res.sendStatus(200); 



    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;