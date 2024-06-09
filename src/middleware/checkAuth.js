const jwt = require('jsonwebtoken');
const User = require('../model/user');

module.exports = async(req,res, next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];//space eken Bearer kiyna eka seperate kra gnnwa ' ' white space eken wen kra gnne 0,1 kiyla
        const decoded = jwt.verify(token,"Super_secret");//ape token ekai secrete key ekai compaire krla verify kra gnnwa 
        req.user = decoded;

        User.findOneAndDelete({_id:decoded},{lastseen: new Date()});
        next(); //next kiynne ape api ekata ynna kiyla
        const {userId} = req.user; //user kawda kiyla attched krnwa
    }catch(error){
        const details = JSON.parse(JSON.stringify(error));
        if(details.message){
            return res.status(401).json(details.message);
        }
        return res.sendStatus(401);
    }
}