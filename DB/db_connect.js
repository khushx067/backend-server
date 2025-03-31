const {MongoClient} = require('mongodb');
const url  = process.env.CLUSTER
const clinet = new MongoClient(url);


async function ConnectMongoDB() {
    try{
        await clinet.connect();
        console.log("Connected to Mongodb");
        const database = clinet.db("Photography");
        return database;


    }
    catch(error){
        console.log(error);
    }
}
module.exports= ConnectMongoDB;