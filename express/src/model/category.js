const mongoose  = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new Schema(
    {
    name: {
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
 
}, {
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    }
}


);

module.exports = mongoose.model("Category",CategorySchema)