const Vehicle = require("../models/VehicleModel");
const jwt = require("jsonwebtoken");
const redis = require("redis");
const redisClient = redis.createClient(
    12491,
    "redis-12491.c100.us-east-1-4.ec2.cloud.redislabs.com",
    { no_ready_check: true},

);

redisClient.auth(process.env.REDISPASS,function(err){
    if( err ) throw err;;
});

redisClient.on("error", function(err){
    console.log("Error ",err);
})

redisClient.on("connect", function(){
    console.log("Connected to Redis");
});


exports.create = (req,res) => {
    const vehicle = new Vehicle({
        vehicleType: req.body.vehicleType,
        vehicleWheel: req.body.vehicleWheel,
        vehicleSpeed: req.body.vehicleSpeed,
        
    })

    vehicle.save((error,document)=>{
       if(error){
           return res.status(500).send({
               status: 500,
               message: "Cant Register User",
               Exception: error,
           });
       } 

       return res.status(200).send({
           status:200,
           message: `Create vehicle with username ${vehicle.vehicleType} Sucessfully`,
       });
    });
};



exports.readVehicle = (req,res) => {
    const token = req.headers.authorization;


    if(!token){
        return res.status(400).send({
            status:400,
            message:"Token not Available",
        })
    }

    jwt.verify(token, process.env.API_KEY, function (err,decoded) {
        if(err){
            return res.status(500).send({
                auth:false,
                message:"Failed to authenticate token."
            });
        }
    });
    

    const redisKey ='readVehicle';

    redisClient.get(redisKey,(err,document)=>{
        if(document){
            return res.status(200).send({
                isCached:true,
                status: 200,
                message: '', 
                document: JSON.parse(document)
            });
        }
        else{

            Vehicle.find((err,document)=>{
                redisClient.setex(redisKey,10,JSON.stringify(document));

                return res.status(200).send({
                    status:200,
                    message:'',
                    data: document, 
                });
            });
        }
    });
}