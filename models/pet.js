const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    type_pet: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
     name: {
        type: String,
        required: true
    },
    description: { 
        color: String,
		weight: Number,
		size: String,
		age:  String
    },
    photo_urls: [{
        type: String,
    }],
    status: {
        type: String,
        required: true
    },
    in_adoption: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
    },
    createAt: {
        type: Date,
        default: Date.now
    }

    
})

module.exports = mongoose.model("Pet", petSchema);

/* Example for pet */
/* 
{"_id":{"$oid":"61465b0cb58c34a62b7aa2c5"},
"type_pet":"cachorro",
"breed":"Boxer",
"name":"willy wonka",
"description":{
			"color":"marrom",
			"weight":{"$numberDecimal":"7"},
			"size":"medio",
			"age":"7 meses"
},
"photo_urls":["https://st2.depositphotos.com/1004199/6231/i/600/depositphotos_62310947-stock-photo-boxer-dog-on-white-background.jpg"],
"status":"available",
"in_adoption":"true",
"price":{"$numberDecimal":"0"}
} */